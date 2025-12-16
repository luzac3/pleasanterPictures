using offlineMeeting.Models.DBProperty;
using offlineMeeting.Models.Share;
using Microsoft.EntityFrameworkCore;

namespace offlineMeeting.Models.Process.DBProcess
{
    public class SitesProcess : DBContext
    {
        protected DbSet<SitesEntity> Sites { get; set; }

        protected SitesProcess() { }

        protected List<SitesEntity> Get()
        {
            return Sites.ToList();
        }

        protected SitesEntity Get(long siteId)
        {
            return Sites
                .Where(x => x.SiteId == siteId)
                .FirstOrDefault() ?? throw new Exception("invalid userCd");
        }
    }
}