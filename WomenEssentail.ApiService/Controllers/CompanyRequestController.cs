using Libraries.Common.Enums;
using Libraries.Common.ResponseObjects;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyRequests;
using WomenEssentail.ServiceBusinessRules.Filters;
using WomenEssentail.ServiceBusinessRules.Providers;

namespace WomenEssentail.ApiService.Controllers
{
    public class CompanyRequestController : BaseApiController
    {
        private readonly ICompanyRequestManager companyRequestManager;

        public CompanyRequestController(ICompanyRequestManager companyRequestManager)
        {
            this.companyRequestManager = companyRequestManager;
        }
        
        [HttpPost]
        public HttpResponseMessage GetCompanyRequests(SearchFilter searchFilter)
        {
            Result<CompanyRequestDto> result = companyRequestManager.GetCompanyRequests(searchFilter);
            
            return Request.CreateResponse<Result<CompanyRequestDto>>(HttpStatusCode.OK, result);
        }

        [SecurityFilter("CompanyRequests")]
        [HttpPost]
        public HttpResponseMessage AddCompanyRequest(CompanyRequestDto companyRequestDto)
        {
            companyRequestDto.CrudStatus = CrudStatus.CREATE;
            Response<CompanyRequestDto> response = companyRequestManager.Save(companyRequestDto);

            return Request.CreateResponse<Response<CompanyRequestDto>>(HttpStatusCode.OK, response);
        }

        [SecurityFilter("CompanyRequests")]
        [HttpPost]
        public HttpResponseMessage UpdateCompanyRequest(CompanyRequestDto companyRequestDto)
        {
            companyRequestDto.CrudStatus = CrudStatus.UPDATE;
            Response<CompanyRequestDto> response = companyRequestManager.Save(companyRequestDto);

            return Request.CreateResponse<Response<CompanyRequestDto>>(HttpStatusCode.OK, response);
        }
    }
}
