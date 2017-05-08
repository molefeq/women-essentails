using Libraries.Common.Enums;
using Libraries.Common.ResponseObjects;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;
using WomenEssentail.ServiceBusinessRules.EntityManagers.Categories;
using WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyTypes;
using WomenEssentail.ServiceBusinessRules.EntityManagers.ContactUss;
using WomenEssentail.ServiceBusinessRules.EntityManagers.DeviceDetails;
using WomenEssentail.ServiceBusinessRules.EntityManagers.SubCategories;

namespace WomenEssentail.WebSolution.Controllers
{
    public class LookupController : ApiController
    {
        private readonly ICompanyTypeManager companyTypeManager;
        private readonly ISubCategoryManager subCategoryManager;
        private readonly ICategoryManager categoryManager;
        private readonly IContactUsManager contactUsManager;
        private readonly IDeviceDetailsManager deviceDetailsManager;

        public LookupController(ICompanyTypeManager companyTypeManager, ICategoryManager categoryManager, 
                                ISubCategoryManager subCategoryManager, IContactUsManager contactUsManager,
                                IDeviceDetailsManager deviceDetailsManager)
        {
            this.companyTypeManager = companyTypeManager;
            this.categoryManager = categoryManager;
            this.subCategoryManager = subCategoryManager;
            this.contactUsManager = contactUsManager;
            this.deviceDetailsManager = deviceDetailsManager;
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

        [HttpGet]
        public HttpResponseMessage GetContactDetails()
        {
            return Request.CreateResponse<ContactUsDto>(HttpStatusCode.OK, new ContactUsDto
            {
                Name = ConfigurationManager.AppSettings["ContactName"],
                Number = ConfigurationManager.AppSettings["ContactNumber"],
                EmailAddress = ConfigurationManager.AppSettings["ContactEmail"],
            });
        }

        [HttpPost]
        public HttpResponseMessage SendMessage(ContactUsDto contactUsDto)
        {
            contactUsDto.CrudStatus = CrudStatus.CREATE;
            return Request.CreateResponse<Response<ContactUsDto>>(HttpStatusCode.OK, contactUsManager.Save(contactUsDto));
        }

        [HttpPost]
        public HttpResponseMessage SaveDeviceDetails(DeviceDetailsDto deviceDetailsDto)
        {
            deviceDetailsDto.CrudStatus = CrudStatus.CREATE;
            return Request.CreateResponse<Response<DeviceDetailsDto>>(HttpStatusCode.OK, deviceDetailsManager.Save(deviceDetailsDto));
        }

    }
}
