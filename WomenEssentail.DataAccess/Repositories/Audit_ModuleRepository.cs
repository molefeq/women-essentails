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
	public class Audit_ModuleRepository :  DataAccessEntitySet<Audit_ModuleDto> 
	{
		public Audit_ModuleRepository(SqlConnection connection) 
			: base(new StoredProcedureManager(connection)) 
		{
		}


		public Response<Audit_ModuleDto> Save(Audit_ModuleDto audit_ModuleDto, Func<SqlDataReader, Audit_ModuleDto> audit_ModuleDtoMapper) 
		{
			SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(audit_ModuleDto);
			string storedProcedureName = GetCrudStoredProcedureName(audit_ModuleDto.CrudStatus);

			return Save(storedProcedureName, audit_ModuleDtoMapper, sqlQueryParameters);
		}

		#region Private Methods

		private SqlQueryParameter[] GetSaveParameters(Audit_ModuleDto audit_ModuleDto)
		{
			List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

			if (audit_ModuleDto.CrudStatus == CrudStatus.DELETE || audit_ModuleDto.CrudStatus == CrudStatus.UPDATE || audit_ModuleDto.CrudStatus == CrudStatus.READ)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Id", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_ModuleDto.Id });
			}

			if (audit_ModuleDto.CrudStatus == CrudStatus.CREATE || audit_ModuleDto.CrudStatus == CrudStatus.UPDATE)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ModuleId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_ModuleDto.ModuleId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Code", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = audit_ModuleDto.Code });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Name", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = audit_ModuleDto.Name });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ModuleUrl", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = audit_ModuleDto.ModuleUrl });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ParentModuleId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_ModuleDto.ParentModuleId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "StatusId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_ModuleDto.StatusId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CreateDate", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.DateTime, ParameterValue = audit_ModuleDto.CreateDate });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CreateUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_ModuleDto.CreateUserId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditDate", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.DateTime, ParameterValue = audit_ModuleDto.EditDate });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_ModuleDto.EditUserId });
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

