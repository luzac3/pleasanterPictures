using System.Text.Json;
using offlineMeeting.Models.Share;
using offlineMeeting.Models.Entity.Share;

namespace offlineMeeting.Models.JsonDataProperty
{
    public class TableIdEntity
    {
        public long SakeSiteId { get; set; }
        public long OrderSiteId { get; set; }
        public long OrderPurchaseSiteId { get; set; }
        public long JoinerSiteId { get; set; }
        public long CoinsSiteId { get; set; }
        public long PictureSiteId { get; set; }
        public long AnswerSiteId { get; set; }
        public long ExtraSiteId { get; set; }
        public long RawFoodSiteId { get; set; }
        public long EventFoodSiteId { get; set; }
    }

    public class TableIdProperty : TableIdEntity
    {
        public TableIdProperty()
        {
            var readJson = new ReadJson();
            #if DEBUG
                var jsonData = readJson.Get(EnvironmentEntity.ContentRootPath + "/wwwroot/json/TableId_debug.json", "utf-8");
            #else
                var jsonData = readJson.Get(EnvironmentEntity.ContentRootPath + "/wwwroot/json/TableId_release.json", "utf-8");
            #endif

            SakeSiteId = JsonSerializer.Deserialize<TableIdEntity>(jsonData)?.SakeSiteId ?? throw new NullReferenceException("json read error");
            OrderSiteId = JsonSerializer.Deserialize<TableIdEntity>(jsonData)?.OrderSiteId ?? throw new NullReferenceException("json read error");
            OrderPurchaseSiteId = JsonSerializer.Deserialize<TableIdEntity>(jsonData)?.OrderPurchaseSiteId ?? throw new NullReferenceException("json read error");
            JoinerSiteId = JsonSerializer.Deserialize<TableIdEntity>(jsonData)?.JoinerSiteId ?? throw new NullReferenceException("json read error");
            CoinsSiteId = JsonSerializer.Deserialize<TableIdEntity>(jsonData)?.CoinsSiteId ?? throw new NullReferenceException("json read error");
            PictureSiteId = JsonSerializer.Deserialize<TableIdEntity>(jsonData)?.PictureSiteId ?? throw new NullReferenceException("json read error");
            AnswerSiteId = JsonSerializer.Deserialize<TableIdEntity>(jsonData)?.AnswerSiteId ?? throw new NullReferenceException("json read error");
            ExtraSiteId = JsonSerializer.Deserialize<TableIdEntity>(jsonData)?.ExtraSiteId ?? throw new NullReferenceException("json read error");
            RawFoodSiteId = JsonSerializer.Deserialize<TableIdEntity>(jsonData)?.RawFoodSiteId ?? throw new NullReferenceException("json read error");
            EventFoodSiteId = JsonSerializer.Deserialize<TableIdEntity>(jsonData)?.EventFoodSiteId ?? throw new NullReferenceException("json read error");
        }
    }
}