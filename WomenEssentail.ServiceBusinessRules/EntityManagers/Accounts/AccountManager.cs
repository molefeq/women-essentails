using Libraries.Common.Email;
using Libraries.Common.Enums;
using Libraries.Common.ResponseObjects;
using Libraries.Common.Utils;
using System;
using System.Configuration;
using System.Text;
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

                var response =  unitOfWork.Accounts.Save(accountDto, AccountMappers.Instance.MapToAccountDto);

                if (response.HasErrors) return response;

                if (accountDto.CrudStatus == CrudStatus.CREATE)
                {
                    SendCreateAccountEmail(accountDto);
                }

                return response;
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

            SendResetPasswordEmail(response.Item);

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

        #region Private Methods

        private void SendCreateAccountEmail(AccountDto accountDto)
        {            
            string smtpServerAddress = ConfigurationManager.AppSettings["LiveSMTPAddress"];
            int smtpPortNumber = Convert.ToInt32(ConfigurationManager.AppSettings["LiveSMTPPortNumber"]);
            string fromAddress = ConfigurationManager.AppSettings["LiveEmailReciever"];
            string accountUserName = ConfigurationManager.AppSettings["LiveAccountUsername"];
            string accountPassword = ConfigurationManager.AppSettings["LiveAccountPassword"];

            string subject = string.Format("{0} Email notification ... Welcome to {0}!", ConfigurationManager.AppSettings["SiteName"]);

            StringBuilder sb = new StringBuilder();

            // Add email heading
            sb.Append(string.Format("Dear {0} User.", "Essentails for Women"));
            sb.Append("<br />");
            sb.Append("<br />");
            sb.Append(string.Format("This Email confirms that your unique profile has been created with the following credentials."));
            sb.Append("<br />");
            sb.Append("<br />");
            sb.Append(string.Format("Username: {0}", accountDto.UserName));
            sb.Append("<br />");
            sb.Append(string.Format("Password: {0}", accountDto.Password));
            sb.Append("<br />");
            sb.Append("<br />");
            sb.Append("Follow the steps to finalize your profile.");
            sb.Append("<br />");
            sb.Append("<br />");
            sb.Append("<ol>");
            sb.Append(string.Format("<li>Log on to {0} by clicking on this link <a href='{1}'>{1}</a></li>", ConfigurationManager.AppSettings["SiteName"], ConfigurationManager.AppSettings["SiteUrl"]));
            sb.Append("<li>Insert your credentials as provided in this email and follow the change password steps.</li>");
            sb.Append("</ol>");

            EmailHandler.SendEmailUsingExternalMailBox(smtpServerAddress, smtpPortNumber, accountUserName, accountPassword, fromAddress, accountDto.EmailAddress, null, subject, sb.ToString());
        }

        private void SendResetPasswordEmail(AccountDto accountDto)
        {
            if (string.IsNullOrEmpty(accountDto.EmailAddress))
            {
                return;
            }

            string smtpServerAddress = ConfigurationManager.AppSettings["LiveSMTPAddress"];
            int smtpPortNumber = Convert.ToInt32(ConfigurationManager.AppSettings["LiveSMTPPortNumber"]);
            string fromAddress = ConfigurationManager.AppSettings["LiveEmailReciever"];
            string accountUserName = ConfigurationManager.AppSettings["LiveAccountUsername"];
            string accountPassword = ConfigurationManager.AppSettings["LiveAccountPassword"];

            string subject = string.Format("{0} Email notification ... Password Reset to {0}!", ConfigurationManager.AppSettings["SiteName"]);
            string siteLink = ConfigurationManager.AppSettings["ResetPasswordUrl"] + "?key=" + accountDto.ForgotPasswordKey.ToString();

            StringBuilder sb = new StringBuilder();

            // Add email heading
            sb.Append(string.Format("Dear {0} User.", "Essentails for Women"));
            sb.Append("<br />");
            sb.Append("<br />");
            sb.Append(string.Format("This Email confirms that you have requested a password reset please click the below link to reset your password."));
            sb.Append("<br />");
            sb.Append(string.Format("<a href='{0}'>Click Here</a>", siteLink));
            sb.Append("<br />");

            EmailHandler.SendEmailUsingExternalMailBox(smtpServerAddress, smtpPortNumber, accountUserName, accountPassword, fromAddress, accountDto.EmailAddress, null, subject, sb.ToString());
        }

        #endregion
    }
}

