using Libraries.Common.ResponseObjects;

namespace WomenEssentail.Common.DataFilters
{
    public class CompanyAppSearchFilter
    {
        public int? SubCategoryId { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public string SearchText { get; set; }
        public PageData PageData { get; set; }
    }
}
