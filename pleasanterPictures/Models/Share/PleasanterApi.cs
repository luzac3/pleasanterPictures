using offlineMeeting.Models.Entity.Share;
using System.Text.Json;

namespace offlineMeeting.Models.Share
{
    public class PleasanterApi
    {
        #if DEBUG
            private readonly string pleasanterUrlBase = "http://localhost:59802";
        #else
                private readonly string  pleasanterUrlBase = "https://pleasanter.wolfslab.jp";
        #endif

        HttpClient HttpClient;

        public PleasanterApi()
        {
            HttpClient = new();
        }

        // 複数キーに対応したUpdate
        // 複数キー対応のBulkUpdateはとりあえず対応しない方針
        // ResultId以外の単独キーに対応したものはあとで考える
        // ...KeyNameを取ればいいのか

        public async Task<PleasanterApiResponseEntity> Insert(Object data, string siteId)
        {
            StringContent content = MakeJson(data);
            string url = $"{pleasanterUrlBase}/api/items/{siteId}/create";

            return await SendPost(url, content);
        }

        public async Task<PleasanterApiResponseEntity> BulkInsert<T>(IEnumerable<T> dataList, string siteId)
        {
            BulkApiEntity sendPlesanterApiEntity = new(data: dataList.Cast<object>().ToList());
            StringContent content = MakeJson(sendPlesanterApiEntity);
            string url = $"{pleasanterUrlBase}/api/items/{siteId}/bulkupsert";

            return await SendPost(url, content);
        }

        public async Task<PleasanterApiResponseEntity> Update(Object data, string resultId)
        {
            StringContent content = MakeJson(data);
            string url = $"{pleasanterUrlBase}/api/items/{resultId}/update";

            return await SendPost(url, content);
        }

        // siteId必須
        /*
        public async Task<PleasanterApiResponseEntity> Update<T>(Object data, string siteId, Dictionary<string, T> keyValuePair)
        {
            // siteId,keyValuePairからSelectしてResultIdを取得
            // resultIdをKeyに直してUpdateへ流す
            // 結局DBContexを継承する必要がある
            StringContent content = MakeJson(data);
            string url = $"{pleasanterUrlBase}/api/items/{resultId}/update";

            return await SendPost(url, content);
        }
        */

        public async Task<List<PleasanterApiResponseEntity>> BulkUpdate<T>(Dictionary<string, T> dataDic, string keyColumn = "ResultId")
        {
            // 各UpdateのTaskを作成
            List<Task<PleasanterApiResponseEntity>> tasks = dataDic.Select(data => Update(data.Value!, data.Key)).ToList();

            List<PleasanterApiResponseEntity> results = (await Task.WhenAll(tasks)).ToList();

            return results;
        }

        // upsert

        // bulkupsert

        private StringContent MakeJson(Object data)
        {
            string json = JsonSerializer.Serialize(data);
            return new(json, System.Text.Encoding.UTF8, "application/json");
        }

        private async Task<PleasanterApiResponseEntity> SendPost(string url, StringContent content)
        {
            PleasanterApiResponseEntity info = new();

            try
            {
                HttpResponseMessage response = await HttpClient.PostAsync(url, content);
                string responseBody = await response.Content.ReadAsStringAsync();
                info = AddInformation(DeserializeJson(responseBody), url, content);
            }
            catch (HttpRequestException ex)
            {
                var error = ex.Message;
            }

            return info;
        }

        private PleasanterApiResponseEntity DeserializeJson(string responseBody)
        {
            return JsonSerializer.Deserialize<PleasanterApiResponseEntity>(responseBody)
                   ?? new PleasanterApiResponseEntity();
        }

        private PleasanterApiResponseEntity AddInformation(
            PleasanterApiResponseEntity pleasanterApiResponseEntity,
            string url,
            StringContent content
        )
        {
            pleasanterApiResponseEntity.Url = url;
            pleasanterApiResponseEntity.SendData = content.ToString();

            return pleasanterApiResponseEntity;
        }

        private void SetEntitye<T>(Dictionary<string, T> dataSet){
            PleasanterApiEntity pleasanterApiEntity = new();
            var anoymous = new { };

            pleasanterApiEntity.ClassHash = dataSet
                .Where(data => data.Key.Contains("Class") && data.Value is string)
                .ToDictionary(data => data.Key, data => data.Value as string ?? string.Empty);
            pleasanterApiEntity.NumHash = dataSet
                .Where(data => data.Key.Contains("Num") && data.Value is decimal)
                .ToDictionary(data => data.Key, data => data.Value is decimal d ? d : 0m);
            pleasanterApiEntity.DateHash = dataSet
                .Where(data => data.Key.Contains("Date") && data.Value is DateTime)
                .ToDictionary(data => data.Key, data => data.Value is DateTime dt ? dt : default(DateTime));
            pleasanterApiEntity.DescriptionHash = dataSet
                .Where(data => data.Key.Contains("Description") && data.Value is string)
                .ToDictionary(data => data.Key, data => data.Value as string ?? string.Empty);
            pleasanterApiEntity.CheckHash = dataSet
                .Where(data => data.Key.Contains("Check") && data.Value is bool)
                .ToDictionary(data => data.Key, data => data.Value is bool b ? b : false);
            pleasanterApiEntity.AttachmentsHash = dataSet
                .Where(data => data.Key.Contains("Attachments") && data.Value is string)
                .ToDictionary(data => data.Key, data => data.Value as string ?? string.Empty);
        }
    }
}
