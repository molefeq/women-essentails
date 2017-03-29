using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyTypes.Mappers
{
	public class CompanyTypeMappers 
	{
		private static CompanyTypeMappers _Instance;

		private CompanyTypeMappers()
		{ 
		} 

		public static CompanyTypeMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new CompanyTypeMappers();
				}
				return _Instance;
			}
		}

		public CompanyTypeDto MapToCompanyTypeDto(SqlDataReader sqlDataReader)
		{
			CompanyTypeDto companyTypeDto = new CompanyTypeDto();

			companyTypeDto.Id = sqlDataReader["Id"].ToInteger();
            companyTypeDto.Name = sqlDataReader["Name"].ToString();
            companyTypeDto.Code = sqlDataReader["Code"].ToString();

            return companyTypeDto;
		}

	}
}

