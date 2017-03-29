using Libraries.Common.ResponseObjects;
using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataHelper;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Companies
{
    public interface ICompanyManager
    {
        CompanyDataObject GetCompanyData(string companyTypeCode);
        Result<CompanySummaryDto> GetCompanies(CompanySearchFilter companySearchFilter);
        Response<CompanyDto> Save(CompanyDto companyDto);
    }
}

