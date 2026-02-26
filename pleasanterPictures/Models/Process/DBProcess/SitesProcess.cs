using Microsoft.EntityFrameworkCore;
using pleasanterPictures.Models.Share;
using pleasanterPictures.Models.DBProperty;

namespace pleasanterPictures.Models.Process.DBProcess
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