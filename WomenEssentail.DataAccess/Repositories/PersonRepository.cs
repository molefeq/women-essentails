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
	public class PersonRepository :  DataAccessEntitySet<PersonDto> 
	{
		public PersonRepository(SqlConnection connection) 
			: base(new StoredProcedureManager(connection)) 
		{
		}


		public Response<PersonDto> Save(PersonDto personDto, Func<SqlDataReader, PersonDto> personDtoMapper) 
		{
			SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(personDto);
			string storedProcedureName = GetCrudStoredProcedureName(personDto.CrudStatus);

			return Save(storedProcedureName, personDtoMapper, sqlQueryParameters);
		}

		#region Private Methods

		private SqlQueryParameter[] GetSaveParameters(PersonDto personDto)
		{
			List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

			if (personDto.CrudStatus == CrudStatus.DELETE || personDto.CrudStatus == CrudStatus.UPDATE || personDto.CrudStatus == CrudStatus.READ)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Id", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = personDto.Id });
			}

			if (personDto.CrudStatus == CrudStatus.CREATE || personDto.CrudStatus == CrudStatus.UPDATE)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Title", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 20, ParameterValue = personDto.Title });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "FirstName", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 200, ParameterValue = personDto.FirstName });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Initials", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 20, ParameterValue = personDto.Initials });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "LastName", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = personDto.LastName });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "DateOfBirth", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.DateTime, ParameterValue = personDto.DateOfBirth });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "IsSouthAfricanCitizen", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Boolean, ParameterValue = personDto.IsSouthAfricanCitizen });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "IdOrPassportNumber", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = personDto.IdOrPassportNumber });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EthnicGroup", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = personDto.EthnicGroup });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Gender", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 20, ParameterValue = personDto.Gender });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "MaritalStatus", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = personDto.MaritalStatus });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "HomeLanguage", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = personDto.HomeLanguage });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Logo", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 1000, ParameterValue = personDto.Logo });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PhysicalAddressId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = personDto.PhysicalAddressId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PostalAddressId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = personDto.PostalAddressId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EmailAddress", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = personDto.EmailAddress });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "WorkTelephoneCode", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 10, ParameterValue = personDto.WorkTelephoneCode });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "WorkTelephoneNumber", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 20, ParameterValue = personDto.WorkTelephoneNumber });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "HomeTelephoneCode", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 10, ParameterValue = personDto.HomeTelephoneCode });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "HomeTelephoneNumber", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = personDto.HomeTelephoneNumber });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "MobileNumber", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = personDto.MobileNumber });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "StatusId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = personDto.StatusId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = personDto.EditUserId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CreateUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = personDto.CreateUserId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditDate", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.DateTime, ParameterValue = personDto.EditDate });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CreatDate", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.DateTime, ParameterValue = personDto.CreatDate });
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

