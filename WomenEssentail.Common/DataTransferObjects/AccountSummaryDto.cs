namespace WomenEssentail.Common.DataTransferObjects
{
    public class AccountSummaryDto : AccountDto
    {
        public string OrganisationName { get; set; }
        public string CompanyName { get; set; }
        public string StatusName { get; set; }
        public string StatusCode { get; set; }
    }
}
