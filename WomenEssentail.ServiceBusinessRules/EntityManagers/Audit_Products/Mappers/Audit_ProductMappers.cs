using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Audit_Products.Mappers
{
	public class Audit_ProductMappers 
	{
		private static Audit_ProductMappers _Instance;

		private Audit_ProductMappers()
		{ 
		} 

		public static Audit_ProductMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new Audit_ProductMappers();
				}
				return _Instance;
			}
		}

		public Audit_ProductDto MapToAudit_ProductDto(SqlDataReader sqlDataReader)
		{
			Audit_ProductDto audit_ProductDto = new Audit_ProductDto();

			audit_ProductDto.Id = sqlDataReader["Id"].ToInteger();
			audit_ProductDto.ProductId = sqlDataReader["ProductId"].ToInteger();
			audit_ProductDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			audit_ProductDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			audit_ProductDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			audit_ProductDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			audit_ProductDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();

			return audit_ProductDto;
		}

	}
}

