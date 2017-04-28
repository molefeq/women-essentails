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
using WomenEssentail.Common.DataFilters;

namespace WomenEssentail.DataAccess.Repositories
{
	public class CompanyFeedbackRepository :  DataAccessEntitySet<CompanyFeedbackDto> 
	{
		public CompanyFeedbackRepository(SqlConnection connection) 
			: base(new StoredProcedureManager(connection)) 
		{
		}

        public Result<CompanyFeedbackDto> Get(CompanyFeedbackSearchFilter companyFeedbackSearchFilter, Func<SqlDataReader, CompanyFeedbackDto> companyMapper)
        {
            List<SqlQueryParameter> sqlQueryParameters = GetPagedDataParameters(companyFeedbackSearchFilter.PageData);

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CompanyId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = companyFeedbackSearchFilter.CompanyId });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SearchText", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyFeedbackSearchFilter.SearchText });

            return GetPagedEntities("CompanyFeedbacksFetch", companyMapper, sqlQueryParameters.ToArray());
        }

        public Response<CompanyFeedbackDto> Save(CompanyFeedbackDto companyFeedbackDto, Func<SqlDataReader, CompanyFeedbackDto> companyFeedbackDtoMapper) 
		{
			SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(companyFeedbackDto);
			string storedProcedureName = GetCrudStoredProcedureName(companyFeedbackDto.CrudStatus);

			return Save(storedProcedureName, companyFeedbackDtoMapper, sqlQueryParameters);
		}

		#region Private Methods

		private SqlQueryParameter[] GetSaveParameters(CompanyFeedbackDto companyFeedbackDto)
		{
			List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

			if (companyFeedbackDto.CrudStatus == CrudStatus.DELETE || companyFeedbackDto.CrudStatus == CrudStatus.UPDATE || companyFeedbackDto.CrudStatus == CrudStatus.READ)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Id", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = companyFeedbackDto.Id });
			}

			if (companyFeedbackDto.CrudStatus == CrudStatus.CREATE || companyFeedbackDto.CrudStatus == CrudStatus.UPDATE)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CompanyId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = companyFeedbackDto.CompanyId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Feedback", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 500, ParameterValue = companyFeedbackDto.Feedback });
			}

			sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

			return sqlQueryParameters.ToArray();
		}


		private string GetCrudStoredProcedureName(CrudStatus crudStatus) 
		{
			switch (crudStatus)
			{
				case CrudStatus.CREATE:
					 return "CompanyFeedbackInsert";
				case CrudStatus.UPDATE:
					 return "CompanyFeedbackUpdate";
				case CrudStatus.DELETE:
					 return "AccountDelete";
				case CrudStatus.READ:
					 return "CompanyFeedbackFetch";
				default:
					 throw new Exception("Invalid crud operation.");
			}
		}

		#endregion


	}
}

