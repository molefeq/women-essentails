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
    public class LookupFieldRepository : DataAccessEntitySet<LookupFieldDto>
    {
        public LookupFieldRepository(SqlConnection connection)
            : base(new StoredProcedureManager(connection))
        {
        }

        public Response<LookupFieldDto> LookupFieldsFetch(int? lookupFieldId, string fieldName, Func<SqlDataReader, LookupFieldDto> lookupFieldDtoMapper)
        {
            List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Id", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = lookupFieldId });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "FieldName", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = fieldName });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

            return Save("LookupFieldsFetch", lookupFieldDtoMapper, sqlQueryParameters.ToArray());
        }
    }
}
