namespace WomenEssentail.Common.DataTransferObjects
{
    public class ProductSummaryDto : ProductDto
    {
        public string CategoryName { get; set; }
        public string SubCategoryName { get; set; }
        public string StatusName { get; set; }
        public string StatusCode { get; set; }
        public int TotalPromotionProducts { get; set; }
        public bool IsInPromotion { get; set; }

        public PromotionProductDto Promotion { get; set; }
    }
}
