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
	public class ExternalAuthenticationTypeRepository :  DataAccessEntitySet<ExternalAuthenticationTypeDto> 
	{
		public ExternalAuthenticationTypeRepository(SqlConnection connection) 
			: base(new StoredProcedureManager(connection)) 
		{
		}


		public Response<ExternalAuthenticationTypeDto> Save(ExternalAuthenticationTypeDto externalAuthenticationTypeDto, Func<SqlDataReader, ExternalAuthenticationTypeDto> externalAuthenticationTypeDtoMapper) 
		{
			SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(externalAuthenticationTypeDto);
			string storedProcedureName = GetCrudStoredProcedureName(externalAuthenticationTypeDto.CrudStatus);

			return Save(storedProcedureName, externalAuthenticationTypeDtoMapper, sqlQueryParameters);
		}

		#region Private Methods

		private SqlQueryParameter[] GetSaveParameters(ExternalAuthenticationTypeDto externalAuthenticationTypeDto)
		{
			List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

			if (externalAuthenticationTypeDto.CrudStatus == CrudStatus.DELETE || externalAuthenticationTypeDto.CrudStatus == CrudStatus.UPDATE || externalAuthenticationTypeDto.CrudStatus == CrudStatus.READ)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Id", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = externalAuthenticationTypeDto.Id });
			}

			if (externalAuthenticationTypeDto.CrudStatus == CrudStatus.CREATE || externalAuthenticationTypeDto.CrudStatus == CrudStatus.UPDATE)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Code", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = externalAuthenticationTypeDto.Code });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Name", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = externalAuthenticationTypeDto.Name });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Logo", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 500, ParameterValue = externalAuthenticationTypeDto.Logo });
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

