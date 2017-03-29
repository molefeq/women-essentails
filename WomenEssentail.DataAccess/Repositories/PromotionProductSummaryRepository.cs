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
    public class PromotionProductSummaryRepository : DataAccessEntitySet<PromotionProductSummaryDto>
    {
        public PromotionProductSummaryRepository(SqlConnection connection)
            : base(new StoredProcedureManager(connection))
        {
        }

        public Result<PromotionProductSummaryDto> Get(ProductPromotionSearchFilter productPromotionSearchFilter, Func<SqlDataReader, PromotionProductSummaryDto> promotionProductDtoMapper)
        {
            List<SqlQueryParameter> sqlQueryParameters = GetPagedDataParameters(productPromotionSearchFilter.PageData);

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ProductId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = productPromotionSearchFilter.ProductId });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SearchText", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = productPromotionSearchFilter.SearchText });

            return GetPagedEntities("PromotionProductsFetch", promotionProductDtoMapper, sqlQueryParameters.ToArray());
        }
    }
}
