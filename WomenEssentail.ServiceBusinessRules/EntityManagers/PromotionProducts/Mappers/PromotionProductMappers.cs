using Libraries.Common.Enums;
using Libraries.Common.Extensions;

using System.Data.SqlClient;

using WomenEssentail.Common.DataTransferObjects;

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
        public PromotionProductSummaryDto MapAppQueryToPromotionProductSummaryDto(SqlDataReader sqlDataReader)
        {
            PromotionProductSummaryDto promotionProductSummaryDto = MapToPromotionProductSummaryDto(sqlDataReader);

            promotionProductSummaryDto.CompanyId = sqlDataReader["CompanyId"].ToInteger();

            return promotionProductSummaryDto;
        }

        public PromotionProductSummaryDto MapToPromotionProductSummaryDto(SqlDataReader sqlDataReader)
        {
            PromotionProductSummaryDto promotionProductSummaryDto = new PromotionProductSummaryDto();

            promotionProductSummaryDto.Id = sqlDataReader["Id"].ToInteger();
            promotionProductSummaryDto.Name = sqlDataReader["Name"].ToString();
            promotionProductSummaryDto.Description = sqlDataReader["Description"].ToString();
            promotionProductSummaryDto.Title = sqlDataReader["Title"].ToString();
            promotionProductSummaryDto.Logo = sqlDataReader["Logo"].ToString();
            promotionProductSummaryDto.StartDate = sqlDataReader["StartDate"].ToDateTime();
            promotionProductSummaryDto.EndDate = sqlDataReader["EndDate"].ToDateTime();
            promotionProductSummaryDto.ProductId = sqlDataReader["ProductId"].ToInteger();
            promotionProductSummaryDto.Price = sqlDataReader["Price"].ToDecimal();
            promotionProductSummaryDto.StatusId = sqlDataReader["StatusId"].ToInteger();
            promotionProductSummaryDto.StatusName = sqlDataReader["StatusName"].ToString();
            promotionProductSummaryDto.StatusCode = sqlDataReader["StatusCode"].ToString();
            promotionProductSummaryDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
            promotionProductSummaryDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
            promotionProductSummaryDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
            promotionProductSummaryDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();
            promotionProductSummaryDto.CrudStatus = CrudStatus.UPDATE;

            return promotionProductSummaryDto;
        }

        public PromotionProductDto MapToPromotionProductDto(SqlDataReader sqlDataReader)
        {
            PromotionProductDto promotionProductDto = new PromotionProductDto();

            promotionProductDto.Id = sqlDataReader["Id"].ToInteger();
            promotionProductDto.Name = sqlDataReader["Name"].ToString();
            promotionProductDto.Description = sqlDataReader["Description"].ToString();
            promotionProductDto.Title = sqlDataReader["Title"].ToString();
            promotionProductDto.Logo = sqlDataReader["Logo"].ToString();
            promotionProductDto.StartDate = sqlDataReader["StartDate"].ToDateTime();
            promotionProductDto.EndDate = sqlDataReader["EndDate"].ToDateTime();
            promotionProductDto.ProductId = sqlDataReader["ProductId"].ToInteger();
            promotionProductDto.Price = sqlDataReader["Price"].ToDecimal();
            promotionProductDto.StatusId = sqlDataReader["StatusId"].ToInteger();
            promotionProductDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
            promotionProductDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
            promotionProductDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
            promotionProductDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();
            promotionProductDto.CrudStatus = CrudStatus.UPDATE;

            return promotionProductDto;
        }
    }
}

