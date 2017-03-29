using Libraries.Common.ResponseObjects;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyTypes
{
    public interface ICompanyTypeManager
    {
        Result<CompanyTypeDto> GetCompanyTpyes(SearchFilter searchFilter);
    }
}

