using Libraries.Common.ResponseObjects;

namespace WomenEssentail.Common.DataFilters
{
    public class BeautyTipSearchFilter
    {
        public int? CategoryId { get; set; }
        public int? SubCategoryId { get; set; }
        public string StatusCode { get; set; }
        public string SearchText { get; set; }
        public PageData PageData { get; set; }
    }
}
