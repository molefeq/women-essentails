using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyTypeProducts.Mappers
{
	public class CompanyTypeProductMappers 
	{
		private static CompanyTypeProductMappers _Instance;

		private CompanyTypeProductMappers()
		{ 
		} 

		public static CompanyTypeProductMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new CompanyTypeProductMappers();
				}
				return _Instance;
			}
		}

		public CompanyTypeProductDto MapToCompanyTypeProductDto(SqlDataReader sqlDataReader)
		{
			CompanyTypeProductDto companyTypeProductDto = new CompanyTypeProductDto();

			companyTypeProductDto.Id = sqlDataReader["Id"].ToInteger();
			companyTypeProductDto.ProductId = sqlDataReader["ProductId"].ToInteger();
			companyTypeProductDto.CompanyTypeId = sqlDataReader["CompanyTypeId"].ToInteger();
			companyTypeProductDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			companyTypeProductDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			companyTypeProductDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			companyTypeProductDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			companyTypeProductDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();

			return companyTypeProductDto;
		}

	}
}

