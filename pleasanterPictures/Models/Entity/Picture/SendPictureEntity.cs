namespace pleasanterPictures.Models.Entity.Picture
{
    public class SendPictureEntity
    {
        public bool CheckA { get; set; }
        public SendPictureEntity(
            bool active = true
        )
        {
            CheckA = active;
        }
    }
}