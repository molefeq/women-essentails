using Libraries.Common.Enums;
using Libraries.Common.ResponseObjects;

using Libraries.DataAccess.AdoDotNetLibrary;
using Libraries.DataAccess.AdoDotNetLibrary.CommandTypeManagers;
using Libraries.DataAccess.AdoDotNetLibrary.Enums;
using Libraries.DataAccess.AdoDotNetLibrary.Extensions;
using Libraries.DataAccess.AdoDotNetLibrary.Models;

using System;
using System.Collections.Generic;
using System.Data.SqlClient;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.DataAccess.Repositories
{
    public class AccountRepository : DataAccessEntitySet<AccountDto>
    {
        public AccountRepository(SqlConnection connection)
            : base(new StoredProcedureManager(connection))
        {
        }

        public Response<UserInformationDto> Login(string username, string password, Func<SqlDataReader, UserInformationDto> userInformationMapper)
        {
            DbResponse dbResponse = CommandTypeManager.ExecuteReaderWithValidation("AccountLogin", new SqlQueryParameter { ParameterName = "UserName ", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = username },
                                                                                                   new SqlQueryParameter { ParameterName = "Password", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = password },
                                                                                                   new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

            return dbResponse.ToReponse<UserInformationDto>(userInformationMapper);
        }

        public Response<AccountDto> PasswordResetRequest(string username, Func<SqlDataReader, AccountDto> accountDtoMapper)
        {
            DbResponse dbResponse = CommandTypeManager.ExecuteReaderWithValidation("AccountPasswordResetRequest", new SqlQueryParameter { ParameterName = "UserName ", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = username },
                                                                                                                  new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

            return dbResponse.ToReponse<AccountDto>(accountDtoMapper);
        }

        public Response<AccountDto> PasswordReset(ResetPasswordDto resetPasswordDto, Func<SqlDataReader, AccountDto> accountDtoMapper)
        {
            DbResponse dbResponse = CommandTypeManager.ExecuteReaderWithValidation("AccountPasswordReset", new SqlQueryParameter { ParameterName = "Password ", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = resetPasswordDto.Password },
                                                                                                           new SqlQueryParameter { ParameterName = "ForgotPasswordKey ", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Guid, ParameterValue = resetPasswordDto.ForgotPasswordKey },
                                                                                                           new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

            return dbResponse.ToReponse<AccountDto>(accountDtoMapper);
        }

        public Response<UserInformationDto> ChangePassword(ChangePasswordDto changePasswordDto, Func<SqlDataReader, UserInformationDto> userInformationMapper)
        {
            DbResponse dbResponse = CommandTypeManager.ExecuteReaderWithValidation("AccountChangePassword", new SqlQueryParameter { ParameterName = "UserName ", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = changePasswordDto.Username },
                                                                                                            new SqlQueryParameter { ParameterName = "OldPassword", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = changePasswordDto.OldPassword },
                                                                                                            new SqlQueryParameter { ParameterName = "NewPassword", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = changePasswordDto.Password },
                                                                                                            new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

            return dbResponse.ToReponse<UserInformationDto>(userInformationMapper);
        }

        public Result<AccountDto> AccountsFetch(AccountSearchFilter accountSearchFilter, Func<SqlDataReader, AccountDto> accountDtoMapper)
        {
            List<SqlQueryParameter> sqlQueryParameters = GetPagedDataParameters(accountSearchFilter.PageData);

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SearchText ", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = accountSearchFilter.SearchText });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "OrganisationId ", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = accountSearchFilter.OrganisationId });
            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CompanyId  ", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = accountSearchFilter.CompanyId });

            return GetPagedEntities("AccountsFetch", accountDtoMapper, sqlQueryParameters.ToArray());
        }


        public Response<AccountDto> Save(AccountDto accountDto, Func<SqlDataReader, AccountDto> accountDtoMapper)
        {
            SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(accountDto);
            string storedProcedureName = GetCrudStoredProcedureName(accountDto.CrudStatus);

            return Save(storedProcedureName, accountDtoMapper, sqlQueryParameters);
        }

        #region Private Methods

        private SqlQueryParameter[] GetSaveParameters(AccountDto accountDto)
        {
            List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

            if (accountDto.CrudStatus == CrudStatus.DELETE || accountDto.CrudStatus == CrudStatus.UPDATE || accountDto.CrudStatus == CrudStatus.READ)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "AccountId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = accountDto.Id });
            }

            if (accountDto.CrudStatus == CrudStatus.CREATE)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Password", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = accountDto.Password });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "UserName", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = accountDto.UserName });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "OrganisationId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = accountDto.OrganisationId });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CompanyId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = accountDto.CompanyId });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "RoleId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = accountDto.RoleId });
            }

            if (accountDto.CrudStatus == CrudStatus.CREATE || accountDto.CrudStatus == CrudStatus.UPDATE)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "FirstName", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 200, ParameterValue = accountDto.FirstName });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "LastName", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = accountDto.LastName });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EmailAddress", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 500, ParameterValue = accountDto.EmailAddress });
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ContactNumber", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 20, ParameterValue = accountDto.ContactNumber });
            }

            if (accountDto.CrudStatus == CrudStatus.DELETE || accountDto.CrudStatus == CrudStatus.UPDATE || accountDto.CrudStatus == CrudStatus.CREATE)
            {
                sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = accountDto.EditUserId });
            }

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

            return sqlQueryParameters.ToArray();
        }
        
        private string GetCrudStoredProcedureName(CrudStatus crudStatus)
        {
            switch (crudStatus)
            {
                case CrudStatus.CREATE:
                    return "AccountInsert";
                case CrudStatus.UPDATE:
                    return "AccountUpdate";
                case CrudStatus.DELETE:
                    return "AccountDelete";
                case CrudStatus.READ:
                    return "AccountFetch";
                default:
                    throw new Exception("Invalid crud operation.");
            }
        }

        #endregion


    }
}

