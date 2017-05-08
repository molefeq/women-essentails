using Libraries.Common.Extensions;

using System.Data.SqlClient;
using System.Linq;
using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.Companies.Mappers;
using WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyLogo.Mappers;
using WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyRequest.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.DashboardData.Mappers
{
    public class DashboardDataMapper
    {
        private static DashboardDataMapper _instance;

        private DashboardDataMapper()
        {
        }

        public static DashboardDataMapper Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new DashboardDataMapper();
                }

                return _instance;
            }
        }

        public DashboardDataDto MapToDashboardDataDto(SqlDataReader sqlDataReader)
        {
            DashboardDataDto dashboardDataDto = new DashboardDataDto();

            if (sqlDataReader.Read())
            {
                dashboardDataDto.TotalCompanyCount = sqlDataReader["TotalCompanyCount"].ToInteger();
                dashboardDataDto.TotalRequestCount = sqlDataReader["TotalRequestCount"].ToInteger();
                dashboardDataDto.TotalBeuatyTipCount = sqlDataReader["TotalBeuatyTipCount"].ToInteger();

                sqlDataReader.NextResult();

                while (sqlDataReader.Read())
                {
                    dashboardDataDto.RecentRequests.Add(CompanyRequestMapper.Instance.MapToCompanyRequestDto(sqlDataReader));
                }

                sqlDataReader.NextResult();

                while (sqlDataReader.Read())
                {
                    dashboardDataDto.RecentCompanies.Add(CompanyMappers.Instance.MapToCompanySummaryDto(sqlDataReader));
                }

                sqlDataReader.NextResult();

                while (sqlDataReader.Read())
                {
                    int companyId = sqlDataReader["CompanyId"].ToInteger();
                    CompanySummaryDto companyDto = dashboardDataDto.RecentCompanies.Where(item => item.Id == companyId).FirstOrDefault();

                    if (companyDto == null)
                    {
                        continue;
                    }

                    string imageType = sqlDataReader["ImageType"].ToString();

                    if (imageType == "Logo")
                    {
                        companyDto.Logo = CompanyLogoMappers.Instance.MapToCompanyLogoDto(sqlDataReader);
                    }
                    else
                    {
                        companyDto.Galleries.Add(CompanyLogoMappers.Instance.MapToCompanyLogoDto(sqlDataReader));
                    }
                }
            }

            return dashboardDataDto;
        }
    }
}
