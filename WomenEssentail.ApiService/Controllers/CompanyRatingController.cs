using Libraries.Common.Enums;
using Libraries.Common.ResponseObjects;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WomenEssentail.Common.DataTransferObjects;
using WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyRatings;
using WomenEssentail.ServiceBusinessRules.Providers;

namespace WomenEssentail.ApiService.Controllers
{
    public class CompanyRatingController : BaseApiController
    {
        private readonly ICompanyRatingManager companyRatingManager;

        public CompanyRatingController(ICompanyRatingManager companyRatingManager)
        {
            this.companyRatingManager = companyRatingManager;
        }

        [AllowAnonymous]
        [HttpPost]
        public HttpResponseMessage AddCompanyRating(CompanyRatingDto companyRatingDto)
        {
            companyRatingDto.CrudStatus = CrudStatus.CREATE;
            Response<CompanyRatingDto> response = companyRatingManager.Save(companyRatingDto);

            return Request.CreateResponse<Response<CompanyRatingDto>>(HttpStatusCode.OK, response);
        }

    }
}
