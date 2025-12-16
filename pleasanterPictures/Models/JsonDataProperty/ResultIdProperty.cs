using System.Text.Json;
using offlineMeeting.Models.Share;
using offlineMeeting.Models.Entity.Share;

namespace offlineMeeting.Models.JsonDataProperty
{
    public class ResultIdEntity
    {
        public long EventId { get; set; }
    }

    public class ResultIdProperty : ResultIdEntity
    {
        public ResultIdProperty()
        {
            var readJson = new ReadJson();
            #if DEBUG
                var jsonData = readJson.Get(EnvironmentEntity.ContentRootPath + "/wwwroot/json/ResultId_debug.json", "utf-8");
            #else
                var jsonData = readJson.Get(EnvironmentEntity.ContentRootPath + "/wwwroot/json/ResultId_release.json", "utf-8");
            #endif

            EventId = JsonSerializer.Deserialize<ResultIdEntity>(jsonData)?.EventId ?? throw new NullReferenceException("json read error");
        }
    }
}