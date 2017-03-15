using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyProducts.Mappers
{
	public class CompanyProductMappers 
	{
		private static CompanyProductMappers _Instance;

		private CompanyProductMappers()
		{ 
		} 

		public static CompanyProductMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new CompanyProductMappers();
				}
				return _Instance;
			}
		}

		public CompanyProductDto MapToCompanyProductDto(SqlDataReader sqlDataReader)
		{
			CompanyProductDto companyProductDto = new CompanyProductDto();

			companyProductDto.Id = sqlDataReader["Id"].ToInteger();
			companyProductDto.ProductId = sqlDataReader["ProductId"].ToInteger();
			companyProductDto.CompanyId = sqlDataReader["CompanyId"].ToInteger();
			companyProductDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			companyProductDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			companyProductDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			companyProductDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			companyProductDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();

			return companyProductDto;
		}

	}
}

