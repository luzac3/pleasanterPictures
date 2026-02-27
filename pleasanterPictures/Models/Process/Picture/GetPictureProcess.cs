using PleasanterBridge.src.DataRepository.Service;
using pleasanterPictures.Models.Entity.Picture;
using pleasanterPictures.Models.Share;
using System.Data;

namespace pleasanterPictures.Models.Process.Picture
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

        public (byte[] bytes, string contentType, string fileName)? GetImageBytes(long resultId, string type)
        {
            return SetPictureEntityProcess.GetImageBytes(resultId, type);
        }

        public List<PictureEntity> GetList(long pictureSiteId)
        {
            return SetPictureEntityProcess.GetList(pictureSiteId);
        }
    }
}
