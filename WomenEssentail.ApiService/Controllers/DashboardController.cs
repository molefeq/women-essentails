using System.Net;
using System.Net.Http;
using System.Web.Http;

using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.DashboardData;
using WomenEssentail.ServiceBusinessRules.Providers;

namespace WomenEssentail.ApiService.Controllers
{
    public class DashboardController : BaseApiController
    {
        private IDashboardDataManager dashboardDataManager;

        public DashboardController(IDashboardDataManager dashboardDataManager)
        {
            this.dashboardDataManager = dashboardDataManager;
        }

        [HttpGet]
        public HttpResponseMessage GetData()
        {
            DashboardDataDto response = dashboardDataManager.GetData(UserId);

            return Request.CreateResponse<DashboardDataDto>(HttpStatusCode.OK, response);
        }
    }
}
