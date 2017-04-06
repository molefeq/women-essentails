namespace WomenEssentail.Common.DataTransferObjects
{
    public class PromotionProductSummaryDto: PromotionProductDto
    {
        public int CompanyId { get; set; }
        public string StatusName { get; set; }
        public string StatusCode { get; set; }
    }
}
