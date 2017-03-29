using Libraries.Common.Enums;
using Libraries.Common.Extensions;

using System.Data.SqlClient;

using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Products.Mappers
{
    public class ProductMappers 
	{
		private static ProductMappers _Instance;

		private ProductMappers()
		{ 
		} 

		public static ProductMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new ProductMappers();
				}
				return _Instance;
			}
        }

        public ProductSummaryDto MapToCompanyPrdocutsQueryToProductSummaryDto(SqlDataReader sqlDataReader)
        {
            ProductSummaryDto productSummaryDto = new ProductSummaryDto();

            productSummaryDto.Id = sqlDataReader["Id"].ToInteger();
            productSummaryDto.CategoryName = sqlDataReader["CategoryName"].ToString();
            productSummaryDto.SubCategoryName = sqlDataReader["SubCategoryName"].ToString();
            productSummaryDto.Name = sqlDataReader["Name"].ToString();
            productSummaryDto.Logo = sqlDataReader["Logo"].ToString();
            productSummaryDto.Description = sqlDataReader["Description"].ToString();
            productSummaryDto.Title = sqlDataReader["Title"].ToString();
            productSummaryDto.TotalPromotionProducts = sqlDataReader["TotalPromotionProducts"].ToInteger();
            productSummaryDto.Price = sqlDataReader["Price"].ToDecimal();
            productSummaryDto.CrudStatus = CrudStatus.UPDATE;

            return productSummaryDto;
        }

        public ProductSummaryDto MapToProductSummaryDto(SqlDataReader sqlDataReader)
        {
            ProductSummaryDto productSummaryDto = new ProductSummaryDto();

            productSummaryDto.Id = sqlDataReader["Id"].ToInteger();
            productSummaryDto.CategoryId = sqlDataReader["CategoryId"].ToInteger();
            productSummaryDto.SubCategoryId = sqlDataReader["SubCategoryId"].ToInteger();
            productSummaryDto.CompanyId = sqlDataReader["CompanyId"].ToInteger();
            productSummaryDto.Name = sqlDataReader["Name"].ToString();
            productSummaryDto.Logo = sqlDataReader["Logo"].ToString();
            productSummaryDto.Description = sqlDataReader["Description"].ToString();
            productSummaryDto.Title = sqlDataReader["Title"].ToString();
            productSummaryDto.StatusId = sqlDataReader["StatusId"].ToInteger();
            productSummaryDto.StatusName = sqlDataReader["StatusName"].ToString();
            productSummaryDto.StatusCode = sqlDataReader["StatusCode"].ToString();
            productSummaryDto.TotalPromotionProducts = sqlDataReader["TotalPromotionProducts"].ToInteger();
            productSummaryDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
            productSummaryDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
            productSummaryDto.EditDate = sqlDataReader["EditDate"].ToDateTime(); ;
            productSummaryDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();
            productSummaryDto.Price = sqlDataReader["Price"].ToDecimal();
            productSummaryDto.CrudStatus = CrudStatus.UPDATE;

            return productSummaryDto;
        } 

        public ProductDto MapToProductDto(SqlDataReader sqlDataReader)
		{
			ProductDto productDto = new ProductDto();

            productDto.Id = sqlDataReader["Id"].ToInteger();
            productDto.CategoryId = sqlDataReader["CategoryId"].ToInteger();
            productDto.SubCategoryId = sqlDataReader["SubCategoryId"].ToInteger();
            productDto.CompanyId = sqlDataReader["CompanyId"].ToInteger();
            productDto.Name = sqlDataReader["Name"].ToString();
            productDto.Logo = sqlDataReader["Logo"].ToString();
            productDto.Description = sqlDataReader["Description"].ToString();
            productDto.Title = sqlDataReader["Title"].ToString();
            productDto.StatusId = sqlDataReader["StatusId"].ToInteger();
            productDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
            productDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
            productDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
            productDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();
            productDto.Price = sqlDataReader["Price"].ToDecimal();
            productDto.CrudStatus = CrudStatus.UPDATE;

            return productDto;
		}

	}
}

