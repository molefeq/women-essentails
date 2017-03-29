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
    public class AccountSummaryRepository : DataAccessEntitySet<AccountSummaryDto>
    {
        public AccountSummaryRepository(SqlConnection connection)
            : base(new StoredProcedureManager(connection))
        {
        }

        public Result<AccountSummaryDto> Get(AccountSearchFilter accountSearchFilter, Func<SqlDataReader, AccountSummaryDto>accountMapper)
        {
            List<SqlQueryParameter> sqlQueryParameters = GetPagedDataParameters(accountSearchFilter.PageData);

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CompanyId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = accountSearchFilter.CompanyId });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "OrganisationId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = accountSearchFilter.OrganisationId });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SearchText", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = accountSearchFilter.SearchText });

            return GetPagedEntities("AccountsFetch", accountMapper, sqlQueryParameters.ToArray());
        }
    }
}
