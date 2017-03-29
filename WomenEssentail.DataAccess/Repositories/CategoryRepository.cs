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
    public class CategoryRepository : DataAccessEntitySet<CategoryDto>
    {
        public CategoryRepository(SqlConnection connection)
            : base(new StoredProcedureManager(connection))
        {
        }

        public Result<CategoryDto> Get(SearchFilter searchFilter, Func<SqlDataReader, CategoryDto> categoryDtoMapper)
        {
            List<SqlQueryParameter> sqlQueryParameters = GetPagedDataParameters(searchFilter.PageData);

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SearchText", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = searchFilter.SearchText });

            return GetPagedEntities("CategoriesFetch", categoryDtoMapper, sqlQueryParameters.ToArray());
        }
    }
}
