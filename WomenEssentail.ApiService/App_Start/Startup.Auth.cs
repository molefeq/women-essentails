using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.OAuth;

using Owin;

using WomenEssentail.ApiService.App_Start;

using WomenEssentail.ServiceBusinessRules.Providers;

using SimpleInjector;
using System;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Google;

namespace WomenEssentail.ApiService
{
    public partial class Startup
    {
        public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; private set; }
        public static GoogleOAuth2AuthenticationOptions googleAuthOptions { get; private set; }

        public void ConfigureAuth(IAppBuilder appBuilder)
        {
            BearerTokenAuthorization(appBuilder);
            googleAuthOptions = new GoogleOAuth2AuthenticationOptions()
            {
                ClientId = "117641525700-n4l13nvcv36v2ueaegpo5762mot6ob1t.apps.googleusercontent.com",
                ClientSecret = "mEKnZNEsTbQtFFp9iSUp_k_Y",
                Provider = new GoogleAuthProvider()
            };

            appBuilder.UseGoogleAuthentication(googleAuthOptions);
        }

        private void BearerTokenAuthorization(IAppBuilder appBuilder)
        {
            //use a cookie to temporarily store information about a user logging in with a third party login provider
            appBuilder.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);
            OAuthBearerOptions = new OAuthBearerAuthenticationOptions();

            appBuilder.UseCors(CorsOptions.AllowAll);
            var container = new Container();

            OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/Account/Login"),
                AccessTokenExpireTimeSpan = TimeSpan.FromHours(24),
                Provider = new AuthorizationBearTokenProvider(SimpleInjectorWebApiInitializer.AppContainer)
            };

            // Token Generation
            appBuilder.UseOAuthAuthorizationServer(OAuthServerOptions);
            appBuilder.UseOAuthBearerAuthentication(OAuthBearerOptions);
        }
    }
}