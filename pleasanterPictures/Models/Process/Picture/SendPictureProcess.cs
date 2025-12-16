using Microsoft.AspNetCore.SignalR;
using offlineMeeting.Models.Entity.Login;
using offlineMeeting.Models.Entity.Picture;
using offlineMeeting.Models.Share;
using PleasanterBridge.src.APIBridge;
using PleasanterBridge.src.APIBridge.Contracts;
using PleasanterBridge.src.DataRepository.Service;
using System.Net;
using System.Text.Json;

namespace offlineMeeting.Models.Process.Picture
{
    public class SendPictureProcess
    {
        private readonly IHubContext<MyHub> _hubContext;
        private readonly IPleasanterApiBridge _bridge;
        private readonly IPleasanterRepository _pleasanterRepository;
        private long PictureSiteId;
        private long EventId;
        private HttpContext HttpContext;

        public SendPictureProcess(
            IHubContext<MyHub> hubContext, 
            IPleasanterApiBridge bridge, 
            IPleasanterRepository pleasanterRepository,
            long pictureSiteId, 
            HttpContext httpContext
        )
        {
            _hubContext = hubContext;
            _bridge = bridge;
            _pleasanterRepository = pleasanterRepository;
            ManageEventId manageEventId = new (httpContext);
            ManageUserCd manageUserCd = new (httpContext);

            EventId = manageEventId.GetEventId();
            PictureSiteId = pictureSiteId;
            HttpContext = httpContext;
        }

        public async Task<string> Send(long pictureId)
        {

            ManageUserCd manageUserCd = new ManageUserCd(HttpContext);
            long userCd = manageUserCd.GetUserCd();

            HttpClient httpClient = new HttpClient();
            PleasanterApiResponse response;
            SendPictureEntity sendPictureEntity = new(false);

            // 古いアクティブを止める
            SetPictureEntityProcess setPictureEntityProcess = new (_pleasanterRepository, PictureSiteId, EventId);
            List<long> activePictureIdList = setPictureEntityProcess.GetActivePictureId(PictureSiteId);
            foreach (long activePictureId in activePictureIdList)
            {
                response = await _bridge.Update(
                    activePictureId,
                    sendPictureEntity
                );

                if (!response.StatusCode.Equals(HttpStatusCode.OK))
                {
                    return JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "status", "500" },
                        { "message", "古いクイズの停止に失敗しました" },
                        { "url", response.Url ?? "" },
                        { "sendData", response.SendData ?? "" } 
                    });
                }
            }

            response = await _bridge.Update(
                pictureId,
                sendPictureEntity
            );

            if (!response.StatusCode.Equals(HttpStatusCode.OK))
            {
                return JsonSerializer.Serialize(new Dictionary<string, string> { 
                    { "status", "500" },
                    { "message", "クイズの開始に失敗しました" },
                    { "url", response.Url ?? "" },
                    { "sendData", response.SendData ?? "" }
                });
            }
            else
            {
                try
                {
                    await _hubContext.Clients.All.SendAsync("ReceivePictureId", new Dictionary<string, string> { { "PictureId", pictureId.ToString() } });
                }
                catch
                {
                    return JsonSerializer.Serialize(new Dictionary<string, string> {
                    { "status", "500" },
                    { "message", "IDを損失しました" },
                    { "url", response.Url ?? "" },
                    { "sendData", response.SendData ?? "" }
                });
                }
                return JsonSerializer.Serialize(new Dictionary<string, string> { 
                    { "status", "200" }, 
                    { "message", "クイズを開始しました" }, 
                    { "ResultId", response!.Id.ToString() } 
                });
            }
        }
    }
}