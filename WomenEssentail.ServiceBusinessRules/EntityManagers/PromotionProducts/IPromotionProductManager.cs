using Libraries.Common.ResponseObjects;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.PromotionProducts
{
    public interface IPromotionProductManager 
	{
        Result<PromotionProductSummaryDto> GetPromotionProducts(ProductPromotionSearchFilter productPromotionSearchFilter);
        Response<PromotionProductDto> Save(PromotionProductDto promotionProductDto);
    }
}

