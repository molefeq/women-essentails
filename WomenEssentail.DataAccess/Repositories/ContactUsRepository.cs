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
    public class ContactUsRepository : DataAccessEntitySet<ContactUsDto>
    {
        public ContactUsRepository(SqlConnection connection)
            : base(new StoredProcedureManager(connection))
        {
        }
        
        public Response<ContactUsDto> Save(ContactUsDto contactUsDto, Func<SqlDataReader, ContactUsDto> contactUsDtoMapper)
        {
            SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(contactUsDto);
            string storedProcedureName = GetCrudStoredProcedureName(contactUsDto.CrudStatus);

            return Save(storedProcedureName, contactUsDtoMapper, sqlQueryParameters);
        }

        #region Private Methods

        private SqlQueryParameter[] GetSaveParameters(ContactUsDto contactUsDto)
        {
            List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

            if (contactUsDto.CrudStatus == CrudStatus.DELETE || contactUsDto.CrudStatus == CrudStatus.UPDATE || contactUsDto.CrudStatus == CrudStatus.READ)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ContactUsId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = contactUsDto.Id });
            }

            if (contactUsDto.CrudStatus == CrudStatus.CREATE || contactUsDto.CrudStatus == CrudStatus.UPDATE)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EmailAddress", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 500, ParameterValue = contactUsDto.EmailAddress });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Subject", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = contactUsDto.Subject });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Message", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 1000, ParameterValue = contactUsDto.Message });
            }

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

            return sqlQueryParameters.ToArray();
        }
        
        private string GetCrudStoredProcedureName(CrudStatus crudStatus)
        {
            switch (crudStatus)
            {
                case CrudStatus.CREATE:
                    return "ContactUsInsert";
                case CrudStatus.UPDATE:
                    return "ContactUsUpdate";
                case CrudStatus.DELETE:
                    return "ContactUsDelete";
                case CrudStatus.READ:
                    return "ContactUsFetch";
                default:
                    throw new Exception("Invalid crud operation.");
            }
        }

        #endregion
    }
}

