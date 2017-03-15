using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Audit_Addresss.Mappers
{
	public class Audit_AddressMappers 
	{
		private static Audit_AddressMappers _Instance;

		private Audit_AddressMappers()
		{ 
		} 

		public static Audit_AddressMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new Audit_AddressMappers();
				}
				return _Instance;
			}
		}

		public Audit_AddressDto MapToAudit_AddressDto(SqlDataReader sqlDataReader)
		{
			Audit_AddressDto audit_AddressDto = new Audit_AddressDto();

			audit_AddressDto.Id = sqlDataReader["Id"].ToInteger();
			audit_AddressDto.AddressId = sqlDataReader["AddressId"].ToInteger();
			audit_AddressDto.ProvinceId = sqlDataReader["ProvinceId"].ToInteger();
			audit_AddressDto.CountryId = sqlDataReader["CountryId"].ToInteger();
			audit_AddressDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();
			audit_AddressDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			audit_AddressDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			audit_AddressDto.CreatDate = sqlDataReader["CreatDate"].ToDateTime();
			audit_AddressDto.StatusId = sqlDataReader["StatusId"].ToInteger();

			return audit_AddressDto;
		}

	}
}

