using Microsoft.AspNetCore.Hosting;

public static class PathHelper
{
    public static string WebPathToPhysicalPath(IWebHostEnvironment env, string webPath)
    {
        if (webPath.StartsWith("/")) webPath = webPath.Substring(1);
        return Path.Combine(env.WebRootPath, webPath.Replace("/", Path.DirectorySeparatorChar.ToString()));
    }
}