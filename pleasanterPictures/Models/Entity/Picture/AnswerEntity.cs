namespace pleasanterPictures.Models.Entity.Picture
{
    public class AnswerEntity
    {
        public string? ResultId { get; set; }
        public string? UserCd { get; set; }
        public string? UserName { get; set; }
        public string? PictureId { get; set; }
        public string? Image { get; set; }
        public string? LowImage { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int MaxPoint { get; set; }
        public int Point { get; set; }
        public DateTime? AnswerTime { get; set; }

        public AnswerEntity(
            string? resultId,
            string? userCd,
            string? userName,
            string? pictureId,
            string? image,
            int width,
            int height,
            string? lowImage,
            int maxPoint,
            int point,
            DateTime answerTime
        )
        {
            ResultId = resultId;
            UserCd = userCd;
            UserName = userName;
            PictureId = pictureId;
            Image = image;
            Width = width;
            Height = height;
            LowImage = lowImage;
            MaxPoint = maxPoint;
            Point = point;
            AnswerTime = answerTime;
        }
    }
}