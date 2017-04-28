using System.Collections.Generic;

namespace WomenEssentail.Common.DataTransferObjects
{
    public class DashboardDataDto
    {
        public int TotalCompanyCount { get; set; }
        public int TotalRequestCount { get; set; }
        public int TotalBeuatyTipCount { get; set; }
        public List<CompanyRequestDto> RecentRequests { get; set; }
        public List<CompanySummaryDto> RecentCompanies { get; set; }

        public DashboardDataDto()
        {
            RecentRequests = new List<CompanyRequestDto>();
            RecentCompanies = new List<CompanySummaryDto>();
        }
    }
}
