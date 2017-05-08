using Libraries.Common.ResponseObjects;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.AppRatings
{
	public interface IAppRatingManager 
	{
        Response<AppRatingDto> Save(AppRatingDto appRatingDto);

    }
}

