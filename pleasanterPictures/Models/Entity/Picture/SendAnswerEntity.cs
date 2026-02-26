using PleasanterBridge.src.APIBridge.Entity;

namespace pleasanterPictures.Models.Entity.Picture
{
    public class SendAnswerEntity
    {
        public string ClassA { get; set; }
        public string ClassC { get; set; }
        public DateTime DateA { get; set; }
        public Dictionary<string, ImageEntity> Image { get; set; }
        public SendAnswerEntity(
            string eventNumber,
            string pictureId,
            string base64Image
        )
        {
            ClassA = eventNumber;
            ClassC = pictureId;
            DateA = DateTime.UtcNow.AddHours(9);
            Image = new Dictionary<string, ImageEntity>
            {
                { "DescriptionA", new ImageEntity(base64Image) }
            };
        }
    }
}