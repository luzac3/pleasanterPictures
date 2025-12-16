using offlineMeeting.Models.Share;
using System.Text.Json;

namespace offlineMeeting.Models.JsonDataProperty
{
    public class PleasanterSettingsEntity
    {
        public string? ApiKey { get; set; }
        public string? Url { get; set; }
        public string? Server { get; set; }
        public string? Database { get; set; }
        public string? UserId { get; set; }
        public string? Password { get; set; }
  }

    public class PleasanterSettingsProperty : PleasanterSettingsEntity
    {
        public PleasanterSettingsProperty(string contentRootPath)
        {
            var readJson = new ReadJson();
            #if DEBUG
                var jsonData = readJson.Get(contentRootPath + "/wwwroot/json/PleasanterSettings_debug.json", "utf-8");
            #else
                var jsonData = readJson.Get(contentRootPath + "/wwwroot/json/PleasanterSettings_release.json", "utf-8");
            #endif

          var pleasanterSettingsJson = JsonSerializer.Deserialize<PleasanterSettingsEntity>(jsonData);
            if (pleasanterSettingsJson != null)
            {
                ApiKey = pleasanterSettingsJson.ApiKey;
                Url = pleasanterSettingsJson.Url;
                Server = pleasanterSettingsJson.Server;
                Database = pleasanterSettingsJson.Database;
                UserId = pleasanterSettingsJson.UserId;
                Password = pleasanterSettingsJson.Password;
            }
        }
    }
}
