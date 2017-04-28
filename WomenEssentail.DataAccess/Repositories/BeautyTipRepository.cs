using Libraries.Common.Enums;
using Libraries.Common.ResponseObjects;

using Libraries.DataAccess.AdoDotNetLibrary;
using Libraries.DataAccess.AdoDotNetLibrary.CommandTypeManagers;
using Libraries.DataAccess.AdoDotNetLibrary.Enums;
using Libraries.DataAccess.AdoDotNetLibrary.Models;

using System;
using System.Collections.Generic;
using System.Data.SqlClient;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.DataAccess.Repositories
{
    public class BeautyTipRepository :  DataAccessEntitySet<BeautyTipDto> 
	{
		public BeautyTipRepository(SqlConnection connection) 
			: base(new StoredProcedureManager(connection)) 
		{
		}


        public Result<BeautyTipDto> Get(BeautyTipSearchFilter beautyTipSearchFilter, Func<SqlDataReader, BeautyTipDto> beautyTipDtoMapper)
        {
            List<SqlQueryParameter> sqlQueryParameters = GetPagedDataParameters(beautyTipSearchFilter.PageData);

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SubCategoryId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = beautyTipSearchFilter.SubCategoryId });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CategoryId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = beautyTipSearchFilter.CategoryId });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "StatusCode", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = beautyTipSearchFilter.StatusCode });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SearchText", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = beautyTipSearchFilter.SearchText });

            return GetPagedEntities("BeautyTipsFetch", beautyTipDtoMapper, sqlQueryParameters.ToArray());
        }

        public Response<BeautyTipDto> Activate(BeautyTipDto beautyTipDto, Func<SqlDataReader, BeautyTipDto> beautyTipDtoMapper)
        {
            List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "BeautyTipId ", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = beautyTipDto.Id });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = beautyTipDto.EditUserId });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

            return Save("BeautyTipActivate", beautyTipDtoMapper, sqlQueryParameters.ToArray());
        }

        public Response<BeautyTipDto> Save(BeautyTipDto beautyTipDto, Func<SqlDataReader, BeautyTipDto> beautyTipDtoMapper) 
		{
			SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(beautyTipDto);
			string storedProcedureName = GetCrudStoredProcedureName(beautyTipDto.CrudStatus);

			return Save(storedProcedureName, beautyTipDtoMapper, sqlQueryParameters);
		}

		#region Private Methods

		private SqlQueryParameter[] GetSaveParameters(BeautyTipDto beautyTipDto)
		{
			List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

			if (beautyTipDto.CrudStatus == CrudStatus.DELETE || beautyTipDto.CrudStatus == CrudStatus.UPDATE || beautyTipDto.CrudStatus == CrudStatus.READ)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "BeautyTipId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = beautyTipDto.Id });
			}

			if (beautyTipDto.CrudStatus == CrudStatus.CREATE || beautyTipDto.CrudStatus == CrudStatus.UPDATE)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Subject", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 500, ParameterValue = beautyTipDto.Subject });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CategoryId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = beautyTipDto.CategoryId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SubCategoryId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = beautyTipDto.SubCategoryId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Tip", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 2000, ParameterValue = beautyTipDto.Tip });
			}

            if (beautyTipDto.CrudStatus == CrudStatus.DELETE || beautyTipDto.CrudStatus == CrudStatus.UPDATE || beautyTipDto.CrudStatus == CrudStatus.CREATE)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = beautyTipDto.EditUserId });
            }

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

			return sqlQueryParameters.ToArray();
		}


		private string GetCrudStoredProcedureName(CrudStatus crudStatus) 
		{
			switch (crudStatus)
			{
				case CrudStatus.CREATE:
					 return "BeautyTipInsert";
				case CrudStatus.UPDATE:
					 return "BeautyTipUpdate";
				case CrudStatus.DELETE:
					 return "BeautyTipDelete";
				case CrudStatus.READ:
					 return "BeautyTipFetch";
				default:
					 throw new Exception("Invalid crud operation.");
			}
		}

		#endregion


	}
}

