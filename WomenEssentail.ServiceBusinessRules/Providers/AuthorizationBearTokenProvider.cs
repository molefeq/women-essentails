using Microsoft.Owin.Security.OAuth;

using SimpleInjector;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace WomenEssentail.ServiceBusinessRules.Providers
{
    public class AuthorizationBearTokenProvider : OAuthAuthorizationServerProvider
    {
        private LoginProvider loginProvider;

        public AuthorizationBearTokenProvider(Container container)
        {
            loginProvider = new LoginProvider(container);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();

            return Task.FromResult<object>(null);
        }

        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            if (string.IsNullOrWhiteSpace(context.UserName) || string.IsNullOrWhiteSpace(context.Password))
            {
                context.SetError("", "The username or password is required.");

                return Task.FromResult<object>(null);
            }

            loginProvider.Login(context.UserName, context.Password, context);

            return Task.FromResult<object>(null);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            loginProvider.SetLoginResponse(context);

            return Task.FromResult<object>(null);
        }
    }
}
