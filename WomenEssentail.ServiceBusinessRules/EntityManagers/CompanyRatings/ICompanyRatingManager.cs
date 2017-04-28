using Libraries.Common.ResponseObjects;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyRatings
{
    public interface ICompanyRatingManager
    {
        Response<CompanyRatingDto> Save(CompanyRatingDto companyRatingDto);

    }
}

