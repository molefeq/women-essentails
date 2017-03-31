using Libraries.Common.Enums;
using Libraries.Common.ResponseObjects;

using Libraries.DataAccess.AdoDotNetLibrary;
using Libraries.DataAccess.AdoDotNetLibrary.CommandTypeManagers;
using Libraries.DataAccess.AdoDotNetLibrary.Enums;
using Libraries.DataAccess.AdoDotNetLibrary.Models;

using System;
using System.Collections.Generic;
using System.Data.SqlClient;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.DataAccess.Repositories
{
    public class CompanyRequestRepository : DataAccessEntitySet<CompanyRequestDto>
    {
        public CompanyRequestRepository(SqlConnection connection)
            : base(new StoredProcedureManager(connection))
        {
        }

        public Result<CompanyRequestDto> Get(SearchFilter searchFilter, Func<SqlDataReader, CompanyRequestDto> companyRequestDtoMapper)
        {
            List<SqlQueryParameter> sqlQueryParameters = GetPagedDataParameters(searchFilter.PageData);

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SearchText", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = searchFilter.SearchText });

            return GetPagedEntities("CompanyRequestsFetch", companyRequestDtoMapper, sqlQueryParameters.ToArray());
        }

        public Response<CompanyRequestDto> Save(CompanyRequestDto companyRequestDto, Func<SqlDataReader, CompanyRequestDto> companyRequestDtoMapper)
        {
            SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(companyRequestDto);
            string storedProcedureName = GetCrudStoredProcedureName(companyRequestDto.CrudStatus);

            return Save(storedProcedureName, companyRequestDtoMapper, sqlQueryParameters);
        }

        #region Private Methods

        private SqlQueryParameter[] GetSaveParameters(CompanyRequestDto companyRequestDto)
        {
            List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

            if (companyRequestDto.CrudStatus == CrudStatus.DELETE || companyRequestDto.CrudStatus == CrudStatus.UPDATE || companyRequestDto.CrudStatus == CrudStatus.READ)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CompanyRequestId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = companyRequestDto.Id });
            }

            if (companyRequestDto.CrudStatus == CrudStatus.UPDATE)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "StatusCode", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = companyRequestDto.StatusCode });
            }

            if (companyRequestDto.CrudStatus == CrudStatus.CREATE || companyRequestDto.CrudStatus == CrudStatus.UPDATE)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "FirstName", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyRequestDto.FirstName });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "LastName", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyRequestDto.LastName });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EmailAddress", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 500, ParameterValue = companyRequestDto.EmailAddress });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ContactNumber", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 20, ParameterValue = companyRequestDto.ContactNumber });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PhysicalAddress", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 1000, ParameterValue = companyRequestDto.PhysicalAddress });
            }

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

            return sqlQueryParameters.ToArray();
        }

        private string GetCrudStoredProcedureName(CrudStatus crudStatus)
        {
            switch (crudStatus)
            {
                case CrudStatus.CREATE:
                    return "CompanyRequestInsert";
                case CrudStatus.UPDATE:
                    return "CompanyRequestUpdate";
                case CrudStatus.DELETE:
                    return "CompanyRequestDelete";
                case CrudStatus.READ:
                    return "CompanyRequestFetch";
                default:
                    throw new Exception("Invalid crud operation.");
            }
        }

        #endregion

    }
}

