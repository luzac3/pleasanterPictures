using offlineMeeting.Models.Entity.Picture;
using offlineMeeting.Models.Process.Share;
using PleasanterBridge.src.DataRepository.Entity;
using PleasanterBridge.src.DataRepository.Service;

namespace offlineMeeting.Models.Process.Picture
{
    public class SetPictureEntityProcess
    {
        private readonly IPleasanterRepository _repository;
        private long PictureSiteId;
        private long EventId;

        public SetPictureEntityProcess(IPleasanterRepository repository, long pictureSiteId, long eventId)
        {
            _repository = repository;
            PictureSiteId = pictureSiteId;
            EventId = eventId;
        }

        public PictureEntity? Get()
        {
            var where = new Dictionary<string, object>
            {
                { "CheckA", false }
            };

            TablesEntity? tablesEntity = _repository.Select(PictureSiteId, where, true).FirstOrDefault();

            return SetPictureEntity(tablesEntity);
        }

        public PictureEntity Get(long resultId)
        {
            TablesEntity? tablesEntity = _repository.Select(resultId, true).FirstOrDefault();

            return SetPictureEntity(tablesEntity)!;
        }

        private PictureEntity? SetPictureEntity(TablesEntity? tablesEntity)
        {
            if (tablesEntity == null)
            {
                return null;
            }
            else
            {
                string? pictureImage = tablesEntity.DescriptionC?[0];
                string? imageOverlay = tablesEntity.DescriptionE?[0];

                int overlayImageWidth = 1475;
                int overlayImageHeight = 1258;

                string pictureImageOverlay = "";
                if (!string.IsNullOrEmpty(imageOverlay))
                {
                    try
                    {
                        using (ImageHelper imageHelper = new ImageHelper(Convert.FromBase64String(imageOverlay)))
                        {
                            (overlayImageWidth, overlayImageHeight) = imageHelper.GetSize();
                            pictureImageOverlay = $"data:image/jpeg;base64,{imageOverlay}";
                        }
                    }
                    catch
                    {
                        // fixme ƒGƒ‰[ˆ—
                    }
                }

                PictureEntity pictureEntity = new(
                    resultId: tablesEntity.ReferenceId.ToString(),
                    eventId: EventId.ToString(),
                    picture: tablesEntity.DescriptionA != null && tablesEntity.DescriptionA.Count > 0 ? tablesEntity.DescriptionA[0] : "",
                    pictureImage: pictureImage == null ? "" : $"data:image/jpeg;base64,{pictureImage}",
                    pictureImageOverlay: pictureImageOverlay,
                    pictureImageOverlayWidth: overlayImageWidth,
                    pictureImageOverlayHeight: overlayImageHeight,
                    hint: tablesEntity.DescriptionD != null && tablesEntity.DescriptionD.Count > 0 ? tablesEntity.DescriptionD[0] : "",
                    maxPoint: Convert.ToInt32(tablesEntity.NumA),
                    answer: tablesEntity.ClassB,
                    explanation: tablesEntity.DescriptionB != null && tablesEntity.DescriptionB.Count > 0 ? tablesEntity.DescriptionB[0] : ""
                );

                return pictureEntity;
            }
        }

        public List<PictureEntity> GetList(long pictureSiteId)
        {
            List<PictureEntity> pictureEntityList = new List<PictureEntity> { };

            List<TablesEntity> tablesEntities = _repository.Select(pictureSiteId, true);

            return tablesEntities.Select(tablesEntity =>
            {
                return new PictureEntity(
                    resultId: tablesEntity.ReferenceId.ToString(),
                    eventId: EventId.ToString(),
                    picture: tablesEntity.ClassC,
                    pictureImage: "",
                    pictureImageOverlay: "",
                    pictureImageOverlayWidth: 0,
                    pictureImageOverlayHeight: 0,
                    hint: "",
                    maxPoint: Convert.ToInt32(tablesEntity.NumA),
                    answer: tablesEntity.ClassB,
                    explanation: tablesEntity.DescriptionB != null && tablesEntity.DescriptionB.Count > 0 ? tablesEntity.DescriptionB[0] : ""
                );
            }).ToList();
        }

        public List<long> GetActivePictureId(long pictureSiteId)
        {
            var where = new Dictionary<string, object>
            {
                { "ClassA", EventId.ToString() },
                { "CheckA", true }
            };

            return _repository.Select(pictureSiteId, where, true)
                .Select(x => Convert.ToInt64(x.ReferenceId))
                .ToList();
        }
    }
}