using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Addresss.Mappers
{
	public class AddressMappers 
	{
		private static AddressMappers _Instance;

		private AddressMappers()
		{ 
		} 

		public static AddressMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new AddressMappers();
				}
				return _Instance;
			}
		}

		public AddressDto MapToAddressDto(SqlDataReader sqlDataReader)
		{
			AddressDto addressDto = new AddressDto();

			addressDto.Id = sqlDataReader["Id"].ToInteger();
			addressDto.ProvinceId = sqlDataReader["ProvinceId"].ToInteger();
			addressDto.CountryId = sqlDataReader["CountryId"].ToInteger();
			addressDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();
			addressDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			addressDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			addressDto.CreatDate = sqlDataReader["CreatDate"].ToDateTime();
			addressDto.StatusId = sqlDataReader["StatusId"].ToInteger();

			return addressDto;
		}

	}
}

