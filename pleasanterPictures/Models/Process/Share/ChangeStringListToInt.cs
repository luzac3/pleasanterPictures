namespace offlineMeeting.Models.Process.Share
{
    public class ChangeStringListToInt
    {
        public static List<int> Convert(List<string> stringList)
        {
            List<int> converedList = stringList.ConvertAll(item =>
            {
                int i = 0;
                if (!int.TryParse(item, out i))
                {
                    throw new Exception("contain no string");
                }
                return i;
            });
            return converedList;
        }
    }
}
