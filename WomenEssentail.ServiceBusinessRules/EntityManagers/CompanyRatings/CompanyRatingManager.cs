using Libraries.Common.ResponseObjects;
using WomenEssentail.Common.DataTransferObjects;
using WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyRatings.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyRatings
{
	public class CompanyRatingManager : ICompanyRatingManager
    {
        public Response<CompanyRatingDto> Save(CompanyRatingDto companyRatingDto)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.CompanyRatings.Save(companyRatingDto, CompanyRatingMappers.Instance.MapToCompanyRatingDto);
            }
        }
    }
}

