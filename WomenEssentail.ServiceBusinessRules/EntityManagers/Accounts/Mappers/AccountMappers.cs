using Libraries.Common.Enums;
using Libraries.Common.Extensions;

using System.Data.SqlClient;

using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.RoleModules.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Accounts.Mappers
{
    public class AccountMappers
    {
        private static AccountMappers _Instance;

        private AccountMappers()
        {
        }

        public static AccountMappers Instance
        {
            get
            {
                if (_Instance == null)
                {
                    _Instance = new AccountMappers();
                }
                return _Instance;
            }
        }

        public UserInformationDto MapLoginQuery(SqlDataReader sqlDataReader)
        {
            UserInformationDto userInformationDto = MapToUserInformationDto(sqlDataReader);

            sqlDataReader.NextResult();

            while (sqlDataReader.Read())
            {
                userInformationDto.AccessModules.Add(RoleModuleMappers.Instance.MapToRoleModuleDto(sqlDataReader));
            }

            return userInformationDto;
        }

        public UserInformationDto MapToUserInformationDto(SqlDataReader sqlDataReader)
        {
            UserInformationDto userInformationDto = new UserInformationDto();

            userInformationDto.Id = sqlDataReader["Id"].ToInteger();
            userInformationDto.FirstName = sqlDataReader["FirstName"].ToString();
            userInformationDto.LastName = sqlDataReader["LastName"].ToString();
            userInformationDto.UserName = sqlDataReader["UserName"].ToString();
            userInformationDto.EmailAddress = sqlDataReader["EmailAddress"].ToString();
            userInformationDto.IsFirstTimeLoggedInd = sqlDataReader["IsFirstTimeLoggedInd"].ToBoolean();
            userInformationDto.OrganisationId = sqlDataReader["OrganisationId"].ToNullableInteger();
            userInformationDto.OrganisationName = sqlDataReader["OrganisationName"].ToString();
            userInformationDto.CompanyId = sqlDataReader["CompanyId"].ToNullableInteger();
            userInformationDto.CompanyName = sqlDataReader["CompanyName"].ToString();
            userInformationDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime().ToString("dd/MM/yyyy");

            return userInformationDto;
        }

        public AccountSummaryDto MapToAccountSummaryDto(SqlDataReader sqlDataReader)
        {
            AccountSummaryDto accountSummaryDto = new AccountSummaryDto();

            accountSummaryDto.Id = sqlDataReader["Id"].ToInteger();
            accountSummaryDto.AccountUserId = sqlDataReader["AccountUserId"].ToInteger();
            accountSummaryDto.UserName = sqlDataReader["UserName"].ToString();
            accountSummaryDto.FirstName = sqlDataReader["FirstName"].ToString();
            accountSummaryDto.LastName = sqlDataReader["LastName"].ToString();
            accountSummaryDto.ContactNumber = sqlDataReader["ContactNumber"].ToString();
            accountSummaryDto.EmailAddress = sqlDataReader["EmailAddress"].ToString();
            accountSummaryDto.IsFirstTimeLoggedInd = sqlDataReader["IsFirstTimeLoggedInd"].ToBoolean();
            accountSummaryDto.OrganisationId = sqlDataReader["OrganisationId"].ToNullableInteger();
            accountSummaryDto.CompanyId = sqlDataReader["CompanyId"].ToNullableInteger();
            accountSummaryDto.StatusId = sqlDataReader["StatusId"].ToInteger();
            accountSummaryDto.OrganisationName = sqlDataReader["OrganisationName"].ToString();
            accountSummaryDto.CompanyName = sqlDataReader["CompanyName"].ToString();
            accountSummaryDto.StatusName = sqlDataReader["StatusName"].ToString();
            accountSummaryDto.StatusCode = sqlDataReader["StatusCode"].ToString();
            accountSummaryDto.LastLoginDate = sqlDataReader["LastLoginDate"].ToNullableDateTime();
            accountSummaryDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
            accountSummaryDto.CreateUserId = sqlDataReader["CreateUserId"].ToNullableInteger();
            accountSummaryDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
            accountSummaryDto.EditUserId = sqlDataReader["EditUserId"].ToNullableInteger();
            accountSummaryDto.ExternalAuthenticationTypeId = sqlDataReader["ExternalAuthenticationTypeId"].ToNullableInteger();
            accountSummaryDto.ForgotPasswordKey = sqlDataReader["ForgotPasswordKey"].ToNullableGuid();
            accountSummaryDto.CrudStatus = CrudStatus.UPDATE;

            return accountSummaryDto;
        }
        public AccountDto MapToAccountDto(SqlDataReader sqlDataReader)
        {
            AccountDto accountDto = new AccountDto();

            accountDto.Id = sqlDataReader["Id"].ToInteger();
            accountDto.AccountUserId = sqlDataReader["AccountUserId"].ToInteger();
            accountDto.UserName = sqlDataReader["UserName"].ToString();
            accountDto.FirstName = sqlDataReader["FirstName"].ToString();
            accountDto.LastName = sqlDataReader["LastName"].ToString();
            accountDto.ContactNumber = sqlDataReader["ContactNumber"].ToString();
            accountDto.EmailAddress = sqlDataReader["EmailAddress"].ToString();
            accountDto.IsFirstTimeLoggedInd = sqlDataReader["IsFirstTimeLoggedInd"].ToBoolean();
            accountDto.OrganisationId = sqlDataReader["OrganisationId"].ToNullableInteger();
            accountDto.CompanyId = sqlDataReader["CompanyId"].ToNullableInteger();
            accountDto.StatusId = sqlDataReader["StatusId"].ToInteger();
            accountDto.LastLoginDate = sqlDataReader["LastLoginDate"].ToNullableDateTime();
            accountDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
            accountDto.CreateUserId = sqlDataReader["CreateUserId"].ToNullableInteger();
            accountDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
            accountDto.EditUserId = sqlDataReader["EditUserId"].ToNullableInteger();
            accountDto.ExternalAuthenticationTypeId = sqlDataReader["ExternalAuthenticationTypeId"].ToNullableInteger();
            accountDto.ForgotPasswordKey = sqlDataReader["ForgotPasswordKey"].ToNullableGuid();
            accountDto.CrudStatus = CrudStatus.UPDATE;

            return accountDto;
        }

    }
}

