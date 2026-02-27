using PleasanterBridge.src.DataRepository.Entity;
using PleasanterBridge.src.DataRepository.Service;
using pleasanterPictures.Models.Entity.Picture;
using pleasanterPictures.Models.Process.Share;
using pleasanterPictures.Models.ViewModel;

namespace pleasanterPictures.Models.Process.Picture
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

        public (byte[] bytes, string contentType, string fileName)? GetImageBytes(long resultId, string type)
        {
            TablesEntity? tablesEntity = _repository.Select(resultId, true).FirstOrDefault();
            if (tablesEntity == null)
                return null;

            string? imageBase64 = GetBase64FromEntity(tablesEntity, type);
            if (string.IsNullOrEmpty(imageBase64))
                return null;

            byte[] imageBytes = Convert.FromBase64String(imageBase64);

            // Overlay 画像は ImageSharp を通さずにそのまま返す
            if (type == "overlay")
            {
                return (imageBytes, "image/jpeg", $"image_{resultId}.jpg");
            }

            // 通常画像は ImageSharp で品質調整
            using var imageHelper = new ImageHelper(imageBytes);
            return (imageHelper.GetLowQualityBytes(), "image/webp", $"image_{resultId}.webp");
        }

        private static string? GetBase64FromEntity(TablesEntity tablesEntity, string type)
        {
            return type switch
            {
                "overlay" => tablesEntity.DescriptionE?[0],
                _ => tablesEntity.DescriptionC?[0]
            };
        }

        private PictureEntity? SetPictureEntity(TablesEntity? tablesEntity)
        {
            if (tablesEntity == null)
            {
                return null;
            }
            else
            {
                string? pictureImageBase64 = tablesEntity.DescriptionC?[0];
                string? imageOverlayBase64 = tablesEntity.DescriptionE?[0];

                int overlayImageWidth = 1475;
                int overlayImageHeight = 1258;

                // Overlay 画像のサイズを取得（ImageSharp 経由）
                if (!string.IsNullOrEmpty(imageOverlayBase64))
                {
                    try
                    {
                        using (ImageHelper imageHelper = new ImageHelper(Convert.FromBase64String(imageOverlayBase64)))
                        {
                            (overlayImageWidth, overlayImageHeight) = imageHelper.GetSize();
                        }
                    }
                    catch
                    {
                        // fixme エラー処理
                    }
                }

                PictureEntity pictureEntity = new(
                    resultId: tablesEntity.ReferenceId.ToString(),
                    eventId: EventId.ToString(),
                    picture: tablesEntity.DescriptionA != null && tablesEntity.DescriptionA.Count > 0 ? tablesEntity.DescriptionA[0] : "",
                    pictureImage: !string.IsNullOrEmpty(pictureImageBase64) ? tablesEntity.ReferenceId.ToString() : "",
                    pictureImageOverlay: !string.IsNullOrEmpty(imageOverlayBase64) ? tablesEntity.ReferenceId.ToString() : "",
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
            var where = new Dictionary<string, object>();

            List<TablesEntity> tablesEntities = _repository.Select(pictureSiteId, where, true);

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