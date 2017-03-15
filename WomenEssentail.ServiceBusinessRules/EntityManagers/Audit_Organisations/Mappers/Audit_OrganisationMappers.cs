using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Audit_Organisations.Mappers
{
	public class Audit_OrganisationMappers 
	{
		private static Audit_OrganisationMappers _Instance;

		private Audit_OrganisationMappers()
		{ 
		} 

		public static Audit_OrganisationMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new Audit_OrganisationMappers();
				}
				return _Instance;
			}
		}

		public Audit_OrganisationDto MapToAudit_OrganisationDto(SqlDataReader sqlDataReader)
		{
			Audit_OrganisationDto audit_OrganisationDto = new Audit_OrganisationDto();

			audit_OrganisationDto.Id = sqlDataReader["Id"].ToInteger();
			audit_OrganisationDto.OrganisationId = sqlDataReader["OrganisationId"].ToInteger();
			audit_OrganisationDto.ContactPersonId = sqlDataReader["ContactPersonId"].ToInteger();
			audit_OrganisationDto.PhysicalAddressId = sqlDataReader["PhysicalAddressId"].ToInteger();
			audit_OrganisationDto.PostalAddressId = sqlDataReader["PostalAddressId"].ToInteger();
			audit_OrganisationDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			audit_OrganisationDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();
			audit_OrganisationDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			audit_OrganisationDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			audit_OrganisationDto.CreatDate = sqlDataReader["CreatDate"].ToDateTime();

			return audit_OrganisationDto;
		}

	}
}

