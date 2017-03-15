using Libraries.Common.Extensions;

using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WomenEssentail.ServiceBusinessRules.Providers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BaseApiController : ApiController
    {
        protected virtual new ClaimsIdentity User
        {
            get { return Request.GetOwinContext().Request.User.Identity as ClaimsIdentity; }
        }

        protected virtual new int? UserId
        {
            get
            {
                Claim userIdClaim = getClaimType(ClaimTypes.Name);

                if (userIdClaim == null || string.IsNullOrEmpty(userIdClaim.Value))
                {
                    return null;
                }

                return userIdClaim.Value.ToInteger();
            }
        }

        protected virtual new int? OrganisationId
        {
            get
            {
                Claim organisationIdClaim = getClaimType("OrganisationId");

                if (organisationIdClaim == null || string.IsNullOrEmpty(organisationIdClaim.Value))
                {
                    return null;
                }

                return organisationIdClaim.Value.ToInteger();
            }
        }

        protected virtual new int? CompanyId
        {
            get
            {
                Claim companyIdClaim = getClaimType("CompanyId");

                if (companyIdClaim == null || string.IsNullOrEmpty(companyIdClaim.Value))
                {
                    return null;
                }

                return companyIdClaim.Value.ToInteger();
            }
        }

        protected virtual new int? EmployeeId
        {
            get
            {
                Claim employeeIdClaim = getClaimType("EmployeeId");

                if (employeeIdClaim == null || string.IsNullOrEmpty(employeeIdClaim.Value))
                {
                    return null;
                }

                return employeeIdClaim.Value.ToInteger();
            }
        }

        protected virtual new int? RoleId
        {
            get
            {
                Claim roleIdClaim = getClaimType("RoleId");

                if (roleIdClaim == null || string.IsNullOrEmpty(roleIdClaim.Value))
                {
                    return null;
                }

                return roleIdClaim.Value.ToInteger();
            }
        }

        protected virtual new string RoleName
        {
            get
            {
                Claim roleNameClaim = getClaimType("RoleName");

                if (roleNameClaim == null || string.IsNullOrEmpty(roleNameClaim.Value))
                {
                    return null;
                }

                return roleNameClaim.Value;
            }
        }

        private Claim getClaimType(string claimType)
        {
            return User.Claims.Where(c => c.Type == claimType).FirstOrDefault();
        }
    }
}
