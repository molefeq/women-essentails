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

using WomenEssentail.ServiceBusinessRules.EntityManagers.Products;
using WomenEssentail.ServiceBusinessRules.Filters;
using WomenEssentail.ServiceBusinessRules.Providers;
using WomenEssentail.ServiceBusinessRules.Utilities;

namespace WomenEssentail.ApiService.Controllers
{
    public class ProductController : BaseApiController
    {
        private readonly IProductManager productManager;

        public ProductController(IProductManager productManager)
        {
            this.productManager = productManager;
        }

        [HttpPost]
        public HttpResponseMessage GetAppProducts(ProductSearchFilter productSearchFilter)
        {
            Result<ProductSummaryDto> result = productManager.GetAppProducts(productSearchFilter);

            MapRelativeLogoPaths(result.Items);

            return Request.CreateResponse<Result<ProductSummaryDto>>(HttpStatusCode.OK, result);
        }

        [SecurityFilter("Products")]
        [HttpPost]
        public HttpResponseMessage GetProducts(ProductSearchFilter productSearchFilter)
        {
            Result<ProductSummaryDto> result = productManager.GetProducts(productSearchFilter);

            MapRelativeLogoPaths(result.Items);

            return Request.CreateResponse<Result<ProductSummaryDto>>(HttpStatusCode.OK, result);
        }

        [SecurityFilter("Products")]
        [HttpPost]
        public HttpResponseMessage AddProduct(ProductDto productDto)
        {
            productDto.CrudStatus = CrudStatus.CREATE;

            return SaveProduct(productDto);
        }

        [SecurityFilter("Products")]
        [HttpPost]
        public HttpResponseMessage UpdateProduct(ProductDto productDto)
        {
            productDto.CrudStatus = CrudStatus.UPDATE;

            return SaveProduct(productDto);
        }

        [SecurityFilter("Products")]
        [HttpPost]
        public HttpResponseMessage DeleteProduct(ProductDto productDto)
        {
            productDto.CrudStatus = CrudStatus.DELETE;

            return SaveProduct(productDto);
        }

        [SecurityFilter("Products")]
        [HttpPost]
        public HttpResponseMessage FetchProduct(int productId)
        {
            ProductDto productDto = new ProductDto { CrudStatus = CrudStatus.READ, Id = productId };

            return SaveProduct(productDto);
        }

        [SecurityFilter("Products")]
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
                Width = AppSettingsUtils.GetDimensionWidth("ProductImagesNormalDimension"),
                Height = AppSettingsUtils.GetDimensionHeight("ProductImagesNormalDimension"),
                BlobDirectoryName = AppSettingsUtils.GetStringAppSetting("ProductImagesBlobTempDirectory")
            };

            string fileName = UploadFileHandler.SaveUploadedImage(httpRequest.Files[0], normalImageInformation);

            return Request.CreateResponse<ImageModel>(HttpStatusCode.OK, new ImageModel { ImageFileNamePath = normalImageInformation.RelativeFileName, ImageFileName = fileName });
        }

        #region Private Methods

        private HttpResponseMessage SaveProduct(ProductDto productDto)
        {
            productDto.EditUserId = UserId.Value;
            Response<ProductDto> response = productManager.Save(productDto);

            if (!response.HasErrors && !response.HasWarnings)
            {
                if (productDto.CrudStatus != CrudStatus.DELETE && productDto.CrudStatus != CrudStatus.READ && !string.IsNullOrEmpty(productDto.RelativeFileName) && productDto.RelativeFileName.Contains("Logos/Product/Temp/"))
                {
                    ResizeLogos(response.Item);
                }

                if (response.Item != null)
                {
                    MapRelativeLogoPath(response.Item);
                }
            }

            return Request.CreateResponse<Response<ProductDto>>(HttpStatusCode.OK, response);
        }

        private void ResizeLogos(ProductDto productDto)
        {
            string logoFileName = System.IO.Path.Combine(AppSettingsUtils.GetStringAppSetting("ProductImagesBlobTempDirectory"), productDto.Logo);

            UploadFileHandler.ResizeFromStreamImage(logoFileName, productDto.Logo,
                new ImageInformation
                {

                    Width = AppSettingsUtils.GetDimensionWidth("ProductImagesNormalDimension"),
                    Height = AppSettingsUtils.GetDimensionHeight("ProductImagesNormalDimension"),
                    BlobDirectoryName = AppSettingsUtils.GetStringAppSetting("ProductImagesBlobNormalDirectory")
                });

            UploadFileHandler.ResizeFromStreamImage(logoFileName, productDto.Logo,
                new ImageInformation
                {

                    Width = AppSettingsUtils.GetDimensionWidth("ProductImagesThumbnailsDimension"),
                    Height = AppSettingsUtils.GetDimensionHeight("ProductImagesThumbnailsDimension"),
                    BlobDirectoryName = AppSettingsUtils.GetStringAppSetting("ProductImagesBlobThumbnailsDirectory")
                });

            UploadFileHandler.ResizeFromStreamImage(logoFileName, productDto.Logo,
                new ImageInformation
                {

                    Width = AppSettingsUtils.GetDimensionWidth("ProductImagesPreviewDimension"),
                    Height = AppSettingsUtils.GetDimensionHeight("ProductImagesPreviewDimension"),
                    BlobDirectoryName = AppSettingsUtils.GetStringAppSetting("ProductImagesBlobPreviewDirectory")
                });
        }

        private void MapRelativeLogoPaths(List<ProductSummaryDto> productDtos)
        {
            if (productDtos == null || productDtos.Count == 0)
            {
                return;
            }

            foreach (var productDto in productDtos)
            {
                MapRelativeLogoPath(productDto);

                if (productDto.Promotion != null && !string.IsNullOrEmpty(productDto.Promotion.Logo))
                {
                    MapRelativePromotionLogoPath(productDto.Promotion);
                }
            }
        }

        private void MapRelativeLogoPath(ProductDto productDto)
        {
            if (string.IsNullOrEmpty(productDto.Logo))
            {
                return;
            }

            productDto.RelativeFileName = UploadFileHandler.GetBlobRelativeFileName(AppSettingsUtils.GetStringAppSetting("StoragePrefixUrl"), AppSettingsUtils.GetStringAppSetting("ProductImagesBlobThumbnailsDirectory"), productDto.Logo);
        }

        private void MapRelativePromotionLogoPath(PromotionProductDto promotionProductDto)
        {
            if (string.IsNullOrEmpty(promotionProductDto.Logo))
            {
                return;
            }

            promotionProductDto.RelativeFileName = UploadFileHandler.GetBlobRelativeFileName(AppSettingsUtils.GetStringAppSetting("StoragePrefixUrl"), AppSettingsUtils.GetStringAppSetting("PromotionProductBlobImagesThumbnailsDirectory"), promotionProductDto.Logo);
        }

        #endregion
    }
}
