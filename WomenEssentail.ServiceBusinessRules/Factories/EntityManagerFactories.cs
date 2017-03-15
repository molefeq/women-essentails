using WomenEssentail.ServiceBusinessRules.EntityManagers.Accounts;
using WomenEssentail.ServiceBusinessRules.EntityManagers.Companies;
using WomenEssentail.ServiceBusinessRules.EntityManagers.Modules;
using WomenEssentail.ServiceBusinessRules.EntityManagers.Organisations;
using WomenEssentail.ServiceBusinessRules.EntityManagers.Roles;

using SimpleInjector;

namespace WomenEssentail.ServiceBusinessRules.Factories
{
    public class EntityManagerFactories
    {
        public static void InitializeContainer(Container container)
        {
            container.Register<IAccountManager, AccountManager>(Lifestyle.Singleton);
            container.Register<IOrganisationManager, OrganisationManager>(Lifestyle.Singleton);
            container.Register<IRoleManager, RoleManager>(Lifestyle.Singleton);
            container.Register<ICompanyManager, CompanyManager>(Lifestyle.Singleton);
            container.Register<IModuleManager, ModuleManager>(Lifestyle.Singleton);
        }        
    }
}
