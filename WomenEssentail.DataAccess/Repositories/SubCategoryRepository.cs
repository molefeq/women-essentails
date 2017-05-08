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
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ShowAll", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Boolean, ParameterValue = subCategorySearchFilter.ShowAll });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SearchText", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = subCategorySearchFilter.SearchText });

            return GetPagedEntities("SubCategoriesFetch", subCategoryDtoMapper, sqlQueryParameters.ToArray());
        }

        public Response<SubCategoryDto> Save(SubCategoryDto subCategoryDto, Func<SqlDataReader, SubCategoryDto> subCategoryMapper)
        {
            SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(subCategoryDto);
            string storedProcedureName = GetCrudStoredProcedureName(subCategoryDto.CrudStatus);

            return Save(storedProcedureName, subCategoryMapper, sqlQueryParameters);
        }

        #region Private Methods

        private SqlQueryParameter[] GetSaveParameters(SubCategoryDto subCategoryDto)
        {
            List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

            if (subCategoryDto.CrudStatus == CrudStatus.DELETE || subCategoryDto.CrudStatus == CrudStatus.UPDATE || subCategoryDto.CrudStatus == CrudStatus.READ)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SubCategoryId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = subCategoryDto.Id });
            }

            if (subCategoryDto.CrudStatus == CrudStatus.CREATE)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CategoryId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = subCategoryDto.CategoryId });
            }

            if (subCategoryDto.CrudStatus == CrudStatus.CREATE || subCategoryDto.CrudStatus == CrudStatus.UPDATE)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Name", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = subCategoryDto.Name });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "DisplayName", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = subCategoryDto.DisplayName });
            }

            if (subCategoryDto.CrudStatus == CrudStatus.DELETE || subCategoryDto.CrudStatus == CrudStatus.UPDATE || subCategoryDto.CrudStatus == CrudStatus.CREATE)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = subCategoryDto.EditUserId });
            }

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

            return sqlQueryParameters.ToArray();
        }

        private string GetCrudStoredProcedureName(CrudStatus crudStatus)
        {
            switch (crudStatus)
            {
                case CrudStatus.CREATE:
                    return "SubCategoryInsert";
                case CrudStatus.UPDATE:
                    return "SubCategoryUpdate";
                case CrudStatus.DELETE:
                    return "SubCategoryDelete";
                case CrudStatus.READ:
                    return "SubCategoryFetch";
                default:
                    throw new Exception("Invalid crud operation.");
            }
        }

        #endregion
    }
}
