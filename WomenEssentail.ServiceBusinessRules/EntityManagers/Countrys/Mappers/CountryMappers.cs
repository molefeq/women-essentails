using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Countrys.Mappers
{
	public class CountryMappers 
	{
		private static CountryMappers _Instance;

		private CountryMappers()
		{ 
		} 

		public static CountryMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new CountryMappers();
				}
				return _Instance;
			}
		}

		public CountryDto MapToCountryDto(SqlDataReader sqlDataReader)
		{
			CountryDto countryDto = new CountryDto();

			countryDto.Id = sqlDataReader["Id"].ToInteger();

			return countryDto;
		}

	}
}

