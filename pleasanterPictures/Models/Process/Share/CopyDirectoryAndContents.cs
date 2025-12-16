namespace offlineMeeting.Models.Process.Share
{
    public class CopyDirectoryAndContents
    {
        public static void Copy(string sourceDir, string destinationDir)
        {
            // ターゲット ディレクトリが存在するかどうかを確認
            if (Directory.Exists(sourceDir) == false)
            {
                throw new DirectoryNotFoundException(sourceDir + "is not exist");
            }

            DirectoryInfo dir = new DirectoryInfo(sourceDir);

            DirectoryInfo[] dirs = dir.GetDirectories();

            Directory.CreateDirectory(destinationDir);

            foreach (FileInfo file in dir.GetFiles())
            {
                string targetFilePath = Path.Combine(destinationDir, file.Name);
                file.CopyTo(targetFilePath);
            }

            foreach (DirectoryInfo subDir in dirs)
            {
                string newDestinationDir = Path.Combine(destinationDir, subDir.Name);
                Copy(subDir.FullName, newDestinationDir);
            }
        }
    }
}
