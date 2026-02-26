namespace pleasanterPictures.Models.Entity.Share
{
    public class PleasanterApiResponseEntity
    {
        public long Id { get; set; }
        public int StatusCode { get; set; }
        public int LimitPerDate { get; set; }
        public int LimitRemaining { get; set; }
        public string? Message { get; set; }
        public string? Url { get; set; }
        public string? SendData { get; set; }

        public static implicit operator PleasanterApiResponseEntity(HttpResponseMessage v)
        {
            throw new NotImplementedException();
        }
    }
}
