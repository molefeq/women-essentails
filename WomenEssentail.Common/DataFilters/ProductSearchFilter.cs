using Libraries.Common.ResponseObjects;

namespace WomenEssentail.Common.DataFilters
{
    public class ProductSearchFilter
    {
        public int? CompanyId { get; set; }
        public bool IsCompanySearch { get; set; }
        public string SearchText { get; set; }
        public PageData PageData { get; set; }
    }
}
