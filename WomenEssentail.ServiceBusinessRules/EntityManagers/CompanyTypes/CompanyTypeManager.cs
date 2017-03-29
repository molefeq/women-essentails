using Libraries.Common.ResponseObjects;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyTypes.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyTypes
{
    public class CompanyTypeManager : ICompanyTypeManager
    {
        public Result<CompanyTypeDto> GetCompanyTpyes(SearchFilter searchFilter)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.CompanyTypes.Get(searchFilter, CompanyTypeMappers.Instance.MapToCompanyTypeDto);
            }
        }
    }
}

