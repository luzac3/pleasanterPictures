using System.Text.Json;
using offlineMeeting.Models.Share;
using offlineMeeting.Models.Entity.Share;

namespace offlineMeeting.Models.JsonDataProperty
{
    public class PaypalEntity
    {
        public string? ClientId { get; set; }
    }

    public class PaypalProperty : PaypalEntity
    {
        public PaypalProperty()
        {
            var readJson = new ReadJson();
            var jsonData = readJson.Get(EnvironmentEntity.ContentRootPath + "/wwwroot/json/Paypal.json", "utf-8");
            ClientId = JsonSerializer.Deserialize<PaypalEntity>(jsonData)?.ClientId ?? throw new NullReferenceException("json read error");
        }
    }
}
