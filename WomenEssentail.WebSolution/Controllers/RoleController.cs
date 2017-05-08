using Libraries.Common.ResponseObjects;

using System.Net;
using System.Net.Http;
using System.Web.Http;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.Roles;
using WomenEssentail.ServiceBusinessRules.Providers;

namespace WomenEssentail.WebSolution.Controllers
{
    public class RoleController : BaseApiController
    {
        private readonly IRoleManager roleManager;

        public RoleController(IRoleManager roleManager)
        {
            this.roleManager = roleManager;
        }

        [HttpPost]
        public HttpResponseMessage GetRoles(SearchFilter searchFilter)
        {
            Result<RoleDto> result = roleManager.GetRoles(searchFilter);

            return Request.CreateResponse<Result<RoleDto>>(HttpStatusCode.OK, result);
        }
    }
}
