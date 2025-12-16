using offlineMeeting.Models.Entity.Picture;
using offlineMeeting.Models.Share;
using PleasanterBridge.src.DataRepository.Service;
using System.Data;

namespace offlineMeeting.Models.Process.Picture
{
    public class GetPictureProcess
    {
        private readonly IPleasanterRepository _pleasanterRepository;
        private long EventId;
        private SetPictureEntityProcess SetPictureEntityProcess;

        public GetPictureProcess(HttpContext httpContext, IPleasanterRepository pleasanterRepository, long pictureSiteId) {

            _pleasanterRepository = pleasanterRepository;
            ManageEventId manageEventId = new(httpContext);

            EventId = manageEventId.GetEventId();

            SetPictureEntityProcess = new(_pleasanterRepository, pictureSiteId, EventId);
        }

        public PictureEntity? Get()
        {
            return SetPictureEntityProcess.Get();
        }

        public PictureEntity Get(long resultId)
        {
            return SetPictureEntityProcess.Get(resultId);
        }

        public List<PictureEntity> GetList(long pictureSiteId)
        {
            return SetPictureEntityProcess.GetList(pictureSiteId);
        }
    }
}
