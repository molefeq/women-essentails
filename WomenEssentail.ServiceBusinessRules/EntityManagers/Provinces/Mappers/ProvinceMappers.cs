using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Provinces.Mappers
{
	public class ProvinceMappers 
	{
		private static ProvinceMappers _Instance;

		private ProvinceMappers()
		{ 
		} 

		public static ProvinceMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new ProvinceMappers();
				}
				return _Instance;
			}
		}

		public ProvinceDto MapToProvinceDto(SqlDataReader sqlDataReader)
		{
			ProvinceDto provinceDto = new ProvinceDto();

			provinceDto.Id = sqlDataReader["Id"].ToInteger();

			return provinceDto;
		}

	}
}

