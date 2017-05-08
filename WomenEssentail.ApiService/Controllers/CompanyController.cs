using Libraries.Common.Enums;
using Libraries.Common.ResponseObjects;

using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataHelper;
using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.Companies;
using WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyRequests;
using WomenEssentail.ServiceBusinessRules.Filters;
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
        public HttpResponseMessage GetAppCompanies(CompanyAppSearchFilter companyAppSearchFilter)
        {
            Result<CompanySummaryDto> result = companyManager.GetAppCompanies(companyAppSearchFilter);

            MapRelativeLogoPaths(result.Items);

            return Request.CreateResponse<Result<CompanySummaryDto>>(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GetCompanies(CompanySearchFilter companySearchFilter)
        {
            companySearchFilter.UserId = UserId;
            Result<CompanySummaryDto> result = companyManager.GetCompanies(companySearchFilter);

            MapRelativeLogoPaths(result.Items);

            return Request.CreateResponse<Result<CompanySummaryDto>>(HttpStatusCode.OK, result);
        }

        [SecurityFilter("Companies")]
        [HttpPost]
        public HttpResponseMessage AddCompany(CompanyDto companyDto)
        {
            companyDto.CrudStatus = CrudStatus.CREATE;

            return SaveCompany(companyDto);
        }

        [SecurityFilter("Companies")]
        [HttpPost]
        public HttpResponseMessage UpdateCompanyStatus(BulkUpdateModel bulkUpdateModel)
        {
            bulkUpdateModel.EditUserId = UserId.Value;
            return Request.CreateResponse<Response<CompanyDto>>(HttpStatusCode.OK, companyManager.UpdateCompanyStatus(bulkUpdateModel));
        }

        [SecurityFilter("Companies")]
        [HttpPost]
        public HttpResponseMessage UpdateCompany(CompanyDto companyDto)
        {
            companyDto.CrudStatus = CrudStatus.UPDATE;

            return SaveCompany(companyDto);
        }

        [SecurityFilter("Companies")]
        [HttpPost]
        public HttpResponseMessage DeleteCompany(CompanyDto companyDto)
        {
            companyDto.CrudStatus = CrudStatus.DELETE;

            return SaveCompany(companyDto);
        }

        [HttpPost]
        public HttpResponseMessage FetchCompany(int companyId, string deviceId = "")
        {
            CompanyDto companyDto = new CompanyDto { CrudStatus = CrudStatus.READ, Id = companyId, DeviceId = deviceId };

            return SaveCompany(companyDto);
        }

        [SecurityFilter("Companies")]
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
                BlobDirectoryName = AppSettingsUtils.GetStringAppSetting("CompanyImagesBlobTempDirectory")
            };

            string fileName = UploadFileHandler.SaveUploadedImage(httpRequest.Files[0], normalImageInformation);

            return Request.CreateResponse<ImageModel>(HttpStatusCode.OK, new ImageModel { ImageFileNamePath = normalImageInformation.RelativeFileName, ImageFileName = fileName });
        }

        [SecurityFilter("Companies")]
        [HttpPost]
        public HttpResponseMessage SaveLogo()
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
                Width = AppSettingsUtils.GetDimensionWidth("CompanyImagesLogoDimension"),
                Height = AppSettingsUtils.GetDimensionHeight("CompanyImagesLogoDimension"),
                BlobDirectoryName = AppSettingsUtils.GetStringAppSetting("CompanyImagesBlobTempDirectory")
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
                if (companyDto.CrudStatus != CrudStatus.DELETE && companyDto.CrudStatus != CrudStatus.READ &&
                    ((companyDto.Logo != null && companyDto.Logo.NormalRelativeFileName.Contains("Logos/Company/Temp/") ||
                     companyDto.Galleries != null && companyDto.Galleries.Where(item => item.NormalRelativeFileName.Contains("Logos/Company/Temp/")).Count() > 0)))
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
            ResizeLogo(companyDto.Logo, true);

            foreach (var companyLogo in companyDto.Galleries)
            {
                ResizeLogo(companyLogo, false);
            }
        }

        private void ResizeLogo(CompanyLogoDto companyLogo, bool isLogo)
        {
            string logoFileName = System.IO.Path.Combine(AppSettingsUtils.GetStringAppSetting("CompanyImagesBlobTempDirectory"), companyLogo.Logo);

            if (isLogo)
            {
                UploadFileHandler.ResizeFromStreamImage(logoFileName, companyLogo.Logo,
                    new ImageInformation
                    {

                        Width = AppSettingsUtils.GetDimensionWidth("CompanyImagesLogoDimension"),
                        Height = AppSettingsUtils.GetDimensionHeight("CompanyImagesLogoDimension"),
                        BlobDirectoryName = AppSettingsUtils.GetStringAppSetting("CompanyImagesBlobLogoDirectory")
                    });

                return;
            }

            UploadFileHandler.ResizeFromStreamImage(logoFileName, companyLogo.Logo,
                new ImageInformation
                {

                    Width = AppSettingsUtils.GetDimensionWidth("CompanyImagesNormalDimension"),
                    Height = AppSettingsUtils.GetDimensionHeight("CompanyImagesNormalDimension"),
                    BlobDirectoryName = AppSettingsUtils.GetStringAppSetting("CompanyImagesBlobNormalDirectory")
                });

            UploadFileHandler.ResizeFromStreamImage(logoFileName, companyLogo.Logo,
                new ImageInformation
                {

                    Width = AppSettingsUtils.GetDimensionWidth("CompanyImagesThumbnailsDimension"),
                    Height = AppSettingsUtils.GetDimensionHeight("CompanyImagesThumbnailsDimension"),
                    BlobDirectoryName = AppSettingsUtils.GetStringAppSetting("CompanyImagesBlobThumbnailsDirectory")
                });

            UploadFileHandler.ResizeFromStreamImage(logoFileName, companyLogo.Logo,
                new ImageInformation
                {

                    Width = AppSettingsUtils.GetDimensionWidth("CompanyImagesPreviewDimension"),
                    Height = AppSettingsUtils.GetDimensionHeight("CompanyImagesPreviewDimension"),
                    BlobDirectoryName = AppSettingsUtils.GetStringAppSetting("CompanyImagesBlobPreviewDirectory")
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
            if (companyDto.Galleries == null || companyDto.Galleries.Count == 0 || companyDto.Logo == null)
            {
                return;
            }

            if (companyDto.Logo != null && !string.IsNullOrEmpty(companyDto.Logo.Logo))
            {
                companyDto.Logo.NormalRelativeFileName = UploadFileHandler.GetBlobRelativeFileName(AppSettingsUtils.GetStringAppSetting("StoragePrefixUrl"), AppSettingsUtils.GetStringAppSetting("CompanyImagesBlobLogoDirectory"), companyDto.Logo.Logo);
            }

            foreach (var companyLogo in companyDto.Galleries)
            {
                if (string.IsNullOrEmpty(companyLogo.Logo))
                {
                    return;
                }

                companyLogo.NormalRelativeFileName = UploadFileHandler.GetBlobRelativeFileName(AppSettingsUtils.GetStringAppSetting("StoragePrefixUrl"), AppSettingsUtils.GetStringAppSetting("CompanyImagesBlobNormalDirectory"), companyLogo.Logo);
                companyLogo.ThumbnailRelativeFileName = UploadFileHandler.GetBlobRelativeFileName(AppSettingsUtils.GetStringAppSetting("StoragePrefixUrl"), AppSettingsUtils.GetStringAppSetting("CompanyImagesBlobThumbnailsDirectory"), companyLogo.Logo);
                companyLogo.PreviewRelativeFileName = UploadFileHandler.GetBlobRelativeFileName(AppSettingsUtils.GetStringAppSetting("StoragePrefixUrl"), AppSettingsUtils.GetStringAppSetting("CompanyImagesBlobPreviewDirectory"), companyLogo.Logo);
            }
        }

        #endregion
    }
}
