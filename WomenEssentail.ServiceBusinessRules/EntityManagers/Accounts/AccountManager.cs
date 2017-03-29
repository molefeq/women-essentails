using Libraries.Common.Enums;
using Libraries.Common.ResponseObjects;
using Libraries.Common.Utils;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.Accounts.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Accounts
{
    public class AccountManager : IAccountManager
    {
        public Result<AccountSummaryDto> GetAccounts(AccountSearchFilter accountSearchFilter)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.AccountSummaries.Get(accountSearchFilter, AccountMappers.Instance.MapToAccountSummaryDto);
            }
        }
        public Response<AccountDto> Save(AccountDto accountDto)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                if (accountDto.CrudStatus == CrudStatus.CREATE)
                {
                    accountDto.Password = RandomStringGenerator.Generate(accountDto.UserName);
                }

                return unitOfWork.Accounts.Save(accountDto, AccountMappers.Instance.MapToAccountDto);
            }
        }
        public Response<UserInformationDto> Login(string username, string password)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.Accounts.Login(username, password, AccountMappers.Instance.MapLoginQuery);
            }
        }

        public Response<UserInformationDto> ChangePassword(ChangePasswordDto changePasswordDto)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.Accounts.ChangePassword(changePasswordDto, AccountMappers.Instance.MapLoginQuery);
            }
        }

        public Response<AccountDto> PasswordResetRequest(string username)
        {
            Response<AccountDto> response = new Response<AccountDto>();

            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                response = unitOfWork.Accounts.PasswordResetRequest(username, AccountMappers.Instance.MapToAccountDto);
            }

            if (response.HasErrors) return response;

            //SendResetPasswordEmail(response.Item);

            return response;
        }

        public Response<AccountDto> PasswordReset(ResetPasswordDto resetPasswordDto)
        {
            Response<AccountDto> response = new Response<AccountDto>();

            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                response = unitOfWork.Accounts.PasswordReset(resetPasswordDto, AccountMappers.Instance.MapToAccountDto);
            }

            if (response.HasErrors) return response;

            return response;
        }
    }
}

