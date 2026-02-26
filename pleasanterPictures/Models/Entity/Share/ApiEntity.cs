using pleasanterPictures.Models.JsonDataProperty;

namespace pleasanterPictures.Models.Entity.Share
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