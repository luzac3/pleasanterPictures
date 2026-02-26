namespace pleasanterPictures.Models.Process.Share
{
    public class CreateLogProcess
    {
        static private string path = "log/";

        static public void Information(string logData)
        {
            Wirte(logData, "Information");
        }

        static public void Error(string logData)
        {
            Wirte(logData, "Error");
        }

        static private void Wirte(string logData, string logLevel)
        {
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            string timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff");
            string fileName = $"{DateTime.Now:yyyyMMdd}.log";
            string fullPath = Path.Combine(path, fileName);
            if (!File.Exists(fullPath))
            {
                string createText = $"{timestamp} CreateLog" + Environment.NewLine;
                File.WriteAllText(fullPath, createText);
            }

            File.AppendAllText(fullPath, $"{timestamp} {logLevel} {logData}\n");
        }
    }
}
