namespace pleasanterPictures.Models.Entity.Picture
{
    public class PictureEntity
    {
        public string? ResultId { get; set; }
        public string? EventId { get; set; }
        public string? Picture { get; set; }
        public string? PictureImage { get; set; }
        public string? PictureImageOverlay { get; set; }
        public int PictureImageOverlayWidth { get; set; }
        public int PictureImageOverlayHeight { get; set; }
        public string? Hint { get; set; }
        public int MaxPoint { get; set; }
        public string? Answer { get; set; }
        public string? Explanation { get; set; }

        public PictureEntity(
            string? resultId,
            string? eventId,
            string? picture,
            string? pictureImage,
            string? pictureImageOverlay,
            int pictureImageOverlayWidth,
            int pictureImageOverlayHeight,
            string? hint,
            int maxPoint,
            string? answer,
            string? explanation
        )
        {
            ResultId = resultId;
            EventId = eventId;
            Picture = picture;
            PictureImage = pictureImage;
            PictureImageOverlay = pictureImageOverlay;
            PictureImageOverlayWidth = pictureImageOverlayWidth;
            PictureImageOverlayHeight = pictureImageOverlayHeight;
            Hint = hint;
            MaxPoint = maxPoint;
            Answer = answer;
            Explanation = explanation;
        }
    }
}