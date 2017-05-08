using Libraries.Common.Enums;
using Libraries.Common.ResponseObjects;

using System.Net;
using System.Net.Http;
using System.Web.Http;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.SubCategories;
using WomenEssentail.ServiceBusinessRules.Filters;
using WomenEssentail.ServiceBusinessRules.Providers;

namespace WomenEssentail.ApiService.Controllers
{
    public class SubCategoryController : BaseApiController
    {
        private readonly ISubCategoryManager subCategoryManager;

        public SubCategoryController(ISubCategoryManager subCategoryManager)
        {
            this.subCategoryManager = subCategoryManager;
        }

        [HttpPost]
        public HttpResponseMessage GetSubCategories(SubCategorySearchFilter subCategorySearchFilter)
        {
            Result<SubCategoryDto> result = subCategoryManager.GetSubCategories(subCategorySearchFilter);

            return Request.CreateResponse<Result<SubCategoryDto>>(HttpStatusCode.OK, result);
        }

        [SecurityFilter()]
        [HttpPost]
        public HttpResponseMessage AddSubCategory(SubCategoryDto subCategoryDto)
        {
            subCategoryDto.CrudStatus = CrudStatus.CREATE;

            return SaveSubCategory(subCategoryDto);
        }

        [SecurityFilter()]
        [HttpPost]
        public HttpResponseMessage UpdateSubCategory(SubCategoryDto subCategoryDto)
        {
            subCategoryDto.CrudStatus = CrudStatus.UPDATE;

            return SaveSubCategory(subCategoryDto);
        }

        [SecurityFilter()]
        [HttpPost]
        public HttpResponseMessage DeleteSubCategory(SubCategoryDto subCategoryDto)
        {
            subCategoryDto.CrudStatus = CrudStatus.DELETE;

            return SaveSubCategory(subCategoryDto);
        }
        
        [HttpPost]
        public HttpResponseMessage FetchSubCategory(int subCategoryId)
        {
            SubCategoryDto subCategoryDto = new SubCategoryDto { CrudStatus = CrudStatus.READ, Id = subCategoryId };

            return SaveSubCategory(subCategoryDto);
        }

        #region Private Methods

        private HttpResponseMessage SaveSubCategory(SubCategoryDto subCategoryDto)
        {
            subCategoryDto.EditUserId = UserId.Value;
            Response<SubCategoryDto> response = subCategoryManager.Save(subCategoryDto);

            return Request.CreateResponse<Response<SubCategoryDto>>(HttpStatusCode.OK, response);
        }

        #endregion
    }
}
