using Libraries.Common.ResponseObjects;

namespace WomenEssentail.Common.DataFilters
{
    public class ProductPromotionAppSearchFilter
    {
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public string SearchText { get; set; }
        public PageData PageData { get; set; }
    }
}
