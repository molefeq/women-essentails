using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Companies.Mappers
{
	public class CompanyMappers 
	{
		private static CompanyMappers _Instance;

		private CompanyMappers()
		{ 
		} 

		public static CompanyMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new CompanyMappers();
				}
				return _Instance;
			}
		}

		public CompanyDto MapToCompanyDto(SqlDataReader sqlDataReader)
		{
			CompanyDto companyDto = new CompanyDto();

			companyDto.Id = sqlDataReader["Id"].ToInteger();
			companyDto.OrganisationId = sqlDataReader["OrganisationId"].ToInteger();
			companyDto.CompanyTypeId = sqlDataReader["CompanyTypeId"].ToInteger();
			companyDto.ContactPersonId = sqlDataReader["ContactPersonId"].ToInteger();
			companyDto.PhysicalAddressId = sqlDataReader["PhysicalAddressId"].ToInteger();
			companyDto.PostalAddressId = sqlDataReader["PostalAddressId"].ToInteger();
			companyDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			companyDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();
			companyDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			companyDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			companyDto.CreatDate = sqlDataReader["CreatDate"].ToDateTime();

			return companyDto;
		}

	}
}

