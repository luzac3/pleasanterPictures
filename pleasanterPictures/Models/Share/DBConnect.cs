using offlineMeeting.Models.JsonDataProperty;

namespace offlineMeeting.Models.Share
{
    public class DBConnect: DBConnectProperty { 

        public DBConnect(string contentRootPath): base(contentRootPath) { }

        public string GetDBConnectionString()
        {
            return // @"Persist Security Info=False" +
                @"Integrated Security=False" +
                ";TrustServerCertificate=True" +
                ";Server=" + Server +
                ";Database=" + Database +
                ";User Id=" + UserId +
                ";Password=" + Password +
                ";";
        }
    }
}
