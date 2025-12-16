using offlineMeeting.Models.Entity.Picture;
using offlineMeeting.Models.Entity.Share;
using offlineMeeting.Models.Process.Share;
using PleasanterBridge.src.DataRepository.Entity;
using PleasanterBridge.src.DataRepository.Service;

namespace offlineMeeting.Models.Process.Picture
{
    public class SetAnswerEntityProcess
    {
        private long EventId;
        private long JoinerSiteId;
        private HttpContext httpContext;
        private readonly IPleasanterRepository _pleasanterRepository;

        public SetAnswerEntityProcess(long eventId, long joinerSiteId, HttpContext httpContext, IPleasanterRepository pleasanterRepository)
        {
            EventId = eventId;
            JoinerSiteId = joinerSiteId;
            this.httpContext = httpContext;
            _pleasanterRepository = pleasanterRepository;
        }

        public AnswerEntity Get(long resultId)
        {
            TablesEntity tablesEntity = _pleasanterRepository.Select(resultId, true).FirstOrDefault()!;

            return CreateAnswerEntity(tablesEntity);
        }

        public List<AnswerEntity> GetList(long answerSiteId, long pictureId)
        {
            var where = new Dictionary<string, object>
            {
                { "ClassC", pictureId.ToString() }
            };  
            List<TablesEntity> tablesEntities = _pleasanterRepository.Select(answerSiteId, where, true)
                .OrderBy(x => x.ReferenceId)
                .ToList();

            List<AnswerEntity> answerEntityList = tablesEntities
                .Select(tableEntity => CreateAnswerEntity(tableEntity))
                .ToList();

            return answerEntityList;
        }

        private AnswerEntity CreateAnswerEntity(TablesEntity tablesEntity)
        {
            GetUsersProcess getUsersProcess = new(httpContext, _pleasanterRepository, JoinerSiteId);

            string? image = tablesEntity.DescriptionA?[0];

            string imageBase64 = "";
            string lowImageBase64 = "";
            int width = 1475;
            int height = 1258;

            if (!string.IsNullOrEmpty(image))
            {
                try
                {
                    using ImageHelper imageHelper = new ImageHelper(Convert.FromBase64String(image));
                    (width, height) = imageHelper.GetSize();
                    imageBase64 = $"data:image/jpeg;base64,{image}";
                    lowImageBase64 = $"data:image/webp;base64,{imageHelper.GetLowQualityBase64()}";
                }
                catch
                {
                    // fixme エラー処理
                }
            }

            long.TryParse(tablesEntity.ClassC, out long userCd);
            JoinerEntity userData = getUsersProcess.GetUserData(userCd);

            // Nullチェックを追加
            long.TryParse(tablesEntity.ClassC, out long resultId);
            TablesEntity? pointResult = _pleasanterRepository.Select(resultId, true).FirstOrDefault();

            return new AnswerEntity(
                resultId: tablesEntity.ReferenceId.ToString(),
                userCd: tablesEntity.ClassB,
                userName: userData.UserName,
                pictureId: tablesEntity.ClassC,
                image: imageBase64,
                lowImage: lowImageBase64,
                width: width,
                height: height,
                maxPoint: Convert.ToInt32(pointResult?.NumA ?? 0),
                point: Convert.ToInt32(tablesEntity.NumA),
                answerTime: tablesEntity.DateA ?? DateTime.MinValue
            );
        }
    }
}