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
	public class CompanyRatingRepository :  DataAccessEntitySet<CompanyRatingDto> 
	{
		public CompanyRatingRepository(SqlConnection connection) 
			: base(new StoredProcedureManager(connection)) 
		{
		}


		public Response<CompanyRatingDto> Save(CompanyRatingDto companyRatingDto, Func<SqlDataReader, CompanyRatingDto> companyRatingDtoMapper) 
		{
			SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(companyRatingDto);
			string storedProcedureName = GetCrudStoredProcedureName(companyRatingDto.CrudStatus);

			return Save(storedProcedureName, companyRatingDtoMapper, sqlQueryParameters);
		}

		#region Private Methods

		private SqlQueryParameter[] GetSaveParameters(CompanyRatingDto companyRatingDto)
		{
			List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

			if (companyRatingDto.CrudStatus == CrudStatus.DELETE || companyRatingDto.CrudStatus == CrudStatus.UPDATE || companyRatingDto.CrudStatus == CrudStatus.READ)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Id", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = companyRatingDto.Id });
			}

			if (companyRatingDto.CrudStatus == CrudStatus.CREATE || companyRatingDto.CrudStatus == CrudStatus.UPDATE)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CompanyId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = companyRatingDto.CompanyId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Rating", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = companyRatingDto.Rating });
			}

			sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

			return sqlQueryParameters.ToArray();
		}


		private string GetCrudStoredProcedureName(CrudStatus crudStatus) 
		{
			switch (crudStatus)
			{
				case CrudStatus.CREATE:
					 return "CompanyRatingInsert";
				case CrudStatus.UPDATE:
					 return "CompanyRatingUpdate";
				case CrudStatus.DELETE:
					 return "CompanyRatingDelete";
				case CrudStatus.READ:
					 return "CompanyRatingFetch";
				default:
					 throw new Exception("Invalid crud operation.");
			}
		}

		#endregion


	}
}

