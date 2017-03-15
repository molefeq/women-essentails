using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace WomenEssentail.ServiceBusinessRules.Filters
{
    public class SecurityFilter : AuthorizationFilterAttribute
    {
        private string[] _Roles;

        public SecurityFilter() { }

        public SecurityFilter(params string[] roles)
        {
            _Roles = roles;
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            var user = actionContext.RequestContext.Principal.Identity as ClaimsIdentity;
            bool isAuthorized = _Roles == null ? true : false;
            bool isAuthenticated = user != null && user.IsAuthenticated;

            if (_Roles != null && user.Claims.Where(c => c.Type == ClaimTypes.Role).Count() > 0)
            {
                foreach (string role in _Roles)
                {
                    if (user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role && c.Value.ToLower() == role.ToLower()) != null)
                    {
                        isAuthorized = true;
                        break;
                    }
                }
            }

            if (!isAuthenticated)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                actionContext.Response.ReasonPhrase = "Authentication fail.";
                actionContext.Response.Content = new StringContent("User is not authenticated to access this resource please contact administrators for more information.");
            }
            else if (!isAuthorized)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Forbidden);
                actionContext.Response.ReasonPhrase = "Authorization fail.";
                actionContext.Response.Content = new StringContent("User is not authorized to access this resource please contact administrators for more information.");
            }
        }
    }
}
