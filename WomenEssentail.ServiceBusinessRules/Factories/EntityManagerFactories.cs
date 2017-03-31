using SimpleInjector;

using WomenEssentail.ServiceBusinessRules.EntityManagers.Accounts;
using WomenEssentail.ServiceBusinessRules.EntityManagers.Categories;
using WomenEssentail.ServiceBusinessRules.EntityManagers.Companies;
using WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyRequests;
using WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyTypes;
using WomenEssentail.ServiceBusinessRules.EntityManagers.DashboardData;
using WomenEssentail.ServiceBusinessRules.EntityManagers.Modules;
using WomenEssentail.ServiceBusinessRules.EntityManagers.Organisations;
using WomenEssentail.ServiceBusinessRules.EntityManagers.Products;
using WomenEssentail.ServiceBusinessRules.EntityManagers.PromotionProducts;
using WomenEssentail.ServiceBusinessRules.EntityManagers.Roles;
using WomenEssentail.ServiceBusinessRules.EntityManagers.SubCategories;

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
            container.Register<IDashboardDataManager, DashboardDataManager>(Lifestyle.Singleton);
            container.Register<ICompanyTypeManager, CompanyTypeManager>(Lifestyle.Singleton); 
            container.Register<IProductManager, ProductManager>(Lifestyle.Singleton);
            container.Register<IPromotionProductManager, PromotionProductManager>(Lifestyle.Singleton);
            container.Register<ICategoryManager, CategoryManager>(Lifestyle.Singleton);
            container.Register<ISubCategoryManager, SubCategoryManager>(Lifestyle.Singleton);
            container.Register<ICompanyRequestManager, CompanyRequestManager>(Lifestyle.Singleton);
        }        
    }
}
