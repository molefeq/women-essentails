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
    public class ProductRepository : DataAccessEntitySet<ProductDto>
    {
        public ProductRepository(SqlConnection connection)
            : base(new StoredProcedureManager(connection))
        {
        }
        
        public Response<ProductDto> Save(ProductDto productDto, Func<SqlDataReader, ProductDto> productDtoMapper)
        {
            SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(productDto);
            string storedProcedureName = GetCrudStoredProcedureName(productDto.CrudStatus);

            return Save(storedProcedureName, productDtoMapper, sqlQueryParameters);
        }

        #region Private Methods

        private SqlQueryParameter[] GetSaveParameters(ProductDto productDto)
        {
            List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

            if (productDto.CrudStatus == CrudStatus.DELETE || productDto.CrudStatus == CrudStatus.UPDATE || productDto.CrudStatus == CrudStatus.READ)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ProductId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = productDto.Id });
            }

            if (productDto.CrudStatus == CrudStatus.CREATE || productDto.CrudStatus == CrudStatus.UPDATE)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Name", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 200, ParameterValue = productDto.Name });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Description", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 2000, ParameterValue = productDto.Description });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Title", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = productDto.Title });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Logo", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 500, ParameterValue = productDto.Logo });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Price", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Decimal, ParameterValue = productDto.Price });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CategoryId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = productDto.CategoryId });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SubCategoryId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = productDto.SubCategoryId });
            }

            if (productDto.CrudStatus == CrudStatus.DELETE || productDto.CrudStatus == CrudStatus.UPDATE || productDto.CrudStatus == CrudStatus.CREATE)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CompanyId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = productDto.CompanyId });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = productDto.EditUserId });
            }

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

            return sqlQueryParameters.ToArray();
        }
        
        private string GetCrudStoredProcedureName(CrudStatus crudStatus)
        {
            switch (crudStatus)
            {
                case CrudStatus.CREATE:
                    return "ProductInsert";
                case CrudStatus.UPDATE:
                    return "ProductUpdate";
                case CrudStatus.DELETE:
                    return "ProductDelete";
                case CrudStatus.READ:
                    return "ProductFetch";
                default:
                    throw new Exception("Invalid crud operation.");
            }
        }

        #endregion


    }
}

