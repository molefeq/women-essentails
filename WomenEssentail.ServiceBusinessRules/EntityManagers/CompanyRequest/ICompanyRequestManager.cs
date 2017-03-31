using Libraries.Common.ResponseObjects;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyRequests
{
    public interface ICompanyRequestManager 
	{
        Result<CompanyRequestDto> GetCompanyRequests(SearchFilter searchFilter);
        Response<CompanyRequestDto> Save(CompanyRequestDto companyRequestDto);
    }
}

