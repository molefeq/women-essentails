using Libraries.Common.Enums;
using Libraries.Common.ResponseObjects;
using Libraries.DataAccess.AdoDotNetLibrary;
using Libraries.DataAccess.AdoDotNetLibrary.CommandTypeManagers;
using Libraries.DataAccess.AdoDotNetLibrary.Enums;
using Libraries.DataAccess.AdoDotNetLibrary.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.DataAccess.Repositories
{
    public class AppRatingRepository : DataAccessEntitySet<AppRatingDto>
    {
        public AppRatingRepository(SqlConnection connection)
            : base(new StoredProcedureManager(connection))
        {
        }


        public Response<AppRatingDto> Save(AppRatingDto appRatingDto, Func<SqlDataReader, AppRatingDto> appRatingDtoMapper)
        {
            SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(appRatingDto);
            string storedProcedureName = GetCrudStoredProcedureName(appRatingDto.CrudStatus);

            return Save(storedProcedureName, appRatingDtoMapper, sqlQueryParameters);
        }

        #region Private Methods

        private SqlQueryParameter[] GetSaveParameters(AppRatingDto appRatingDto)
        {
            List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

            if (appRatingDto.CrudStatus == CrudStatus.CREATE || appRatingDto.CrudStatus == CrudStatus.UPDATE)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "DeviceId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = appRatingDto.DeviceId });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Rating", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = appRatingDto.Rating });
            }

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

            return sqlQueryParameters.ToArray();
        }


        private string GetCrudStoredProcedureName(CrudStatus crudStatus)
        {
            switch (crudStatus)
            {
                case CrudStatus.CREATE:
                    return "AppRatingInsert";
                default:
                    throw new Exception("Invalid crud operation.");
            }
        }

        #endregion


    }
}

