using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Organisations.Mappers
{
	public class OrganisationMappers 
	{
		private static OrganisationMappers _Instance;

		private OrganisationMappers()
		{ 
		} 

		public static OrganisationMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new OrganisationMappers();
				}
				return _Instance;
			}
		}

		public OrganisationDto MapToOrganisationDto(SqlDataReader sqlDataReader)
		{
			OrganisationDto organisationDto = new OrganisationDto();

			organisationDto.Id = sqlDataReader["Id"].ToInteger();
			organisationDto.ContactPersonId = sqlDataReader["ContactPersonId"].ToInteger();
			organisationDto.PhysicalAddressId = sqlDataReader["PhysicalAddressId"].ToInteger();
			organisationDto.PostalAddressId = sqlDataReader["PostalAddressId"].ToInteger();
			organisationDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			organisationDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();
			organisationDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			organisationDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			organisationDto.CreatDate = sqlDataReader["CreatDate"].ToDateTime();

			return organisationDto;
		}

	}
}

