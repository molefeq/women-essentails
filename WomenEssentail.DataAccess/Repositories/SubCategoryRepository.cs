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
    public class SubCategoryRepository : DataAccessEntitySet<SubCategoryDto>
    {
        public SubCategoryRepository(SqlConnection connection)
            : base(new StoredProcedureManager(connection))
        {
        }

        public Result<SubCategoryDto> Get(SubCategorySearchFilter subCategorySearchFilter, Func<SqlDataReader, SubCategoryDto> subCategoryDtoMapper)
        {
            List<SqlQueryParameter> sqlQueryParameters = GetPagedDataParameters(subCategorySearchFilter.PageData);

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CategoryId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = subCategorySearchFilter.CategoryId });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SearchText", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = subCategorySearchFilter.SearchText });

            return GetPagedEntities("SubCategoriesFetch", subCategoryDtoMapper, sqlQueryParameters.ToArray());
        }
    }
}
