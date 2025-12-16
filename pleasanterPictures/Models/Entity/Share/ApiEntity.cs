using offlineMeeting.Models.JsonDataProperty;

namespace offlineMeeting.Models.Entity.Share
{
    public class ApiEntity : ApiKeyProperty
    {
        public string ApiVersion { get; set; } = "1.1";
        public new string ApiKey { get; set; }

        public ApiEntity()
        {
            ApiKey = base.ApiKey!;
        }
    }
}