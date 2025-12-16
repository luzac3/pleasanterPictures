namespace offlineMeeting.Models.Entity.Share
{
    public class JoinerEntity
    {
        public string? EventId { get; set; }
        public string? UserCd { get; set; }
        public string? UserName { get; set; }
        public string? Sex { get; set; }
        public string? Contact{ get; set; }
        public string? HandoverNotes { get; set; }
        public int Coins { get; set; }
        public int Exp { get; set; }
        public int ExpNext { get; set; }
        public int Level { get; set; }
        public bool IsAdmin { get; set; }

        public JoinerEntity(
            string? eventId,
            string? userCd,
            string? userName,
            string? sex,
            string? contact,
            string? handoverNotes,
            int coins,
            int exp,
            int expNext,
            int level,
            bool isAdmin = false
        )
        {
            EventId = eventId;
            UserCd = userCd;
            UserName = userName;
            Sex = sex;
            Contact = contact;
            HandoverNotes = handoverNotes;
            Coins = coins;
            Exp = exp;
            ExpNext = expNext;
            Level = level;
            IsAdmin = isAdmin;
        }
    }
}
