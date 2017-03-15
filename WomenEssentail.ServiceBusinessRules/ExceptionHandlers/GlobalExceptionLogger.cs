using System;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.ExceptionHandling;

namespace WomenEssentail.ServiceBusinessRules.ExceptionHandlers
{
    public class GlobalExceptionLogger : ExceptionLogger
    {
        public override async Task LogAsync(ExceptionLoggerContext context, CancellationToken cancellationToken)
        {
            await LogExceptionAsync(context);
        }
        public async Task LogExceptionAsync(ExceptionLoggerContext exceptionLoggerContext)
        {
            var routeValues = exceptionLoggerContext.RequestContext.RouteData.Values;
            string errorSource = exceptionLoggerContext.Request.RequestUri.OriginalString;
            string area = routeValues["area"] == null ? "" : routeValues["area"].ToString() + "/";
            string controller = routeValues["controller"] == null ? "" : routeValues["controller"].ToString() + "/";
            string action = routeValues["action"] == null ? "" : routeValues["action"].ToString();
            string methodName = area + controller + action;

            string parameters = "";

            if (!exceptionLoggerContext.Request.Content.IsMimeMultipartContent())
            {
                parameters = await exceptionLoggerContext.Request.Content.ReadAsStringAsync();
            }

            ClaimsIdentity user = exceptionLoggerContext.RequestContext.Principal.Identity as ClaimsIdentity;
            int? userId = user == null || string.IsNullOrEmpty(user.Name) ? default(int?) : Convert.ToInt32(user.Name);

            //SystemExceptionLogModelResponse response = await ServiceFactory.SecurityService.AddSystemExceptionLogAsync(SystemExceptionLogMapper.Instance.MapToSystemExceptionLogModel(errorSource, methodName, parameters, userId, exceptionLoggerContext.Exception), ConfigurationManager.AppSettings["SystemKey"]);
        }

    }
}
