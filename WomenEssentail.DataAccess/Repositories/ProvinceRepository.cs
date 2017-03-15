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
	public class ProvinceRepository :  DataAccessEntitySet<ProvinceDto> 
	{
		public ProvinceRepository(SqlConnection connection) 
			: base(new StoredProcedureManager(connection)) 
		{
		}


		public Response<ProvinceDto> Save(ProvinceDto provinceDto, Func<SqlDataReader, ProvinceDto> provinceDtoMapper) 
		{
			SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(provinceDto);
			string storedProcedureName = GetCrudStoredProcedureName(provinceDto.CrudStatus);

			return Save(storedProcedureName, provinceDtoMapper, sqlQueryParameters);
		}

		#region Private Methods

		private SqlQueryParameter[] GetSaveParameters(ProvinceDto provinceDto)
		{
			List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

			if (provinceDto.CrudStatus == CrudStatus.DELETE || provinceDto.CrudStatus == CrudStatus.UPDATE || provinceDto.CrudStatus == CrudStatus.READ)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Id", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = provinceDto.Id });
			}

			if (provinceDto.CrudStatus == CrudStatus.CREATE || provinceDto.CrudStatus == CrudStatus.UPDATE)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Code", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = provinceDto.Code });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Name", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = provinceDto.Name });
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

