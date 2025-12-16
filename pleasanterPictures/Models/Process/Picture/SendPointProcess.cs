using Microsoft.AspNetCore.SignalR;
using offlineMeeting.Models.Entity.Login;
using offlineMeeting.Models.Entity.Picture;
using offlineMeeting.Models.Share;
using PleasanterBridge.src.APIBridge;
using PleasanterBridge.src.APIBridge.Contracts;
using System.Data;
using System.Net;
using System.Text.Json;

namespace offlineMeeting.Models.Process.Picture
{
    public class SendPointProcess
    {
        private readonly IHubContext<MyHub> _hubContext;
        private readonly IPleasanterApiBridge _bridge;
        private string AnswerSiteId;
        private long EventId;
        private List<PointPostEntity> PointPostEnties;
        private HttpContext HttpContext;

        public SendPointProcess(
            IHubContext<MyHub> hubContext, 
            IPleasanterApiBridge bridge,
            List<PointPostEntity> pointPostEnties,
            long answerSiteId, 
            HttpContext httpContext
        )
        {
            _hubContext = hubContext;
            _bridge = bridge;
            ManageEventId manageEventId = new (httpContext);
            ManageUserCd manageUserCd = new (httpContext);

            EventId = manageEventId.GetEventId();

            AnswerSiteId = answerSiteId.ToString();
            PointPostEnties = pointPostEnties;
            HttpContext = httpContext;
        }

        public async Task<string> Send()
        {
            List<SendPointEntity> sendPointEntityList = new List<SendPointEntity>();

            HttpClient httpClient = new HttpClient();
            bool flag = true;

            foreach (var pointPostEntity in PointPostEnties)
            {
                if (!long.TryParse(pointPostEntity.AnswerId, out long answerId) || !int.TryParse(pointPostEntity.Point, out int point))
                {
                    return JsonSerializer.Serialize(new Dictionary<string, string> { { "status", "500" }, { "message", "点数の送信に失敗しました" } });
                }

                PleasanterApiResponse response = await _bridge.Update(
                        answerId,
                        new SendPointEntity(point: point)
                    );
                if (!response.StatusCode.Equals(HttpStatusCode.OK))
                {
                    flag = false;
                }

                if (!flag)
                {
                    return JsonSerializer.Serialize(new Dictionary<string, string> { { "status", "500" }, { "message", "点数の送信に失敗しました" } });
                }
            }

            // すべての処理が終わった場合のデフォルト返却
            return JsonSerializer.Serialize(new Dictionary<string, string> { { "status", "200" }, { "message", "全ての点数を送信しました" } });
        }
    }
}