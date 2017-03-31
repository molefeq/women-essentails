using Libraries.Common.Enums;
using Libraries.Common.ResponseObjects;

using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataHelper;
using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.Companies;
using WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyRequests;
using WomenEssentail.ServiceBusinessRules.Providers;
using WomenEssentail.ServiceBusinessRules.Utilities;

namespace WomenEssentail.ApiService.Controllers
{
    public class CompanyController : BaseApiController
    {
        private readonly ICompanyManager companyManager;

        public CompanyController(ICompanyManager companyManager, ICompanyRequestManager companyRequestManager)
        {
            this.companyManager = companyManager;
        }

        [HttpGet]
        public HttpResponseMessage GetCompanyData(string companyTypeCode)
        {
            CompanyDataObject result = companyManager.GetCompanyData(companyTypeCode);
            
            return Request.CreateResponse<CompanyDataObject>(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GetCompanies(CompanySearchFilter companySearchFilter)
        {
            companySearchFilter.UserId = UserId;
            Result<CompanySummaryDto> result = companyManager.GetCompanies(companySearchFilter);

            MapRelativeLogoPaths(result.Items);

            return Request.CreateResponse<Result<CompanySummaryDto>>(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage AddCompany(CompanyDto companyDto)
        {
            companyDto.CrudStatus = CrudStatus.CREATE;

            return SaveCompany(companyDto);
        }

        [HttpPost]
        public HttpResponseMessage UpdateCompany(CompanyDto companyDto)
        {
            companyDto.CrudStatus = CrudStatus.UPDATE;

            return SaveCompany(companyDto);
        }

        [HttpPost]
        public HttpResponseMessage DeleteCompany(CompanyDto companyDto)
        {
            companyDto.CrudStatus = CrudStatus.DELETE;

            return SaveCompany(companyDto);
        }

        [HttpPost]
        public HttpResponseMessage FetchCompany(int companyId)
        {
            CompanyDto companyDto = new CompanyDto { CrudStatus = CrudStatus.READ, Id = companyId };

            return SaveCompany(companyDto);
        }

        [HttpPost]
        public HttpResponseMessage SaveImage()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            var httpRequest = HttpContext.Current.Request;

            if (httpRequest.Files.Count == 0)
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            ImageInformation normalImageInformation = new ImageInformation
            {
                Width = AppSettingsUtils.GetDimensionWidth("CompanyImagesNormalDimension"),
                Height = AppSettingsUtils.GetDimensionHeight("CompanyImagesNormalDimension"),
                PhysicalDirectory = AppSettingsUtils.GetAppSettingPhysicalPath("CompanyImagesTempDirectory", HttpContext.Current.Server.MapPath),
                RelativeDirectory = AppSettingsUtils.GetAppSettingUri(HttpContext.Current.Request.Url, "CompanyImagesTempDirectory", VirtualPathUtility.ToAbsolute)
            };

            string fileName = UploadFileHandler.SaveUploadedImage(httpRequest.Files[0], normalImageInformation);

            return Request.CreateResponse<ImageModel>(HttpStatusCode.OK, new ImageModel { ImageFileNamePath = normalImageInformation.RelativeFileName, ImageFileName = fileName });
        }

        
        #region Private Methods

        private HttpResponseMessage SaveCompany(CompanyDto companyDto)
        {
            companyDto.EditUserId = UserId;
            Response<CompanyDto> response = companyManager.Save(companyDto);

            if (!response.HasErrors && !response.HasWarnings)
            {
                if (companyDto.CrudStatus != CrudStatus.DELETE && companyDto.CrudStatus != CrudStatus.READ && !string.IsNullOrEmpty(companyDto.RelativeFileName) && companyDto.RelativeFileName.Contains("/Logos/Company/Temp/"))
                {
                    ResizeLogos(response.Item);
                }

                if (response.Item != null)
                {
                    MapRelativeLogoPath(response.Item);
                }
            }

            return Request.CreateResponse<Response<CompanyDto>>(HttpStatusCode.OK, response);
        }

        private void ResizeLogos(CompanyDto companyDto)
        {
            string logoFileName = UploadFileHandler.GetPhysicalFileName(AppSettingsUtils.GetAppSettingPhysicalPath("CompanyImagesTempDirectory", HttpContext.Current.Server.MapPath), companyDto.Logo);

            UploadFileHandler.ResizeImage(logoFileName, companyDto.Logo,
                new ImageInformation
                {

                    Width = AppSettingsUtils.GetDimensionWidth("CompanyImagesNormalDimension"),
                    Height = AppSettingsUtils.GetDimensionHeight("CompanyImagesNormalDimension"),
                    PhysicalDirectory = AppSettingsUtils.GetAppSettingPhysicalPath("CompanyImagesNormalDirectory", HttpContext.Current.Server.MapPath),
                    RelativeDirectory = AppSettingsUtils.GetAppSettingUri(HttpContext.Current.Request.Url, "CompanyImagesNormalDirectory", VirtualPathUtility.ToAbsolute)
                });

            UploadFileHandler.ResizeImage(logoFileName, companyDto.Logo,
                new ImageInformation
                {

                    Width = AppSettingsUtils.GetDimensionWidth("CompanyImagesThumbnailsDimension"),
                    Height = AppSettingsUtils.GetDimensionHeight("CompanyImagesThumbnailsDimension"),
                    PhysicalDirectory = AppSettingsUtils.GetAppSettingPhysicalPath("CompanyImagesThumbnailsDirectory", HttpContext.Current.Server.MapPath),
                    RelativeDirectory = AppSettingsUtils.GetAppSettingUri(HttpContext.Current.Request.Url, "CompanyImagesThumbnailsDirectory", VirtualPathUtility.ToAbsolute)
                });

            UploadFileHandler.ResizeImage(logoFileName, companyDto.Logo,
                new ImageInformation
                {

                    Width = AppSettingsUtils.GetDimensionWidth("CompanyImagesPreviewDimension"),
                    Height = AppSettingsUtils.GetDimensionHeight("CompanyImagesPreviewDimension"),
                    PhysicalDirectory = AppSettingsUtils.GetAppSettingPhysicalPath("CompanyImagesPreviewDirectory", HttpContext.Current.Server.MapPath),
                    RelativeDirectory = AppSettingsUtils.GetAppSettingUri(HttpContext.Current.Request.Url, "CompanyImagesPreviewDirectory", VirtualPathUtility.ToAbsolute)
                });
        }

        private void MapRelativeLogoPaths(List<CompanySummaryDto> companySummaryDtos)
        {
            if (companySummaryDtos == null || companySummaryDtos.Count == 0)
            {
                return;
            }

            companySummaryDtos.ForEach(item => MapRelativeLogoPath(item));
        }

        private void MapRelativeLogoPath(CompanyDto companyDto)
        {
            if (string.IsNullOrEmpty(companyDto.Logo))
            {
                return;
            }

            companyDto.RelativeFileName = AppSettingsUtils.GetStringAppSetting("SiteUrl") + UploadFileHandler.GetRelativeFileName(AppSettingsUtils.GetAppSettingPhysicalPath("CompanyImagesThumbnailsDirectory", VirtualPathUtility.ToAbsolute), companyDto.Logo);
        }

        #endregion
    }
}
