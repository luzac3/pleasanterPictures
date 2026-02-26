using pleasanterPictures.Models.Process.DBProcess;

namespace pleasanterPictures.Models.Process.Share
{
    public class SiteSettingsProcess : SitesProcess
    {
        public SiteSettingsProcess() {}

        public new System.Text.Json.Nodes.JsonNode? Get(long siteId)
        {
            string? siteSettings = base.Get(siteId).SiteSettings;
            var json = System.Text.Json.Nodes.JsonNode.Parse(siteSettings ?? "");

            return json;
        }
    }
}
