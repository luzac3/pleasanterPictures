using offlineMeeting.Models.Entity.Share;

namespace offlineMeeting.Models.Entity.Picture
{
    public class SendPictureEntity
    {
        public bool CheckA { get; set; }
        public SendPictureEntity(
            bool active = true
        )
        {
            CheckHash = new CheckHashEntity(active);
        }

        public class CheckHashEntity
        {
            public bool CheckA { get; set; }
            public CheckHashEntity(
                bool active = true
            )
            {
                CheckA = active;
            }
        }
    }
}