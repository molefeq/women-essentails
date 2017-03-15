using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Audit_PromotionProducts.Mappers
{
	public class Audit_PromotionProductMappers 
	{
		private static Audit_PromotionProductMappers _Instance;

		private Audit_PromotionProductMappers()
		{ 
		} 

		public static Audit_PromotionProductMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new Audit_PromotionProductMappers();
				}
				return _Instance;
			}
		}

		public Audit_PromotionProductDto MapToAudit_PromotionProductDto(SqlDataReader sqlDataReader)
		{
			Audit_PromotionProductDto audit_PromotionProductDto = new Audit_PromotionProductDto();

			audit_PromotionProductDto.Id = sqlDataReader["Id"].ToInteger();
			audit_PromotionProductDto.PromotionProductId = sqlDataReader["PromotionProductId"].ToInteger();
			audit_PromotionProductDto.StartDate = sqlDataReader["StartDate"].ToDateTime();
			audit_PromotionProductDto.EndDate = sqlDataReader["EndDate"].ToDateTime();
			audit_PromotionProductDto.ProductId = sqlDataReader["ProductId"].ToInteger();
			audit_PromotionProductDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			audit_PromotionProductDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			audit_PromotionProductDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			audit_PromotionProductDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			audit_PromotionProductDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();

			return audit_PromotionProductDto;
		}

	}
}

