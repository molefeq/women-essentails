using Libraries.Common.ResponseObjects;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataHelper;
using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.Companies.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Companies
{
    public class CompanyManager : ICompanyManager
    {
        public CompanyDataObject GetCompanyData(string companyTypeCode)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.Companies.GetData(companyTypeCode, CompanyMappers.Instance.MapToCompanyDataObject);
            }
        }
        public Result<CompanySummaryDto> GetAppCompanies(CompanyAppSearchFilter companyAppSearchFilter)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                    return unitOfWork.CompanySummaries.GetApp(companyAppSearchFilter, CompanyMappers.Instance.MapCompanyAppToCompanySummaryDto);
            }
        }

        public Result<CompanySummaryDto> GetCompanies(CompanySearchFilter companySearchFilter)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.CompanySummaries.Get(companySearchFilter, CompanyMappers.Instance.MapToCompanySummaryDto);
            }
        }

        public Response<CompanyDto> Save(CompanyDto companyDto)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.Companies.Save(companyDto, CompanyMappers.Instance.MapToCompanyDto);
            }
        }
    }
}

