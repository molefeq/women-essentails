
(function () {
    'use strict';

    angular.module('app').config(appConfig);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

    function appConfig($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('appHttpInterceptorFactory');
        $httpProvider.defaults.useXDomain = true;

        configRoutes($stateProvider, $urlRouterProvider);
    };

    function configRoutes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");
        app.RoutesManager.initialise($stateProvider);
        //$stateProvider
        //  .state('login', {
        //      url: "/login",
        //      templateUrl: "app/components/login/loginView.html",
        //      controller: 'loginController',
        //      ncyBreadcrumb: {
        //          skip: true
        //      },
        //      sessionState: {
        //          skip: true
        //      }
        //  })
        //  .state('forgotpassword', {
        //      url: "/forgotpassword",
        //      templateUrl: "app/components/forgotpassword/forgotPasswordView.html",
        //      controller: 'forgotPasswordController',
        //      ncyBreadcrumb: {
        //          skip: true
        //      },
        //      sessionState: {
        //          skip: true
        //      }
        //  })
        //  .state('resetpassword', {
        //      url: "/resetpassword",
        //      templateUrl: "app/components/forgotpassword/resetPasswordView.html",
        //      controller: 'resetPasswordController',
        //      ncyBreadcrumb: {
        //          skip: true
        //      },
        //      sessionState: {
        //          skip: true
        //      }
        //  })
        //  .state('changepassword', {
        //      url: "/changepassword",
        //      templateUrl: "app/components/changepassword/changePasswordView.html",
        //      controller: 'changePasswordController',
        //      sessionState: {
        //          skip: true
        //      }
        //  })
        //  .state('home', {
        //      url: "/",
        //      templateUrl: "app/components/home/views/homeView.html",
        //      controller: 'homeController',
        //      ncyBreadcrumb: {
        //          label: 'Home page'
        //      },
        //      sessionState: {
        //          modules: ['Roles', 'System Configurations', 'Organisations', 'Companies'],
        //          moduleOrder: 1
        //      }
        //  })
        //  .state('organisations', {
        //      url: "/organisations",
        //      templateUrl: "app/components/organisations/organisationsView.html",
        //      controller: 'organisationsController',
        //      ncyBreadcrumb: {
        //          label: 'Organisations',
        //          parent: 'home'
        //      },
        //      sessionState: {
        //          modules: ['Organisations'],
        //          moduleOrder: 2
        //      }
        //  })
        //  .state('organisation', {
        //      url: "/organisation/:organisationId",
        //      templateUrl: "app/components/organisations/organisation/organisationView.html",
        //      controller: 'organisationController',
        //      ncyBreadcrumb: {
        //          label: 'Organisation - {{organisationFactory.organisation.Name}}',
        //          parent: 'organisations'
        //      },
        //      sessionState: {
        //          'organisation': true,
        //          modules: ['Organisation'],
        //          moduleOrder: 3
        //      }
        //  })
        //  .state('organisationusers', {
        //      url: "/organisationusers/:organisationId",
        //      templateUrl: "app/components/organisations/organisation/organisationuser/organisationUserView.html",
        //      controller: 'organisationUserController',
        //      ncyBreadcrumb: {
        //          label: 'Organisation - {{organisationUserFactory.organisation.Name}}',
        //          parent: 'organisations'
        //      },
        //      sessionState: {
        //          'organisation': true,
        //          modules: ['Organisation Users'],
        //          moduleOrder: 4
        //      }
        //  })
        //  .state('companies', {
        //      url: "/companies",
        //      templateUrl: "app/components/companies/companiesView.html",
        //      controller: 'companiesController',
        //      ncyBreadcrumb: {
        //          label: 'Organisation - {{organisationName}}',
        //          parent: 'organisations'
        //      },
        //      sessionState: {
        //          'organisation': true,
        //          modules: ['Organisation', 'Companies'],
        //          moduleOrder: 5
        //      }
        //  })
        //  .state('company', {
        //      url: "/company/:companyId",
        //      templateUrl: "app/components/companies/company/companyView.html",
        //      controller: 'companyController',
        //      ncyBreadcrumb: {
        //          label: 'Company - {{companyFactory.company.Name}}',
        //          parent: 'companies'
        //      },
        //      sessionState: {
        //          'organisation': true,
        //          modules: ['Company'],
        //          moduleOrder: 6
        //      }
        //  })
        //  .state('employees', {
        //      url: "/employees/:companyId",
        //      templateUrl: "app/components/companies/employees/employeesView.html",
        //      controller: 'employeesController',
        //      ncyBreadcrumb: {
        //          label: 'Employees',
        //          parent: 'companies'
        //      },
        //      sessionState: {
        //          'organisation': true,
        //          modules: ['Company'],
        //          moduleOrder: 7
        //      }
        //  })
        //  .state('configurations', {
        //      url: "/configurations",
        //      templateUrl: "app/components/configurations/configurationsView.html",
        //      controller: 'configurationsController',
        //      ncyBreadcrumb: {
        //          label: 'System Configurations',
        //          parent: 'home',
        //      },
        //      sessionState: {
        //          modules: ['System Configurations'],
        //          moduleOrder: 2
        //      }
        //  })
        //  .state('taxtables', {
        //      url: "/taxtables",
        //      templateUrl: "app/components/sarsconfigurations/taxtables/taxtablesView.html",
        //      controller: 'taxTablesController',
        //      ncyBreadcrumb: {
        //          label: 'Tax Tables',
        //          parent: 'configurations'
        //      },
        //      sessionState: {
        //          modules: ['Tax Tables'],
        //          moduleOrder: 3
        //      }
        //  })
        //  .state('allowances', {
        //      url: "/allowances",
        //      templateUrl: "app/components/sarsconfigurations/taxallowances/taxallowancesView.html",
        //      controller: 'taxAllowancesController',
        //      ncyBreadcrumb: {
        //          label: 'Allowances',
        //          parent: 'configurations'
        //      },
        //      sessionState: {
        //          modules: ['Allowances'],
        //          moduleOrder: 4
        //      }
        //  })
        //  .state('pensionrules', {
        //      url: "/pensionrules",
        //      templateUrl: "app/components/sarsconfigurations/pensionrules/pensionrulesView.html",
        //      controller: 'pensionRulesController',
        //      ncyBreadcrumb: {
        //          label: 'Pension Rules',
        //          parent: 'configurations'
        //      },
        //      sessionState: {
        //          modules: ['Pension Rules'],
        //          moduleOrder: 5
        //      }
        //  })
        //  .state('rafrules', {
        //      url: "/rafrules",
        //      templateUrl: "app/components/sarsconfigurations/rafrules/rafrulesView.html",
        //      controller: 'rafRulesController',
        //      ncyBreadcrumb: {
        //          label: 'RAF Rules',
        //          parent: 'configurations'
        //      },
        //      sessionState: {
        //          modules: ['RAF Rules'],
        //          moduleOrder: 6
        //      }
        //  })
        //  .state('medicalaidcredits', {
        //      url: "/medicalaidcredits",
        //      templateUrl: "app/components/sarsconfigurations/medicalaidtaxrules/medicalaidtaxrulesView.html",
        //      controller: 'medicalAidTaxRulesController',
        //      ncyBreadcrumb: {
        //          label: 'Medical Aid Credits',
        //          parent: 'configurations'
        //      },
        //      sessionState: {
        //          modules: ['Medical Aid Credits'],
        //          moduleOrder: 7
        //      }
        //  })
        //  .state('rolesadmin', {
        //      url: "/rolesadmin",
        //      templateUrl: "app/components/rolesadmin/rolesAdminView.html",
        //      controller: 'rolesAdminController',
        //      ncyBreadcrumb: {
        //          label: 'Roles',
        //          parent: 'home'
        //      },
        //      sessionState: {
        //          modules: ['Roles'],
        //          moduleOrder: 2
        //      }
        //  });
    };

})();
