using Libraries.Common.Enums;
using Libraries.Common.Extensions;
using Libraries.Common.ResponseObjects;

using Libraries.DataAccess.AdoDotNetLibrary;
using Libraries.DataAccess.AdoDotNetLibrary.CommandTypeManagers;
using Libraries.DataAccess.AdoDotNetLibrary.Enums;
using Libraries.DataAccess.AdoDotNetLibrary.Models;

using System;
using System.Collections.Generic;
using System.Data.SqlClient;

using WomenEssentail.Common.DataHelper;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.DataAccess.Repositories
{
    public class CompanyRepository : DataAccessEntitySet<CompanyDto>
    {
        public CompanyRepository(SqlConnection connection)
            : base(new StoredProcedureManager(connection))
        {
        }

        public Response<CompanyDto> Save(CompanyDto companyDto, object mapCompanyQuery)
        {
            throw new NotImplementedException();
        }

        public Response<CompanyDto> Save(CompanyDto companyDto, Func<SqlDataReader, CompanyDto> companyDtoMapper)
        {
            SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(companyDto);
            string storedProcedureName = GetCrudStoredProcedureName(companyDto.CrudStatus);

            return Save(storedProcedureName, companyDtoMapper, sqlQueryParameters);
        }

        public CompanyDataObject GetData(string companyTypeCode, Func<SqlDataReader, CompanyDataObject> companyDataMapper)
        {
            SqlQueryParameter sqlQueryParameter = new SqlQueryParameter { ParameterName = "CompanyTypeCode", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyTypeCode };

            return companyDataMapper(CommandTypeManager.ExecuteReader("CompanyDataFetch", sqlQueryParameter));
        }
        public Response<CompanyDto> UpdateStatus(BulkUpdateModel bulkUpdateModel)
        {
            List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = bulkUpdateModel.EditUserId });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "StatusCode", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = bulkUpdateModel.StatusCode });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Companies", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Structured, ParameterValue = bulkUpdateModel.Ids.ValueListToDataTable<int>("Id") });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

            return Save("CompanyStatusUpdate", null, sqlQueryParameters.ToArray());
        }

        #region Private Methods

        private SqlQueryParameter[] GetSaveParameters(CompanyDto companyDto)
        {
            List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

            if (companyDto.CrudStatus == CrudStatus.DELETE || companyDto.CrudStatus == CrudStatus.UPDATE || companyDto.CrudStatus == CrudStatus.READ)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CompanyId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = companyDto.Id });
            }
            if (companyDto.CrudStatus == CrudStatus.READ)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "DeviceId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyDto.DeviceId });
            }

            if (companyDto.CrudStatus == CrudStatus.CREATE || companyDto.CrudStatus == CrudStatus.UPDATE)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CompanyTypeId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = companyDto.CompanyTypeId });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Name", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyDto.Name });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Code", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyDto.Code });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Description", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 5000, ParameterValue = companyDto.Description });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PhysicalAddressLine1", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyDto.PhysicalAddressLine1 });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PhysicalAddressLine2", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyDto.PhysicalAddressLine2 });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PhysicalAddressSuburb", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyDto.PhysicalAddressSuburb });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PhysicalAddressCity", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyDto.PhysicalAddressCity });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PhysicalAddressPostalCode", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyDto.PhysicalAddressPostalCode });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PhysicalAddressLatitude", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyDto.PhysicalAddressLatitude });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PhysicalAddressLongitude", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyDto.PhysicalAddressLongitude });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PostalAddressLine1", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyDto.PostalAddressLine1 });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PostalAddressLine2", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyDto.PostalAddressLine2 });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PostalAddressSuburb", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyDto.PostalAddressSuburb });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PostalAddressCity", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyDto.PostalAddressCity });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PostalAddressPostalCode", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyDto.PostalAddressPostalCode });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PostalAddressLatitude", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyDto.PostalAddressLatitude });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "PostalAddressLongitude", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyDto.PostalAddressLongitude });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "FirstName", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 200, ParameterValue = companyDto.FirstName });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "LastName", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 200, ParameterValue = companyDto.LastName });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EmailAddress", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 200, ParameterValue = companyDto.EmailAddress });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "BusinessContactCode", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 10, ParameterValue = companyDto.BusinessContactCode });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "BusinessContactNumber", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 20, ParameterValue = companyDto.BusinessContactNumber });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "MobileNumber", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = companyDto.MobileNumber });

                if (companyDto.Logo != null || (companyDto.Galleries != null && companyDto.Galleries.Count > 0))
                {
                    List<CompanyLogoDto> logos = new List<CompanyLogoDto>();

                    if (companyDto.Logo != null)
                    {
                        logos.Add(companyDto.Logo);
                    }

                    if (companyDto.Galleries != null && companyDto.Galleries.Count > 0)
                    {
                        logos.AddRange(companyDto.Galleries);
                    }

                    sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Logos", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Structured, ParameterValue = logos.ToDataTable<CompanyLogoDto>() });
                }

                if (companyDto.CompanyWorkingHours != null && companyDto.CompanyWorkingHours.Count > 0)
                {
                    sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "WorkingHours", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Structured, ParameterValue = companyDto.CompanyWorkingHours.ToDataTable<CompanyWorkingHourDto>() });
                }
            }

            if (companyDto.CrudStatus == CrudStatus.DELETE || companyDto.CrudStatus == CrudStatus.UPDATE || companyDto.CrudStatus == CrudStatus.CREATE)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = companyDto.EditUserId });
            }

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

            return sqlQueryParameters.ToArray();
        }

        private string GetCrudStoredProcedureName(CrudStatus crudStatus)
        {
            switch (crudStatus)
            {
                case CrudStatus.CREATE:
                    return "CompanyInsert";
                case CrudStatus.UPDATE:
                    return "CompanyUpdate";
                case CrudStatus.DELETE:
                    return "CompanyDelete";
                case CrudStatus.READ:
                    return "CompanyFetch";
                default:
                    throw new Exception("Invalid crud operation.");
            }
        }

        #endregion

    }
}

