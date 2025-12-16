using System.Text;

namespace offlineMeeting.Models.Share
{
    public class ReadJson
    {
        public string  Get(string jsonFile, string unicode)
        {
            StreamReader sr = new StreamReader(jsonFile, Encoding.GetEncoding(unicode));
            var jsonData = sr.ReadToEnd();
            sr.Close();
            return jsonData;
        }
    }
}