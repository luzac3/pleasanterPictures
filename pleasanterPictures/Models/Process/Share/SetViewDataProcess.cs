using PleasanterBridge.src.DataRepository.Service;
using pleasanterPictures.Models.Entity.Share;
using pleasanterPictures.Models.JsonDataProperty;
using pleasanterPictures.Models.Share;

namespace pleasanterPictures.Models.Process.Share
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
    }
}
