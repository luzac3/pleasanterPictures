namespace offlineMeeting.Models.Entity.Share
{
    public class ElectronEntity
    {
        public bool IsElectron { get; set; }

        public ElectronEntity(
            bool isElectron = false
        )
        {
            IsElectron = isElectron;
        }
    }
}
