using Libraries.Common.ResponseObjects;

namespace WomenEssentail.Common.DataFilters
{
    public class AccountSearchFilter
    {
        public int? OrganisationId { get; set; }
        public int? CompanyId { get; set; }
        public string SearchText { get; set; }
        public PageData PageData { get; set; }
    }
}
