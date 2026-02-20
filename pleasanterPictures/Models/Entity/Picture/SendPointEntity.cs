using offlineMeeting.Models.Entity.Share;

namespace offlineMeeting.Models.Entity.Picture
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