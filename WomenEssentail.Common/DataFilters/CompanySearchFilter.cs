using Libraries.Common.ResponseObjects;

namespace WomenEssentail.Common.DataFilters
{
    public class CompanySearchFilter
    {
        public int? OrganisationId { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public bool IsLocationSearch { get; set; }
        public int? UserId { get; set; }
        public string SearchText { get; set; }
        public PageData PageData { get; set; }
    }
}
