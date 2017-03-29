using Libraries.Common.ResponseObjects;

namespace WomenEssentail.Common.DataFilters
{
    public class ProductPromotionSearchFilter
    {
        public int? ProductId { get; set; }
        public string SearchText { get; set; }
        public PageData PageData { get; set; }
    }
}
