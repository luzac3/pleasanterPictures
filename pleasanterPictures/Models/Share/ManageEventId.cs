using System.Data;

namespace pleasanterPictures.Models.Share
{
    public class ManageEventId
    {
        HttpContext HttpContext;

        public ManageEventId(HttpContext httpContext)
        {
            HttpContext = httpContext;
        }

        public void SetEventId(long eventId)
        {
            HttpContext.Response.Cookies.Append("EventId", eventId.ToString());
        }

        public long GetEventId()
        {
            HttpContext.Request.Cookies.TryGetValue("EventId", out string? eventIdstr);
            long.TryParse(eventIdstr, out var eventId);

            if (eventId == 0)
            {
                throw new DataException("イベントIDが不正です");
            }

            return eventId;
        }

        public void ClearEventId()
        {
            HttpContext.Response.Cookies.Delete("EventId");
        }
    }
}
