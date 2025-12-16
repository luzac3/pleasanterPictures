using Microsoft.EntityFrameworkCore;
using offlineMeeting.Models.Entity.Share;

namespace offlineMeeting.Models.Share
{
    public class DBContext : DbContext
    {
        public DBConnect DbConnect;

        public DBContext() {
            DbConnect = new DBConnect(EnvironmentEntity.ContentRootPath);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        { 
            optionsBuilder.EnableSensitiveDataLogging();
            optionsBuilder.UseSqlServer(DbConnect.GetDBConnectionString()); 
        }
    }
}
