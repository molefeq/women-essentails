using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Audit_CompanyProducts.Mappers
{
	public class Audit_CompanyProductMappers 
	{
		private static Audit_CompanyProductMappers _Instance;

		private Audit_CompanyProductMappers()
		{ 
		} 

		public static Audit_CompanyProductMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new Audit_CompanyProductMappers();
				}
				return _Instance;
			}
		}

		public Audit_CompanyProductDto MapToAudit_CompanyProductDto(SqlDataReader sqlDataReader)
		{
			Audit_CompanyProductDto audit_CompanyProductDto = new Audit_CompanyProductDto();

			audit_CompanyProductDto.Id = sqlDataReader["Id"].ToInteger();
			audit_CompanyProductDto.CompanyProductId = sqlDataReader["CompanyProductId"].ToInteger();
			audit_CompanyProductDto.ProductId = sqlDataReader["ProductId"].ToInteger();
			audit_CompanyProductDto.CompanyId = sqlDataReader["CompanyId"].ToInteger();
			audit_CompanyProductDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			audit_CompanyProductDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			audit_CompanyProductDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			audit_CompanyProductDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			audit_CompanyProductDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();

			return audit_CompanyProductDto;
		}

	}
}

