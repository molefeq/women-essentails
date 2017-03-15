using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Web.Http.ExceptionHandling;

namespace WomenEssentail.ServiceBusinessRules.ExceptionHandlers
{
    public class GlobalExceptionHandler : ExceptionHandler
    {
        public override void Handle(ExceptionHandlerContext context)
        {
            if (context.Exception != null)
            {
                var response = new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    Content = new StringContent(string.Format("Oops! Sorry! Something went wrong. Please contact {0} so we can try to fix it.", ConfigurationManager.AppSettings["AdminContactEmail"])),
                    ReasonPhrase = "Internal Server Error"
                };

                context.Result = new ErrorMessageResult(context.Request, response);
            }
        }
    }
}
