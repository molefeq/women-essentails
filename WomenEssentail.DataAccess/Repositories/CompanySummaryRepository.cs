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
    public class CompanySummaryRepository: DataAccessEntitySet<CompanySummaryDto>
    {
        public CompanySummaryRepository(SqlConnection connection)
            : base(new StoredProcedureManager(connection))
        {
        }

        public Result<CompanySummaryDto> Get(CompanySearchFilter companySearchFilter, Func<SqlDataReader, CompanySummaryDto> companyMapper)
        {
            List<SqlQueryParameter> sqlQueryParameters = GetPagedDataParameters(companySearchFilter.PageData);
            
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "UserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = companySearchFilter.UserId });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "OrganisationId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = companySearchFilter.OrganisationId });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SearchText", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companySearchFilter.SearchText });

            return GetPagedEntities("CompaniesFetch", companyMapper, sqlQueryParameters.ToArray());
        }

        public Result<CompanySummaryDto> GetApp(CompanyAppSearchFilter companyAppSearchFilter, Func<SqlDataReader, CompanySummaryDto> companyMapper)
        {
            List<SqlQueryParameter> sqlQueryParameters = GetPagedDataParameters(companyAppSearchFilter.PageData);

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Latitude", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Decimal, ParameterValue = companyAppSearchFilter.Latitude });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Longitude", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Decimal, ParameterValue = companyAppSearchFilter.Longitude });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SubCategoryId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = companyAppSearchFilter.SubCategoryId });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SearchText", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyAppSearchFilter.SearchText });

            return GetPagedEntities("CompaniesAppFetch", companyMapper, sqlQueryParameters.ToArray());
        }
    }
}
