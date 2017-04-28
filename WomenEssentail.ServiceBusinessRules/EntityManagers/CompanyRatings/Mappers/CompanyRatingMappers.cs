using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyRatings.Mappers
{
	public class CompanyRatingMappers 
	{
		private static CompanyRatingMappers _Instance;

		private CompanyRatingMappers()
		{ 
		} 

		public static CompanyRatingMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new CompanyRatingMappers();
				}
				return _Instance;
			}
		}

		public CompanyRatingDto MapToCompanyRatingDto(SqlDataReader sqlDataReader)
		{
			CompanyRatingDto companyRatingDto = new CompanyRatingDto();

			companyRatingDto.Id = sqlDataReader["Id"].ToInteger();
			companyRatingDto.CompanyId = sqlDataReader["CompanyId"].ToInteger();
			companyRatingDto.Rating = sqlDataReader["Rating"].ToInteger();
			companyRatingDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();

			return companyRatingDto;
		}

	}
}

