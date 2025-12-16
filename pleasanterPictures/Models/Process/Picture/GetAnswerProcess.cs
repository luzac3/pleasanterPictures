using offlineMeeting.Models.Entity.Picture;
using offlineMeeting.Models.Share;
using PleasanterBridge.src.DataRepository.Service;
using System.Data;

namespace offlineMeeting.Models.Process.Picture
{
    public class GetAnswerProcess
    {
        private readonly IPleasanterRepository _pleasanterRepository;
        private long EventId;
        private SetAnswerEntityProcess SetAnswerEntityProcess;

        public GetAnswerProcess(HttpContext httpContext, IPleasanterRepository pleasanterRepository, long joinerSiteId)
        {
            _pleasanterRepository = pleasanterRepository;
            ManageEventId manageEventId = new(httpContext);
            EventId = manageEventId.GetEventId();

            SetAnswerEntityProcess = new(EventId, joinerSiteId, httpContext, _pleasanterRepository);
        }

        public AnswerEntity Get(long resultId)
        {
            return SetAnswerEntityProcess.Get(resultId);
        }

        public List<AnswerEntity> GetList(long answerSiteId, long pictureId)
        {
            return SetAnswerEntityProcess.GetList(answerSiteId, pictureId);
        }
    }
}