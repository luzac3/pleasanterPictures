using pleasanterPictures.Models.Entity.Share;
using pleasanterPictures.Models.Share;
using System.Text.Json;

namespace pleasanterPictures.Models.JsonDataProperty
{
    public class ApiKeyEntity
    {
        public string? ApiKey { get; set; }
    }

    public class ApiKeyProperty : ApiKeyEntity
    {
        public ApiKeyProperty()
        {
            var readJson = new ReadJson();
#if DEBUG
            var jsonData = readJson.Get(EnvironmentEntity.ContentRootPath + "/wwwroot/json/ApiKey_debug.json", "utf-8");
#else
                var jsonData = readJson.Get(EnvironmentEntity.ContentRootPath + "/wwwroot/json/ApiKey_release.json", "utf-8");
#endif
            ApiKey = JsonSerializer.Deserialize<ApiKeyEntity>(jsonData)?.ApiKey ?? throw new NullReferenceException("json read error");
        }
    }
}