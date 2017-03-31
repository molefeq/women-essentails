using Libraries.Common.ResponseObjects;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyRequest.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyRequests
{
    public class CompanyRequestManager : ICompanyRequestManager
    {
        public Result<CompanyRequestDto> GetCompanyRequests(SearchFilter searchFilter)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.CompanyRequests.Get(searchFilter, CompanyRequestMapper.Instance.MapToCompanyRequestDto);
            }
        }

        public Response<CompanyRequestDto> Save(CompanyRequestDto companyRequestDto)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.CompanyRequests.Save(companyRequestDto, CompanyRequestMapper.Instance.MapToCompanyRequestDto);
            }
        }
    }
}

