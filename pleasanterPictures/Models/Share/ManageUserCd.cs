using Microsoft.Extensions.Logging;
using System.Data;
using System.Text.Json;

namespace pleasanterPictures.Models.Share
{
    public class ManageUserCd
    {
        HttpContext HttpContext;

        public ManageUserCd(HttpContext httpContext)
        {
            HttpContext = httpContext;
        }

        public void SetUserCd(long userCd)
        {
            HttpContext.Response.Cookies.Append("UserCd", userCd.ToString());
        }

        public long GetUserCd()
        {
            HttpContext.Request.Cookies.TryGetValue("UserCd", out string? userCd);

            if (userCd == "0")
            {
                throw new DataException("ユーザコードがありません");
            }
            return long.TryParse(userCd, out var result) ? result : 0;
        }

        public void ClearUserCd()
        {
            HttpContext.Response.Cookies.Delete("UserCd");
        }
    }
}
