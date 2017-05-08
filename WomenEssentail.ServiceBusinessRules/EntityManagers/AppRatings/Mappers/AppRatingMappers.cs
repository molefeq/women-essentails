using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.AppRatings.Mappers
{
	public class AppRatingMappers 
	{
		private static AppRatingMappers _Instance;

		private AppRatingMappers()
		{ 
		} 

		public static AppRatingMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new AppRatingMappers();
				}
				return _Instance;
			}
		}

		public AppRatingDto MapToAppRatingDto(SqlDataReader sqlDataReader)
		{
			AppRatingDto appRatingDto = new AppRatingDto();

			appRatingDto.Id = sqlDataReader["Id"].ToInteger();
			appRatingDto.DeviceId = sqlDataReader["DeviceId"].ToInteger();
			appRatingDto.Rating = sqlDataReader["Rating"].ToInteger();
			appRatingDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();

			return appRatingDto;
		}

	}
}

