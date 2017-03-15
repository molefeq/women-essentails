using Libraries.Common.ResponseObjects;

using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;

using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.Accounts;

using SimpleInjector;

using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Security.Claims;
using System.Text;

namespace WomenEssentail.ServiceBusinessRules.Providers
{
    public class LoginProvider
    {
        private Container container;

        public LoginProvider(Container container)
        {
            this.container = container;
        }

        public void Login(string username, string password, OAuthGrantResourceOwnerCredentialsContext context)
        {
            Response<UserInformationDto> response = container.GetInstance<IAccountManager>().Login(username, password);

            context.OwinContext.Set<Response<UserInformationDto>>("UserModel", response);

            if (response.HasErrors || response.HasWarnings)
            {
                UserInvalidSignIn(context);
                return;
            }

            UserSignIn(response.Item, context);
        }

        public void SetLoginResponse(OAuthTokenEndpointContext context)
        {
            Response<UserInformationDto> response = context.OwinContext.Get<Response<UserInformationDto>>("UserModel");

            if (response != null)
            {
                DataContractJsonSerializer dataContractJsonSerializer = new DataContractJsonSerializer(typeof(Response<UserInformationDto>));

                using (MemoryStream memoryStream = new MemoryStream())
                {
                    dataContractJsonSerializer.WriteObject(memoryStream, response);

                    string jsonString = Encoding.UTF8.GetString(memoryStream.ToArray());

                    memoryStream.Close();

                    context.AdditionalResponseParameters.Add("UserModel", jsonString);
                }
            }
        }

        public void LogOut(IAuthenticationManager AuthenticationManager)
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            AuthenticationManager.SignOut();
        }

        public Response<AccountDto> PasswordResetRequest(string username, IAuthenticationManager AuthenticationManager)
        {
            Response<AccountDto> response = container.GetInstance<IAccountManager>().PasswordResetRequest(username);

            if (response.HasErrors || response.HasWarnings)
            {
                return response;
            }

            LogOut(AuthenticationManager);

            return response;
        }

        public Response<AccountDto> PasswordReset(ResetPasswordDto resetPasswordDto, IAuthenticationManager AuthenticationManager)
        {
            LogOut(AuthenticationManager);

            Response<AccountDto> response = container.GetInstance<IAccountManager>().PasswordReset(resetPasswordDto);

            if (response.HasErrors || response.HasWarnings)
            {
                return response;
            }

            return response;
        }

        public Response<UserInformationDto> ChangePassword(ChangePasswordDto changePasswordDto, IAuthenticationManager AuthenticationManager)
        {
            LogOut(AuthenticationManager);

            Response<UserInformationDto> response = container.GetInstance<IAccountManager>().ChangePassword(changePasswordDto);

            if (response.HasErrors || response.HasWarnings)
            {
                return response;
            }

            return response;
        }

        #region Private Methods

        private void UserInvalidSignIn(OAuthGrantResourceOwnerCredentialsContext context)
        {
            List<Claim> claims = new List<Claim>();
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ExternalBearer);
            AuthenticationProperties authenticationProperties = new AuthenticationProperties(new Dictionary<string, string>
                {
                    {"as:client_id",  string.Empty}
                });

            var ticket = new AuthenticationTicket(claimsIdentity, authenticationProperties);

            context.Validated(ticket);
        }

        private void UserSignIn(UserInformationDto userInformationDto, OAuthGrantResourceOwnerCredentialsContext context)
        {
            List<Claim> claims = GetClaims(userInformationDto);
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);
            AuthenticationProperties authenticationProperties = new AuthenticationProperties(new Dictionary<string, string>
                {
                    {"as:client_id", context.ClientId == null ? string.Empty : context.ClientId},
                    {"userName", context.UserName}
                });

            authenticationProperties.IsPersistent = true;

            var ticket = new AuthenticationTicket(claimsIdentity, authenticationProperties);

            context.Validated(ticket);
        }

        private List<Claim> GetClaims(UserInformationDto userInformationDto)
        {
            List<Claim> claims = new List<Claim>();

            claims.Add(new Claim(ClaimTypes.Name, userInformationDto.Id.ToString()));
            claims.Add(new Claim("Username", userInformationDto.UserName));

            if (userInformationDto.OrganisationId != null)
            {
                claims.Add(new Claim("OrganisationId", userInformationDto.OrganisationId.Value.ToString()));
            }

            if (userInformationDto.CompanyId != null)
            {
                claims.Add(new Claim("CompanyId", userInformationDto.CompanyId.Value.ToString()));
            }

            if (userInformationDto.EmployeeId != null)
            {
                claims.Add(new Claim("EmployeeId", userInformationDto.EmployeeId.Value.ToString()));
            }

            //claims.Add(new Claim("RoleId", userInformationDto.RoleId.ToString()));
            //claims.Add(new Claim("RoleName", userInformationDto.RoleName));

            //foreach (var module in userInformationDto.AccessModules)
            //{
            //    claims.Add(new Claim("moduleId", module.Id.ToString()));
            //    claims.Add(new Claim("module", module.ModuleName));
            //}

            return claims;
        }

        #endregion
    }
}
