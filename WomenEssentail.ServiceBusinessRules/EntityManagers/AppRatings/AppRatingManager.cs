using Libraries.Common.ResponseObjects;
using WomenEssentail.Common.DataTransferObjects;
using WomenEssentail.ServiceBusinessRules.EntityManagers.AppRatings.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.AppRatings
{
    public class AppRatingManager : IAppRatingManager
    {
        public Response<AppRatingDto> Save(AppRatingDto appRatingDto)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.AppRatings.Save(appRatingDto, AppRatingMappers.Instance.MapToAppRatingDto);
            }
        }
    }
}

