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
    public class DashboardRepository : DataAccessEntitySet<DashboardDataDto>
    {
        public DashboardRepository(SqlConnection connection)
            : base(new StoredProcedureManager(connection))
        {
        }
        
        public DashboardDataDto GetData(int? userId, Func<SqlDataReader, DashboardDataDto> dashboardDtoMapper)
        {
            List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "UserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = userId });

            return dashboardDtoMapper(CommandTypeManager.ExecuteReader("DashboardDataFetch", sqlQueryParameters.ToArray()));
        }               
    }
}
