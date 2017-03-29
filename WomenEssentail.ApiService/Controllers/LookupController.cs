using Libraries.Common.ResponseObjects;

using System.Net;
using System.Net.Http;
using System.Web.Http;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;
using WomenEssentail.ServiceBusinessRules.EntityManagers.Categories;
using WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyTypes;
using WomenEssentail.ServiceBusinessRules.EntityManagers.SubCategories;

namespace WomenEssentail.ApiService.Controllers
{
    public class LookupController : ApiController
    {
        private readonly ICompanyTypeManager companyTypeManager;
        private readonly ISubCategoryManager subCategoryManager;
        private readonly ICategoryManager categoryManager;

        public LookupController(ICompanyTypeManager companyTypeManager, ICategoryManager categoryManager, ISubCategoryManager subCategoryManager)
        {
            this.companyTypeManager = companyTypeManager;
            this.categoryManager = categoryManager;
            this.subCategoryManager = subCategoryManager;
        }

        [HttpPost]
        public HttpResponseMessage GetCompanTypes(SearchFilter searchFilter)
        {
            Result<CompanyTypeDto> result = companyTypeManager.GetCompanyTpyes(searchFilter);

            return Request.CreateResponse<Result<CompanyTypeDto>>(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GetCategories(SearchFilter searchFilter)
        {
            Result<CategoryDto> result = categoryManager.GetCategories(searchFilter);

            return Request.CreateResponse<Result<CategoryDto>>(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GetSubCategories(SubCategorySearchFilter subCategorySearchFilter)
        {
            Result<SubCategoryDto> result = subCategoryManager.GetSubCategories(subCategorySearchFilter);

            return Request.CreateResponse<Result<SubCategoryDto>>(HttpStatusCode.OK, result);
        }
    }
}
