using Microsoft.AspNetCore.SignalR;
using PleasanterBridge.src.APIBridge;
using PleasanterBridge.src.APIBridge.Contracts;
using pleasanterPictures.Models.Entity.Picture;
using pleasanterPictures.Models.Entity.Share;
using pleasanterPictures.Models.Share;
using System.Net;
using System.Text.Json;

namespace pleasanterPictures.Models.Process.Picture
{
    public class SendAnswerProcess
    {
        private readonly IHubContext<MyHub> _hubContext;
        private readonly IPleasanterApiBridge _bridge;
        private long AnswerSiteId;
        private long EventId;
        private AnswerPostEntity AnswerPostEntity;

        public SendAnswerProcess(
            IHubContext<MyHub> hubContext,
            IPleasanterApiBridge bridge,
            AnswerPostEntity answerPostEntity,
            long answerSiteId, 
            HttpContext httpContext
        )
        {
            _hubContext = hubContext;
            _bridge = bridge;
            ManageEventId manageEventId = new (httpContext);

            EventId = manageEventId.GetEventId();

            AnswerSiteId = answerSiteId;
            AnswerPostEntity = answerPostEntity;
        }

        public async Task<string> Send()
        {
            string base64Image = string.Empty;
            if (!string.IsNullOrEmpty(AnswerPostEntity.Image))
            {
                int base64Index = AnswerPostEntity.Image.IndexOf("base64,");
                if (base64Index >= 0)
                {
                    base64Image = AnswerPostEntity.Image.Substring(base64Index + 7);
                }
            }

            SendAnswerEntity sendAnswerEntity = new
            (
                eventNumber: EventId.ToString(),
                pictureId: AnswerPostEntity.PictureId != null ? AnswerPostEntity.PictureId.ToString() : string.Empty,
                base64Image: base64Image
            );

            PleasanterApiResponse response = await _bridge.Insert(AnswerSiteId, sendAnswerEntity);

            if (!response.StatusCode.Equals(HttpStatusCode.OK))
            {
                return JsonSerializer.Serialize(new Dictionary<string, string> {
                    { "status", ((int)response.StatusCode).ToString() },
                    { "message", response.Message ?? "回答の送信に失敗しました" },
                    { "url", response.Url ?? "" },
                    { "sendData", response.SendData ?? "" }
                });
            }
            else
            {
                var resultId = response.Id.ToString();
                try
                {
                    await _hubContext.Clients.All.SendAsync("UserAnswerId", new Dictionary<string, string> { { "ResultId", resultId } });
                }
                catch
                {
                    throw new HubException("Hubへの送信に失敗しました");
                }

                return JsonSerializer.Serialize(new Dictionary<string, string> { { "status", "200" }, { "message", "回答を送信しました" },  { "ResultId", resultId } });
            }
        }
    }
}