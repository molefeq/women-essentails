using Libraries.Common.Enums;
using Libraries.Common.ResponseObjects;

using Libraries.DataAccess.AdoDotNetLibrary;
using Libraries.DataAccess.AdoDotNetLibrary.CommandTypeManagers;
using Libraries.DataAccess.AdoDotNetLibrary.Enums;
using Libraries.DataAccess.AdoDotNetLibrary.Extensions;
using Libraries.DataAccess.AdoDotNetLibrary.Models;

using WomenEssentail.Common.DataTransferObjects;

using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace WomenEssentail.DataAccess.Repositories
{
	public class PromotionProductRepository :  DataAccessEntitySet<PromotionProductDto> 
	{
		public PromotionProductRepository(SqlConnection connection) 
			: base(new StoredProcedureManager(connection)) 
		{
		}


		public Response<PromotionProductDto> Save(PromotionProductDto promotionProductDto, Func<SqlDataReader, PromotionProductDto> promotionProductDtoMapper) 
		{
			SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(promotionProductDto);
			string storedProcedureName = GetCrudStoredProcedureName(promotionProductDto.CrudStatus);

			return Save(storedProcedureName, promotionProductDtoMapper, sqlQueryParameters);
		}

		#region Private Methods

		private SqlQueryParameter[] GetSaveParameters(PromotionProductDto promotionProductDto)
		{
			List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

			if (promotionProductDto.CrudStatus == CrudStatus.DELETE || promotionProductDto.CrudStatus == CrudStatus.UPDATE || promotionProductDto.CrudStatus == CrudStatus.READ)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Id", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = promotionProductDto.Id });
			}

			if (promotionProductDto.CrudStatus == CrudStatus.CREATE || promotionProductDto.CrudStatus == CrudStatus.UPDATE)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Name", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 200, ParameterValue = promotionProductDto.Name });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Description", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 2000, ParameterValue = promotionProductDto.Description });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Title", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = promotionProductDto.Title });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Logo", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 500, ParameterValue = promotionProductDto.Logo });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "StartDate", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.DateTime, ParameterValue = promotionProductDto.StartDate });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EndDate", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.DateTime, ParameterValue = promotionProductDto.EndDate });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ProductId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = promotionProductDto.ProductId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "StatusId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = promotionProductDto.StatusId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CreateDate", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.DateTime, ParameterValue = promotionProductDto.CreateDate });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CreateUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = promotionProductDto.CreateUserId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditDate", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.DateTime, ParameterValue = promotionProductDto.EditDate });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = promotionProductDto.EditUserId });
			}

			sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

			return sqlQueryParameters.ToArray();
		}


		private string GetCrudStoredProcedureName(CrudStatus crudStatus) 
		{
			switch (crudStatus)
			{
				case CrudStatus.CREATE:
					 return "AccountInsert";
				case CrudStatus.UPDATE:
					 return "AccountUpdate";
				case CrudStatus.DELETE:
					 return "AccountDelete";
				case CrudStatus.READ:
					 return "AccountFetch";
				default:
					 throw new Exception("Invalid crud operation.");
			}
		}

		#endregion


	}
}

