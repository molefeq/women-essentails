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
	public class Audit_AccountRepository :  DataAccessEntitySet<Audit_AccountDto> 
	{
		public Audit_AccountRepository(SqlConnection connection) 
			: base(new StoredProcedureManager(connection)) 
		{
		}


		public Response<Audit_AccountDto> Save(Audit_AccountDto audit_AccountDto, Func<SqlDataReader, Audit_AccountDto> audit_AccountDtoMapper) 
		{
			SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(audit_AccountDto);
			string storedProcedureName = GetCrudStoredProcedureName(audit_AccountDto.CrudStatus);

			return Save(storedProcedureName, audit_AccountDtoMapper, sqlQueryParameters);
		}

		#region Private Methods

		private SqlQueryParameter[] GetSaveParameters(Audit_AccountDto audit_AccountDto)
		{
			List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

			if (audit_AccountDto.CrudStatus == CrudStatus.DELETE || audit_AccountDto.CrudStatus == CrudStatus.UPDATE || audit_AccountDto.CrudStatus == CrudStatus.READ)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Id", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_AccountDto.Id });
			}

			if (audit_AccountDto.CrudStatus == CrudStatus.CREATE || audit_AccountDto.CrudStatus == CrudStatus.UPDATE)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "AccountId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_AccountDto.AccountId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "UserName", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = audit_AccountDto.UserName });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "AccountUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_AccountDto.AccountUserId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "IsFirstTimeLoggedInd", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Boolean, ParameterValue = audit_AccountDto.IsFirstTimeLoggedInd });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "OrganisationId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_AccountDto.OrganisationId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CompanyId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_AccountDto.CompanyId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "StatusId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_AccountDto.StatusId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "LastLoginDate", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.DateTime, ParameterValue = audit_AccountDto.LastLoginDate });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CreateDate", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.DateTime, ParameterValue = audit_AccountDto.CreateDate });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CreateUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_AccountDto.CreateUserId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditDate", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.DateTime, ParameterValue = audit_AccountDto.EditDate });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_AccountDto.EditUserId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ExternalAuthenticationTypeId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_AccountDto.ExternalAuthenticationTypeId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ExternalAuthenticationKey", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 500, ParameterValue = audit_AccountDto.ExternalAuthenticationKey });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ForgotPasswordKey", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Guid, ParameterValue = audit_AccountDto.ForgotPasswordKey });
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

