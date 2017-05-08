using Libraries.Common.ResponseObjects;

namespace WomenEssentail.Common.DataFilters
{
    public class SubCategorySearchFilter
    {
        public int? CategoryId { get; set; }
        public bool? ShowAll { get; set; }
        public string SearchText { get; set; }
        public PageData PageData { get; set; }
    }
}
