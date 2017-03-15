using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Audit_Companies.Mappers
{
	public class Audit_CompanyMappers 
	{
		private static Audit_CompanyMappers _Instance;

		private Audit_CompanyMappers()
		{ 
		} 

		public static Audit_CompanyMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new Audit_CompanyMappers();
				}
				return _Instance;
			}
		}

		public Audit_CompanyDto MapToAudit_CompanyDto(SqlDataReader sqlDataReader)
		{
			Audit_CompanyDto audit_CompanyDto = new Audit_CompanyDto();

			audit_CompanyDto.Id = sqlDataReader["Id"].ToInteger();
			audit_CompanyDto.CompanyId = sqlDataReader["CompanyId"].ToInteger();
			audit_CompanyDto.OrganisationId = sqlDataReader["OrganisationId"].ToInteger();
			audit_CompanyDto.CompanyTypeId = sqlDataReader["CompanyTypeId"].ToInteger();
			audit_CompanyDto.ContactPersonId = sqlDataReader["ContactPersonId"].ToInteger();
			audit_CompanyDto.PhysicalAddressId = sqlDataReader["PhysicalAddressId"].ToInteger();
			audit_CompanyDto.PostalAddressId = sqlDataReader["PostalAddressId"].ToInteger();
			audit_CompanyDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			audit_CompanyDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();
			audit_CompanyDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			audit_CompanyDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			audit_CompanyDto.CreatDate = sqlDataReader["CreatDate"].ToDateTime();

			return audit_CompanyDto;
		}

	}
}

