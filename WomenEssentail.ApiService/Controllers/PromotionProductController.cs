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

using WomenEssentail.ServiceBusinessRules.EntityManagers.PromotionProducts;
using WomenEssentail.ServiceBusinessRules.Filters;
using WomenEssentail.ServiceBusinessRules.Providers;
using WomenEssentail.ServiceBusinessRules.Utilities;

namespace WomenEssentail.ApiService.Controllers
{
    public class PromotionProductController : BaseApiController
    {
        private readonly IPromotionProductManager promotionProductManager;

        public PromotionProductController(IPromotionProductManager promotionProductManager)
        {
            this.promotionProductManager = promotionProductManager;
        }

        [SecurityFilter("PromotionProducts")]
        [HttpPost]
        public HttpResponseMessage GetPromotionProducts(ProductPromotionSearchFilter productPromotionSearchFilter)
        {
            Result<PromotionProductSummaryDto> result = promotionProductManager.GetPromotionProducts(productPromotionSearchFilter);

            MapRelativeLogoPaths(result.Items);

            return Request.CreateResponse<Result<PromotionProductSummaryDto>>(HttpStatusCode.OK, result);
        }

        [SecurityFilter("PromotionProducts")]
        [HttpPost]
        public HttpResponseMessage AddPromotionProduct(PromotionProductDto promotionProductDto)
        {
            promotionProductDto.CrudStatus = CrudStatus.CREATE;

            return SavePromotionProduct(promotionProductDto);
        }

        [SecurityFilter("PromotionProducts")]
        [HttpPost]
        public HttpResponseMessage UpdatePromotionProduct(PromotionProductDto promotionProductDto)
        {
            promotionProductDto.CrudStatus = CrudStatus.UPDATE;

            return SavePromotionProduct(promotionProductDto);
        }

        [SecurityFilter("PromotionProducts")]
        [HttpPost]
        public HttpResponseMessage DeletePromotionProduct(PromotionProductDto promotionProductDto)
        {
            promotionProductDto.CrudStatus = CrudStatus.DELETE;

            return SavePromotionProduct(promotionProductDto);
        }

        [SecurityFilter("PromotionProducts")]
        [HttpPost]
        public HttpResponseMessage FetchPromotionProduct(int promotionProductId)
        {
            PromotionProductDto promotionProductDto = new PromotionProductDto { CrudStatus = CrudStatus.READ, Id = promotionProductId };

            return SavePromotionProduct(promotionProductDto);
        }

        [SecurityFilter("PromotionProducts")]
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
                Width = AppSettingsUtils.GetDimensionWidth("PromotionProductImagesNormalDimension"),
                Height = AppSettingsUtils.GetDimensionHeight("PromotionProductImagesNormalDimension"),
                PhysicalDirectory = AppSettingsUtils.GetAppSettingPhysicalPath("PromotionProductImagesTempDirectory", HttpContext.Current.Server.MapPath),
                RelativeDirectory = AppSettingsUtils.GetAppSettingUri(HttpContext.Current.Request.Url, "PromotionProductImagesTempDirectory", VirtualPathUtility.ToAbsolute)
            };

            string fileName = UploadFileHandler.SaveUploadedImage(httpRequest.Files[0], normalImageInformation);

            return Request.CreateResponse<ImageModel>(HttpStatusCode.OK, new ImageModel { ImageFileNamePath = normalImageInformation.RelativeFileName, ImageFileName = fileName });
        }

        #region Private Methods

        private HttpResponseMessage SavePromotionProduct(PromotionProductDto promotionProductDto)
        {
            promotionProductDto.EditUserId = UserId.Value;
            Response<PromotionProductDto> response = promotionProductManager.Save(promotionProductDto);

            if (!response.HasErrors && !response.HasWarnings)
            {
                if (promotionProductDto.CrudStatus != CrudStatus.DELETE && promotionProductDto.CrudStatus != CrudStatus.READ && !string.IsNullOrEmpty(promotionProductDto.RelativeFileName) && promotionProductDto.RelativeFileName.Contains("/Logos/PromotionProduct/Temp/"))
                {
                    ResizeLogos(response.Item);
                }

                if (response.Item != null)
                {
                    MapRelativeLogoPath(response.Item);
                }
            }

            return Request.CreateResponse<Response<PromotionProductDto>>(HttpStatusCode.OK, response);
        }

        private void ResizeLogos(PromotionProductDto promotionProductDto)
        {
            string logoFileName = UploadFileHandler.GetPhysicalFileName(AppSettingsUtils.GetAppSettingPhysicalPath("PromotionProductImagesTempDirectory", HttpContext.Current.Server.MapPath), promotionProductDto.Logo);

            UploadFileHandler.ResizeImage(logoFileName, promotionProductDto.Logo,
                new ImageInformation
                {

                    Width = AppSettingsUtils.GetDimensionWidth("PromotionProductImagesNormalDimension"),
                    Height = AppSettingsUtils.GetDimensionHeight("PromotionProductImagesNormalDimension"),
                    PhysicalDirectory = AppSettingsUtils.GetAppSettingPhysicalPath("PromotionProductImagesNormalDirectory", HttpContext.Current.Server.MapPath),
                    RelativeDirectory = AppSettingsUtils.GetAppSettingUri(HttpContext.Current.Request.Url, "PromotionProductImagesNormalDirectory", VirtualPathUtility.ToAbsolute)
                });

            UploadFileHandler.ResizeImage(logoFileName, promotionProductDto.Logo,
                new ImageInformation
                {

                    Width = AppSettingsUtils.GetDimensionWidth("PromotionProductImagesThumbnailsDimension"),
                    Height = AppSettingsUtils.GetDimensionHeight("PromotionProductImagesThumbnailsDimension"),
                    PhysicalDirectory = AppSettingsUtils.GetAppSettingPhysicalPath("PromotionProductImagesThumbnailsDirectory", HttpContext.Current.Server.MapPath),
                    RelativeDirectory = AppSettingsUtils.GetAppSettingUri(HttpContext.Current.Request.Url, "PromotionProductImagesThumbnailsDirectory", VirtualPathUtility.ToAbsolute)
                });

            UploadFileHandler.ResizeImage(logoFileName, promotionProductDto.Logo,
                new ImageInformation
                {

                    Width = AppSettingsUtils.GetDimensionWidth("PromotionProductImagesPreviewDimension"),
                    Height = AppSettingsUtils.GetDimensionHeight("PromotionProductImagesPreviewDimension"),
                    PhysicalDirectory = AppSettingsUtils.GetAppSettingPhysicalPath("PromotionProductImagesPreviewDirectory", HttpContext.Current.Server.MapPath),
                    RelativeDirectory = AppSettingsUtils.GetAppSettingUri(HttpContext.Current.Request.Url, "PromotionProductImagesPreviewDirectory", VirtualPathUtility.ToAbsolute)
                });
        }

        private void MapRelativeLogoPaths(List<PromotionProductSummaryDto> promotionProductDtos)
        {
            if (promotionProductDtos == null || promotionProductDtos.Count == 0)
            {
                return;
            }

            promotionProductDtos.ForEach(item => MapRelativeLogoPath(item));
        }

        private void MapRelativeLogoPath(PromotionProductDto promotionProductDto)
        {
            if (string.IsNullOrEmpty(promotionProductDto.Logo))
            {
                return;
            }

            promotionProductDto.RelativeFileName = AppSettingsUtils.GetStringAppSetting("SiteUrl") + UploadFileHandler.GetRelativeFileName(AppSettingsUtils.GetAppSettingPhysicalPath("PromotionProductImagesThumbnailsDirectory", VirtualPathUtility.ToAbsolute), promotionProductDto.Logo);
        }

        #endregion
    }
}
