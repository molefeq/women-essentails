namespace WomenEssentail.Common.DataTransferObjects
{
    public class CompanySummaryDto: CompanyDto
    {
        public string StatusName { get; set; }
        public string StatusCode { get; set; }
        public int TotalProducts { get; set; }
        public int TotalUsers { get; set; }
        public int Distance { get; set; }
    }
}
