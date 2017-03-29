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
    public class ProductSummaryRepository : DataAccessEntitySet<ProductSummaryDto>
    {
        public ProductSummaryRepository(SqlConnection connection)
            : base(new StoredProcedureManager(connection))
        {
        }

        public Result<ProductSummaryDto> GetCompanyProducts(ProductSearchFilter companySearchFilter, Func<SqlDataReader, ProductSummaryDto> productMapper)
        {
            List<SqlQueryParameter> sqlQueryParameters = GetPagedDataParameters(companySearchFilter.PageData);

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CompanyId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = companySearchFilter.CompanyId });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SearchText", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companySearchFilter.SearchText });

            return GetPagedEntities("ProductsCompanyFetch", productMapper, sqlQueryParameters.ToArray());
        }

        public Result<ProductSummaryDto> Get(ProductSearchFilter companySearchFilter, Func<SqlDataReader, ProductSummaryDto> productMapper)
        {
            List<SqlQueryParameter> sqlQueryParameters = GetPagedDataParameters(companySearchFilter.PageData);

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CompanyId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = companySearchFilter.CompanyId });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SearchText", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companySearchFilter.SearchText });

            return GetPagedEntities("ProductsFetch", productMapper, sqlQueryParameters.ToArray());
        }
    }
}
