using Libraries.Common.ResponseObjects;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Products
{
    public interface IProductManager 
	{
        Result<ProductSummaryDto> GetProducts(ProductSearchFilter productSearchFilter);
        Response<ProductDto> Save(ProductDto productDto);
    }
}

