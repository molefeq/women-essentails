using Libraries.Common.ResponseObjects;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Accounts
{
    public interface IAccountManager 
	{
        Result<AccountSummaryDto> GetAccounts(AccountSearchFilter accountSearchFilter);
        Response<AccountDto> Save(AccountDto companyDto);
        Response<UserInformationDto> Login(string username, string password);
        Response<UserInformationDto> ChangePassword(ChangePasswordDto changePasswordDto);
        Response<AccountDto> PasswordResetRequest(string username);
        Response<AccountDto> PasswordReset(ResetPasswordDto resetPasswordDto);
    }
}

