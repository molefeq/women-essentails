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
	public class Audit_RoleRepository :  DataAccessEntitySet<Audit_RoleDto> 
	{
		public Audit_RoleRepository(SqlConnection connection) 
			: base(new StoredProcedureManager(connection)) 
		{
		}


		public Response<Audit_RoleDto> Save(Audit_RoleDto audit_RoleDto, Func<SqlDataReader, Audit_RoleDto> audit_RoleDtoMapper) 
		{
			SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(audit_RoleDto);
			string storedProcedureName = GetCrudStoredProcedureName(audit_RoleDto.CrudStatus);

			return Save(storedProcedureName, audit_RoleDtoMapper, sqlQueryParameters);
		}

		#region Private Methods

		private SqlQueryParameter[] GetSaveParameters(Audit_RoleDto audit_RoleDto)
		{
			List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

			if (audit_RoleDto.CrudStatus == CrudStatus.DELETE || audit_RoleDto.CrudStatus == CrudStatus.UPDATE || audit_RoleDto.CrudStatus == CrudStatus.READ)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Id", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_RoleDto.Id });
			}

			if (audit_RoleDto.CrudStatus == CrudStatus.CREATE || audit_RoleDto.CrudStatus == CrudStatus.UPDATE)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "RoleId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_RoleDto.RoleId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Code", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = audit_RoleDto.Code });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Name", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = audit_RoleDto.Name });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CreateDate", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.DateTime, ParameterValue = audit_RoleDto.CreateDate });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CreateUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_RoleDto.CreateUserId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditDate", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.DateTime, ParameterValue = audit_RoleDto.EditDate });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_RoleDto.EditUserId });
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

