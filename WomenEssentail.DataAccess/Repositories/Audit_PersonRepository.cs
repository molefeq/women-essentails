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
	public class Audit_PersonRepository :  DataAccessEntitySet<Audit_PersonDto> 
	{
		public Audit_PersonRepository(SqlConnection connection) 
			: base(new StoredProcedureManager(connection)) 
		{
		}


		public Response<Audit_PersonDto> Save(Audit_PersonDto audit_PersonDto, Func<SqlDataReader, Audit_PersonDto> audit_PersonDtoMapper) 
		{
			SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(audit_PersonDto);
			string storedProcedureName = GetCrudStoredProcedureName(audit_PersonDto.CrudStatus);

			return Save(storedProcedureName, audit_PersonDtoMapper, sqlQueryParameters);
		}

		#region Private Methods

		private SqlQueryParameter[] GetSaveParameters(Audit_PersonDto audit_PersonDto)
		{
			List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

			if (audit_PersonDto.CrudStatus == CrudStatus.DELETE || audit_PersonDto.CrudStatus == CrudStatus.UPDATE || audit_PersonDto.CrudStatus == CrudStatus.READ)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Id", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_PersonDto.Id });
			}

			if (audit_PersonDto.CrudStatus == CrudStatus.CREATE || audit_PersonDto.CrudStatus == CrudStatus.UPDATE)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PersonId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_PersonDto.PersonId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Title", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 20, ParameterValue = audit_PersonDto.Title });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "FirstName", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 200, ParameterValue = audit_PersonDto.FirstName });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Initials", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 20, ParameterValue = audit_PersonDto.Initials });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "LastName", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = audit_PersonDto.LastName });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "DateOfBirth", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.DateTime, ParameterValue = audit_PersonDto.DateOfBirth });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "IsSouthAfricanCitizen", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Boolean, ParameterValue = audit_PersonDto.IsSouthAfricanCitizen });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "IdOrPassportNumber", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = audit_PersonDto.IdOrPassportNumber });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EthnicGroup", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = audit_PersonDto.EthnicGroup });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Gender", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 20, ParameterValue = audit_PersonDto.Gender });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "MaritalStatus", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = audit_PersonDto.MaritalStatus });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "HomeLanguage", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = audit_PersonDto.HomeLanguage });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Logo", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 1000, ParameterValue = audit_PersonDto.Logo });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PhysicalAddressId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_PersonDto.PhysicalAddressId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PostalAddressId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_PersonDto.PostalAddressId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EmailAddress", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = audit_PersonDto.EmailAddress });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "WorkTelephoneCode", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 10, ParameterValue = audit_PersonDto.WorkTelephoneCode });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "WorkTelephoneNumber", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 20, ParameterValue = audit_PersonDto.WorkTelephoneNumber });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "HomeTelephoneCode", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 10, ParameterValue = audit_PersonDto.HomeTelephoneCode });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "HomeTelephoneNumber", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = audit_PersonDto.HomeTelephoneNumber });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "MobileNumber", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = audit_PersonDto.MobileNumber });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "StatusId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_PersonDto.StatusId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_PersonDto.EditUserId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CreateUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = audit_PersonDto.CreateUserId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditDate", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.DateTime, ParameterValue = audit_PersonDto.EditDate });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CreatDate", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.DateTime, ParameterValue = audit_PersonDto.CreatDate });
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

