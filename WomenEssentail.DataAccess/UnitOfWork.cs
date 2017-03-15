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

    #endregion

    public UnitOfWork() : base(ConfigurationManager.ConnectionStrings["PayRollConnectionString"].ConnectionString) { }

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
    
    #endregion

    void IDisposable.Dispose()
    {
        base.Dispose();
    }
}
