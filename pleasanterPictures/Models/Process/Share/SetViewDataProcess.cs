using offlineMeeting.Models.Entity.Share;
using offlineMeeting.Models.JsonDataProperty;
using offlineMeeting.Models.Share;
using PleasanterBridge.src.DataRepository.Service;

namespace offlineMeeting.Models.Process.Share
{
    public class SetViewDataProcess
    {

        public SetViewDataProcess() { }

        public JoinerEntity SetUserData(HttpContext httpContext, IPleasanterRepository pleasanterRepository)
        {
            TableIdProperty tableIdProperty = new();
            ManageUserCd manageUserCd = new(httpContext);

            long userCd = manageUserCd.GetUserCd();
            GetUsersProcess getUsersProcess = new GetUsersProcess(httpContext, pleasanterRepository, tableIdProperty.JoinerSiteId);

            if (userCd == 0)
            {
                return getUsersProcess.GetUserData();
            }
            else
            {
                return getUsersProcess.GetUserData(userCd);
            }
        }

        public ElectronEntity SetElectron(bool isElectron = false)
        {
            return new ElectronEntity(isElectron: isElectron);
        }
    }
}
