using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Audit_Persons.Mappers
{
	public class Audit_PersonMappers 
	{
		private static Audit_PersonMappers _Instance;

		private Audit_PersonMappers()
		{ 
		} 

		public static Audit_PersonMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new Audit_PersonMappers();
				}
				return _Instance;
			}
		}

		public Audit_PersonDto MapToAudit_PersonDto(SqlDataReader sqlDataReader)
		{
			Audit_PersonDto audit_PersonDto = new Audit_PersonDto();

			audit_PersonDto.Id = sqlDataReader["Id"].ToInteger();
			audit_PersonDto.PersonId = sqlDataReader["PersonId"].ToInteger();
			audit_PersonDto.DateOfBirth = sqlDataReader["DateOfBirth"].ToDateTime();
			audit_PersonDto.IsSouthAfricanCitizen = sqlDataReader["IsSouthAfricanCitizen"].ToBoolean();
			audit_PersonDto.PhysicalAddressId = sqlDataReader["PhysicalAddressId"].ToInteger();
			audit_PersonDto.PostalAddressId = sqlDataReader["PostalAddressId"].ToInteger();
			audit_PersonDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			audit_PersonDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();
			audit_PersonDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			audit_PersonDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			audit_PersonDto.CreatDate = sqlDataReader["CreatDate"].ToDateTime();

			return audit_PersonDto;
		}

	}
}

