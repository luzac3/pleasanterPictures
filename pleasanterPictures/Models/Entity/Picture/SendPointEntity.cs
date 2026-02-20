namespace pleasanterPictures.Models.Entity.Picture
{
    public class SendPointEntity
    {
        public int NumA { get; set; }
        public SendPointEntity(
            int point
        )
        {
            NumA = point;
        }
    }
}