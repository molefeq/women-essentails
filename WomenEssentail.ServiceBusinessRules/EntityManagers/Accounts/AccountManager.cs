using Libraries.Common.ResponseObjects;
using WomenEssentail.Common.DataTransferObjects;
using WomenEssentail.ServiceBusinessRules.EntityManagers.Accounts.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Accounts
{
	public class AccountManager : IAccountManager
    {
        public Response<UserInformationDto> Login(string username, string password)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.Accounts.Login(username, password, AccountQueryMappers.Instance.MapLoginQuery);
            }
        }

        public Response<UserInformationDto> ChangePassword(ChangePasswordDto changePasswordDto)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.Accounts.ChangePassword(changePasswordDto, AccountQueryMappers.Instance.MapLoginQuery);
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

