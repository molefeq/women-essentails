using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

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

		public ProductDto MapToProductDto(SqlDataReader sqlDataReader)
		{
			ProductDto productDto = new ProductDto();

			productDto.Id = sqlDataReader["Id"].ToInteger();
			productDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			productDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			productDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			productDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			productDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();

			return productDto;
		}

	}
}

