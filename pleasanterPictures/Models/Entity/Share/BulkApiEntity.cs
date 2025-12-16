using offlineMeeting.Models.JsonDataProperty;

namespace offlineMeeting.Models.Entity.Share
{
    public class BulkApiEntity : ApiKeyProperty
    {
        public string ApiVersion { get; set; } = "1.1";
        public new string ApiKey { get; set; }

        public List<object> Data { get; set; }

        public BulkApiEntity(
            List<object> data
        )
        {
            ApiKey = base.ApiKey!;
            Data = data;
        }
    }
}
