using Libraries.Common.ResponseObjects;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.PromotionProducts.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.PromotionProducts
{
	public class PromotionProductManager : IPromotionProductManager
    {
        public Result<PromotionProductSummaryDto> GetPromotionProducts(ProductPromotionSearchFilter productPromotionSearchFilter)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.PromotionProductSummaries.Get(productPromotionSearchFilter, PromotionProductMappers.Instance.MapToPromotionProductSummaryDto);
            }
        }
        public Response<PromotionProductDto> Save(PromotionProductDto promotionProductDto)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.PromotionProducts.Save(promotionProductDto, PromotionProductMappers.Instance.MapToPromotionProductDto);
            }
        }
    }
}

