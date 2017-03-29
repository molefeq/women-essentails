using Libraries.Common.ResponseObjects;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.Products.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Products
{
    public class ProductManager : IProductManager
    {
        public Result<ProductSummaryDto> GetProducts(ProductSearchFilter productSearchFilter)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                if (productSearchFilter.IsCompanySearch)
                {
                    return unitOfWork.ProductSummaries.GetCompanyProducts(productSearchFilter, ProductMappers.Instance.MapToCompanyPrdocutsQueryToProductSummaryDto);
                }

                return unitOfWork.ProductSummaries.Get(productSearchFilter, ProductMappers.Instance.MapToProductSummaryDto);
            }
        }
        public Response<ProductDto> Save(ProductDto productDto)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.Products.Save(productDto, ProductMappers.Instance.MapToProductDto);
            }
        }
    }
}

