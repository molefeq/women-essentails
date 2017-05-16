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
    public class DeviceDetailsRepository : DataAccessEntitySet<DeviceDetailsDto>
    {
        public DeviceDetailsRepository(SqlConnection connection)
            : base(new StoredProcedureManager(connection))
        {
        }


        public Response<DeviceDetailsDto> Save(DeviceDetailsDto deviceDetailsDto, Func<SqlDataReader, DeviceDetailsDto> deviceDetailsDtoMapper)
        {
            SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(deviceDetailsDto);

            return Save("DeviceDetailsSave", deviceDetailsDtoMapper, sqlQueryParameters);
        }


        public Response<DeviceDetailsDto> CompanyGoThere(int companyId, string deviceId)
        {
            List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CompanyId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = companyId });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "DeviceId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = deviceId });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

            return Save("CompanyGoThere", null, sqlQueryParameters.ToArray());
        }

        #region Private Methods

        private SqlQueryParameter[] GetSaveParameters(DeviceDetailsDto deviceDetailsDto)
        {
            List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "DeviceId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = deviceDetailsDto.DeviceId });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "DeviceName", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = deviceDetailsDto.DeviceName });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "DeviceUserName", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = deviceDetailsDto.Name });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "DeviceUserAddress", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 1000, ParameterValue = deviceDetailsDto.Address });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "DeviceUserMobileNumber", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 20, ParameterValue = deviceDetailsDto.MobileNumber });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "DevicePlatform", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = deviceDetailsDto.DevicePlatform });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "DeviceSerialNumber", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = deviceDetailsDto.DeviceSerialNumber });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

            return sqlQueryParameters.ToArray();
        }

        #endregion

    }
}

