using System.Net;
using System.Net.Http;
using System.Web.Http;

using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.DashboardData;
using WomenEssentail.ServiceBusinessRules.Filters;
using WomenEssentail.ServiceBusinessRules.Providers;

namespace WomenEssentail.WebSolution.Controllers
{
    public class DashboardController : BaseApiController
    {
        private IDashboardDataManager dashboardDataManager;

        public DashboardController(IDashboardDataManager dashboardDataManager)
        {
            this.dashboardDataManager = dashboardDataManager;
        }

        [SecurityFilter("Home")]
        [HttpGet]

        public HttpResponseMessage GetData()
        {
            DashboardDataDto response = dashboardDataManager.GetData(UserId);

            return Request.CreateResponse<DashboardDataDto>(HttpStatusCode.OK, response);
        }
    }
}
