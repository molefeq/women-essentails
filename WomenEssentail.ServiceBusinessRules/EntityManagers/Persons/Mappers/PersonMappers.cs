using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Persons.Mappers
{
	public class PersonMappers 
	{
		private static PersonMappers _Instance;

		private PersonMappers()
		{ 
		} 

		public static PersonMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new PersonMappers();
				}
				return _Instance;
			}
		}

		public PersonDto MapToPersonDto(SqlDataReader sqlDataReader)
		{
			PersonDto personDto = new PersonDto();

			personDto.Id = sqlDataReader["Id"].ToInteger();
			personDto.DateOfBirth = sqlDataReader["DateOfBirth"].ToDateTime();
			personDto.IsSouthAfricanCitizen = sqlDataReader["IsSouthAfricanCitizen"].ToBoolean();
			personDto.PhysicalAddressId = sqlDataReader["PhysicalAddressId"].ToInteger();
			personDto.PostalAddressId = sqlDataReader["PostalAddressId"].ToInteger();
			personDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			personDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();
			personDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			personDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			personDto.CreatDate = sqlDataReader["CreatDate"].ToDateTime();

			return personDto;
		}

	}
}

