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
	public class CompanyTypeRepository :  DataAccessEntitySet<CompanyTypeDto> 
	{
		public CompanyTypeRepository(SqlConnection connection) 
			: base(new StoredProcedureManager(connection)) 
		{
		}
        public Result<CompanyTypeDto> Get(SearchFilter searchFilter, Func<SqlDataReader, CompanyTypeDto> companyTypeMapper)
        {
            List<SqlQueryParameter> sqlQueryParameters = GetPagedDataParameters(searchFilter.PageData);

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SearchText ", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = searchFilter.SearchText });

            return GetPagedEntities("CompanyTypesFetch", companyTypeMapper, sqlQueryParameters.ToArray());
        }

        public Response<CompanyTypeDto> Save(CompanyTypeDto companyTypeDto, Func<SqlDataReader, CompanyTypeDto> companyTypeDtoMapper) 
		{
			SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(companyTypeDto);
			string storedProcedureName = GetCrudStoredProcedureName(companyTypeDto.CrudStatus);

			return Save(storedProcedureName, companyTypeDtoMapper, sqlQueryParameters);
		}

		#region Private Methods

		private SqlQueryParameter[] GetSaveParameters(CompanyTypeDto companyTypeDto)
		{
			List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

			if (companyTypeDto.CrudStatus == CrudStatus.DELETE || companyTypeDto.CrudStatus == CrudStatus.UPDATE || companyTypeDto.CrudStatus == CrudStatus.READ)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Id", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = companyTypeDto.Id });
			}

			if (companyTypeDto.CrudStatus == CrudStatus.CREATE || companyTypeDto.CrudStatus == CrudStatus.UPDATE)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Code", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = companyTypeDto.Code });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Name", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyTypeDto.Name });
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

