using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.PromotionProducts.Mappers
{
	public class PromotionProductMappers 
	{
		private static PromotionProductMappers _Instance;

		private PromotionProductMappers()
		{ 
		} 

		public static PromotionProductMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new PromotionProductMappers();
				}
				return _Instance;
			}
		}

		public PromotionProductDto MapToPromotionProductDto(SqlDataReader sqlDataReader)
		{
			PromotionProductDto promotionProductDto = new PromotionProductDto();

			promotionProductDto.Id = sqlDataReader["Id"].ToInteger();
			promotionProductDto.StartDate = sqlDataReader["StartDate"].ToDateTime();
			promotionProductDto.EndDate = sqlDataReader["EndDate"].ToDateTime();
			promotionProductDto.ProductId = sqlDataReader["ProductId"].ToInteger();
			promotionProductDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			promotionProductDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			promotionProductDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			promotionProductDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			promotionProductDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();

			return promotionProductDto;
		}

	}
}

