[assembly: WebActivatorEx.PostApplicationStartMethod(typeof(WomenEssentail.ApiService.App_Start.SimpleInjectorWebApiInitializer), "Initialize")]

namespace WomenEssentail.ApiService.App_Start
{
    using WomenEssentail.ServiceBusinessRules.Factories;

    using SimpleInjector;
    using SimpleInjector.Integration.WebApi;

    using System.Web.Http;
    public static class SimpleInjectorWebApiInitializer
    {
        public static readonly Container AppContainer = new Container();

        /// <summary>Initialize the container and register it as Web API Dependency Resolver.</summary>
        public static void Initialize()
        {
            //var container = new Container();
            AppContainer.Options.DefaultScopedLifestyle = new WebApiRequestLifestyle();

            InitializeContainer(AppContainer);

            AppContainer.RegisterWebApiControllers(GlobalConfiguration.Configuration);

            AppContainer.Verify();

            GlobalConfiguration.Configuration.DependencyResolver = new SimpleInjectorWebApiDependencyResolver(AppContainer);

            //AppContainer = container;
        }

        private static void InitializeContainer(Container container)
        {
            // Initialize all the entity managers interfaces.
            EntityManagerFactories.InitializeContainer(container);

            // For instance:
            // container.Register<IUserRepository, SqlUserRepository>(Lifestyle.Scoped);
        }
    }
}