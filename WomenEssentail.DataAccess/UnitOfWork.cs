using Libraries.DataAccess.AdoDotNetLibrary;

using System;
using System.Configuration;

using WomenEssentail.DataAccess.Repositories;
public class UnitOfWork : DataServer, IDisposable
{
    #region Private Properties

    private RoleRepository _Roles;
    private AccountRepository _Accounts;
    private OrganisationRepository _Organisations;
    private CompanyRepository _Companies;
    private ModuleRepository _Modules;
    private DashboardRepository _Dashboards;
    private CompanyTypeRepository _CompanyTypes;
    private CompanySummaryRepository _CompanySummaries;
    private ProductRepository _Products;
    private ProductSummaryRepository _ProductSummaries;
    private AccountSummaryRepository _AccountSummaries;
    private PromotionProductRepository _PromotionProducts;
    private PromotionProductSummaryRepository _PromotionProductSummaries;
    private SubCategoryRepository _SubCategories;
    private CategoryRepository _Categories;
    private CompanyRequestRepository _CompanyRequests;
    private CompanyFeedbackRepository _CompanyFeedbacks;
    private CompanyRatingRepository _CompanyRatings;
    private BeautyTipRepository _BeautyTips;
    private ContactUsRepository _ContactUs;
    private DeviceDetailsRepository _DeviceDetails;
    private AppRatingRepository _AppRatings;
    private LookupFieldRepository _LookupFields;

    #endregion

    public UnitOfWork() : base(ConfigurationManager.ConnectionStrings["SQSWomenEssentailConnectionString"].ConnectionString) { }

    #region Public Properties

    public RoleRepository Roles
    {
        get
        {
            if (_Roles == null)
            {
                _Roles = new RoleRepository(Connection);
            }
            return _Roles;
        }
    }

    public AccountRepository Accounts
    {
        get
        {
            if (_Accounts == null)
            {
                _Accounts = new AccountRepository(Connection);
            }
            return _Accounts;
        }
    }

    public OrganisationRepository Organisations
    {
        get
        {
            if (_Organisations == null)
            {
                _Organisations = new OrganisationRepository(Connection);
            }
            return _Organisations;
        }
    }

    public CompanyRepository Companies
    {
        get
        {
            if (_Companies == null)
            {
                _Companies = new CompanyRepository(Connection);
            }
            return _Companies;
        }
    }

    public ModuleRepository Modules
    {
        get
        {
            if (_Modules == null)
            {
                _Modules = new ModuleRepository(Connection);
            }

            return _Modules;
        }
    }

    public DashboardRepository Dashboards
    {
        get
        {
            if (_Dashboards == null)
            {
                _Dashboards = new DashboardRepository(Connection);
            }

            return _Dashboards;
        }
    }

    public CompanyTypeRepository CompanyTypes
    {
        get
        {
            if (_CompanyTypes == null)
            {
                _CompanyTypes = new CompanyTypeRepository(Connection);
            }

            return _CompanyTypes;
        }
    }

    public CompanySummaryRepository CompanySummaries
    {
        get
        {
            if (_CompanySummaries == null)
            {
                _CompanySummaries = new CompanySummaryRepository(Connection);
            }
            return _CompanySummaries;
        }
    }

    public ProductRepository Products
    {
        get
        {
            if (_Products == null)
            {
                _Products = new ProductRepository(Connection);
            }
            return _Products;
        }
    }

    public ProductSummaryRepository ProductSummaries
    {
        get
        {
            if (_ProductSummaries == null)
            {
                _ProductSummaries = new ProductSummaryRepository(Connection);
            }
            return _ProductSummaries;
        }
    }

    public AccountSummaryRepository AccountSummaries
    {
        get
        {
            if (_AccountSummaries == null)
            {
                _AccountSummaries = new AccountSummaryRepository(Connection);
            }
            return _AccountSummaries;
        }
    }

    public PromotionProductRepository PromotionProducts
    {
        get
        {
            if (_PromotionProducts == null)
            {
                _PromotionProducts = new PromotionProductRepository(Connection);
            }
            return _PromotionProducts;
        }
    }

    public PromotionProductSummaryRepository PromotionProductSummaries
    {
        get
        {
            if (_PromotionProductSummaries == null)
            {
                _PromotionProductSummaries = new PromotionProductSummaryRepository(Connection);
            }

            return _PromotionProductSummaries;
        }
    }

    public SubCategoryRepository SubCategories
    {
        get
        {
            if (_SubCategories == null)
            {
                _SubCategories = new SubCategoryRepository(Connection);
            }

            return _SubCategories;
        }
    }

    public CategoryRepository Categories
    {
        get
        {
            if (_Categories == null)
            {
                _Categories = new CategoryRepository(Connection);
            }

            return _Categories;
        }
    }

    public CompanyRequestRepository CompanyRequests
    {
        get
        {
            if (_CompanyRequests == null)
            {
                _CompanyRequests = new CompanyRequestRepository(Connection);
            }

            return _CompanyRequests;
        }
    }

    public CompanyFeedbackRepository CompanyFeedbacks
    {
        get
        {
            if (_CompanyFeedbacks == null)
            {
                _CompanyFeedbacks = new CompanyFeedbackRepository(Connection);
            }

            return _CompanyFeedbacks;
        }
    }

    public CompanyRatingRepository CompanyRatings
    {
        get
        {
            if (_CompanyRatings == null)
            {
                _CompanyRatings = new CompanyRatingRepository(Connection);
            }

            return _CompanyRatings;
        }
    }

    public BeautyTipRepository BeautyTips
    {
        get
        {
            if (_BeautyTips == null)
            {
                _BeautyTips = new BeautyTipRepository(Connection);
            }

            return _BeautyTips;
        }
    }

    public ContactUsRepository ContactUs
    {
        get
        {
            if (_ContactUs == null)
            {
                _ContactUs = new ContactUsRepository(Connection);
            }

            return _ContactUs;
        }
    }

    public DeviceDetailsRepository DeviceDetails
    {
        get
        {
            if (_DeviceDetails == null)
            {
                _DeviceDetails = new DeviceDetailsRepository(Connection);
            }

            return _DeviceDetails;
        }
    }

    public AppRatingRepository AppRatings
    {
        get
        {
            if (_AppRatings == null)
            {
                _AppRatings = new AppRatingRepository(Connection);
            }

            return _AppRatings;
        }
    }

    public LookupFieldRepository LookupFields
    {
        get
        {
            if (_LookupFields == null)
            {
                _LookupFields = new LookupFieldRepository(Connection);
            }

            return _LookupFields;
        }
    }
    #endregion

    void IDisposable.Dispose()
    {
        base.Dispose();
    }
}
