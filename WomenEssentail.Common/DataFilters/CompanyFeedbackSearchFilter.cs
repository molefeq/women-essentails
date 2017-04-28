using Libraries.Common.ResponseObjects;

namespace WomenEssentail.Common.DataFilters
{
    public class CompanyFeedbackSearchFilter
    {
        public int CompanyId { get; set; }
        public string SearchText { get; set; }
        public PageData PageData { get; set; }
    }
}
