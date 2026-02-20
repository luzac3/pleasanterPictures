using pleasanterPictures.Models.Share;
using System.Text.Json;

namespace pleasanterPictures.Models.JsonDataProperty
{
    public class DBConnectEntity
    {
        public string? Server { get; set; }
        public string? Database { get; set; }
        public string? UserId { get; set; }
        public string? Password { get; set; }
        public string? SslMode { get; set; }
    }

    public class DBConnectProperty: DBConnectEntity
    {
        public DBConnectProperty(string contentRootPath)
        {
            var readJson = new ReadJson();
            #if DEBUG
                var jsonData = readJson.Get(contentRootPath + "/wwwroot/json/DBConnect_debug.json", "utf-8");
            #else
                var jsonData = readJson.Get(contentRootPath + "/wwwroot/json/DBConnect_release.json", "utf-8");
            #endif

            var dbConnectJson = JsonSerializer.Deserialize<DBConnectEntity>(jsonData);
            if ( dbConnectJson != null )
            {
                Server = dbConnectJson.Server;
                Database = dbConnectJson.Database;
                UserId = dbConnectJson.UserId;
                Password = dbConnectJson.Password;
                SslMode = dbConnectJson.SslMode;
            }
        }
    }
}
