using Libraries.Common.Enums;
using Libraries.Common.ResponseObjects;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;
using WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyFeedbacks;
using WomenEssentail.ServiceBusinessRules.Providers;

namespace WomenEssentail.ApiService.Controllers
{
    public class CompanyFeedbackController : BaseApiController
    {
        private readonly ICompanyFeedbackManager companyFeedbackManager;

        public CompanyFeedbackController(ICompanyFeedbackManager companyFeedbackManager)
        {
            this.companyFeedbackManager = companyFeedbackManager;
        }

        [AllowAnonymous]
        [HttpPost]
        public HttpResponseMessage GetCompanyFeebacks(CompanyFeedbackSearchFilter companyFeedbackSearchFilter)
        {
            Result<CompanyFeedbackDto> result = companyFeedbackManager.GetCompanyFeedbacks(companyFeedbackSearchFilter);

            return Request.CreateResponse<Result<CompanyFeedbackDto>>(HttpStatusCode.OK, result);
        }

        [AllowAnonymous]
        [HttpPost]
        public HttpResponseMessage AddCompanyFeedback(CompanyFeedbackDto companyFeedbackDto)
        {
            companyFeedbackDto.CrudStatus = CrudStatus.CREATE;
            Response<CompanyFeedbackDto> response = companyFeedbackManager.Save(companyFeedbackDto);

            return Request.CreateResponse<Response<CompanyFeedbackDto>>(HttpStatusCode.OK, response);
        }
    }
}
