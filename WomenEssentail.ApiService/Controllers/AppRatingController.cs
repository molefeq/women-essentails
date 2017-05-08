using Libraries.Common.Enums;
using Libraries.Common.ResponseObjects;

using System.Net;
using System.Net.Http;
using System.Web.Http;

using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.AppRatings;
using WomenEssentail.ServiceBusinessRules.Providers;

namespace WomenEssentail.ApiService.Controllers
{
    public class AppRatingController : BaseApiController
    {
        private readonly IAppRatingManager appRatingManager;

        public AppRatingController(IAppRatingManager appRatingManager)
        {
            this.appRatingManager = appRatingManager;
        }
        
        [HttpPost]
        public HttpResponseMessage AddAppRating(AppRatingDto appRatingDto)
        {
            appRatingDto.CrudStatus = CrudStatus.CREATE;
            
            Response<AppRatingDto> response = appRatingManager.Save(appRatingDto);

            return Request.CreateResponse<Response<AppRatingDto>>(HttpStatusCode.OK, response);
        }
        
    }
}
