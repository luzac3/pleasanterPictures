using offlineMeeting.Models.Entity.Share;
using offlineMeeting.Models.Share;
using PleasanterBridge.src.DataRepository.Entity;
using PleasanterBridge.src.DataRepository.Service;

namespace offlineMeeting.Models.Process.Share
{
    public class GetUsersProcess
    {
        private long JoinerSiteId;
        private readonly IPleasanterRepository _pleasanterRepository;

        public GetUsersProcess(HttpContext httpContext, IPleasanterRepository pleasanterRepository, long joinerSiteId)
        {
            ManageEventId manageEventId = new ManageEventId(httpContext);
            JoinerSiteId = joinerSiteId;
            _pleasanterRepository = pleasanterRepository;
        }
        public JoinerEntity GetUserData()
        {
            return new JoinerEntity(
                eventId:  "",
                userCd: "0",
                userName:  "",
                sex: "",
                contact:  "",
                handoverNotes:  "",
                coins: 0,
                exp: 0,
                expNext: 0,
                level: 0,
                isAdmin: false
            );
        }

        public JoinerEntity GetUserData(long myUserCd)
        {
            TablesEntity? tablesEntity = _pleasanterRepository.Select(myUserCd, true).FirstOrDefault();

            return new JoinerEntity(
                eventId: tablesEntity?.ClassD,
                userCd: tablesEntity?.ReferenceId.ToString(),
                userName: tablesEntity?.ClassA ?? "",
                sex: tablesEntity?.ClassB ?? "",
                contact: tablesEntity?.ClassC ?? "",
                handoverNotes : tablesEntity?.DescriptionA?[0],
                coins: Convert.ToInt32(tablesEntity?.NumA ?? 0),
                exp: Convert.ToInt32(tablesEntity?.NumB ?? 0),
                expNext: Convert.ToInt32(tablesEntity?.NumD ?? 0),
                level: Convert.ToInt32(tablesEntity?.NumC ?? 1),
                isAdmin: tablesEntity?.CheckB ?? false
            );
        }

        public Dictionary<int, string> GetUsers()
        {
            Dictionary<int, string> usersDicList = new Dictionary<int, string>();
            List<TablesEntity> tablesEntities = _pleasanterRepository.Select(JoinerSiteId, true);

            foreach (TablesEntity tablesEntitiy in tablesEntities)
            {
                usersDicList.Add(Convert.ToInt32(tablesEntitiy.ReferenceId), tablesEntitiy.ClassA ?? "");
            }

            return usersDicList;
        }
    }
}
