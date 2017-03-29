'use strict'

var app = app || {};

(function (routesmanager) {
    routesmanager.initialise = function (stateProvider) {
        stateProvider
          .state('login', {
              url: "/login",
              templateUrl: "app/components/login/loginView.html",
              controller: 'loginController',
              sessionState: {
                  skip: true
              }
          })
          .state('forgotpassword', {
              url: "/forgotpassword",
              templateUrl: "app/components/forgotpassword/forgotPasswordView.html",
              controller: 'forgotPasswordController',
              sessionState: {
                  skip: true,
                  home: 'login'
              }
          })
          .state('resetpassword', {
              url: "/resetpassword",
              templateUrl: "app/components/forgotpassword/resetPasswordView.html",
              controller: 'resetPasswordController',
              sessionState: {
                  skip: true,
                  home: 'login'
              }
          })
          .state('changepassword', {
              url: "/changepassword",
              templateUrl: "app/components/changepassword/changePasswordView.html",
              controller: 'changePasswordController',
              sessionState: {
                  skip: true,
                  home: 'login'
              }
          })
          .state('home', {
              url: "/",
              templateUrl: "app/components/home/views/homeView.html",
              controller: 'homeController',
              sessionState: {
                  modules: ['Home'],
                  moduleOrder: 1
              }
          })
          .state('salons', {
              url: "/salons",
              templateUrl: "app/components/salons/salonsView.html",
              controller: 'salonsController',
              sessionState: {
                  home: 'home',
                  moduleOrder: 2
              }
          })
          .state('products', {
              url: "/products/:salonId",
              templateUrl: "app/components/products/productsView.html",
              controller: 'productsController',
              sessionState: {
                  home: 'home',
                  moduleOrder: 3
              }
          })
          .state('promotionproducts', {
              url: "/promotionproducts/:productId",
              templateUrl: "app/components/promotionproducts/promotionProductsView.html",
              controller: 'promotionProductsController',
              sessionState: {
                  home: 'home',
                  moduleOrder: 4
              }
          })
        .state('companyusers', {
            url: "/companyusers/:companyId",
            templateUrl: "app/components/companyusers/companyUsersView.html",
            controller: 'companyUsersController',
            sessionState: {
                home: 'home',
                moduleOrder: 3
            }
        });
        //.state('organisations', {
        //    url: "/organisations",
        //    templateUrl: "app/components/organisations/organisationsView.html",
        //    controller: 'organisationsController',
        //    ncyBreadcrumb: {
        //        label: 'Organisations',
        //        parent: 'home'
        //    },
        //    sessionState: {
        //        modules: ['Organisations'],
        //        moduleOrder: 2
        //    }
        //})
        //.state('organisation', {
        //    url: "/organisation/:organisationId",
        //    templateUrl: "app/components/organisations/organisation/organisationView.html",
        //    controller: 'organisationController',
        //    ncyBreadcrumb: {
        //        label: 'Organisation - {{organisationFactory.organisation.Name}}',
        //        parent: 'organisations'
        //    },
        //    sessionState: {
        //        'organisation': true,
        //        modules: ['Organisation'],
        //        moduleOrder: 3
        //    }
        //})
        //.state('organisationusers', {
        //    url: "/organisationusers/:organisationId",
        //    templateUrl: "app/components/organisations/organisation/organisationuser/organisationUserView.html",
        //    controller: 'organisationUserController',
        //    ncyBreadcrumb: {
        //        label: 'Organisation - {{organisationUserFactory.organisation.Name}}',
        //        parent: 'organisations'
        //    },
        //    sessionState: {
        //        'organisation': true,
        //        modules: ['Organisation Users'],
        //        moduleOrder: 4
        //    }
        //})
        //.state('companies', {
        //    url: "/companies",
        //    templateUrl: "app/components/companies/companiesView.html",
        //    controller: 'companiesController',
        //    ncyBreadcrumb: {
        //        label: 'Organisation - {{organisationName}}',
        //        parent: 'organisations'
        //    },
        //    sessionState: {
        //        'organisation': true,
        //        modules: ['Organisation', 'Companies'],
        //        moduleOrder: 5
        //    }
        //})
        //.state('company', {
        //    url: "/company/:companyId",
        //    templateUrl: "app/components/companies/company/companyView.html",
        //    resolve: {
        //        companyFactory: 'companyFactory',
        //        appFactory: 'appFactory',
        //        organisation: function (companyFactory, appFactory, $stateParams) {
        //            var companyId = $stateParams.companyId;
        //            appFactory.Initialise();
        //            if (!appFactory.Organisation) {
        //                return companyFactory.getOrganisation(appFactory.User.OrganisationId);
        //            }
        //            return null;
        //        }
        //    },
        //    controller: 'companyController',
        //    ncyBreadcrumb: {
        //        label: 'Company - {{companyFactory.company.Name}}',
        //        parent: 'companies'
        //    },
        //    sessionState: {
        //        'organisation': true,
        //        modules: ['Company'],
        //        moduleOrder: 6
        //    },
        //})
        //.state('employees', {
        //    url: "/employees/:companyId",
        //    templateUrl: "app/components/companies/employees/employeesView.html",
        //    controller: 'employeesController',
        //    resolve: {
        //        companyFactory: 'companyFactory',
        //        appFactory: 'appFactory',
        //        organisation: function (companyFactory, appFactory, $stateParams) {
        //            var companyId = $stateParams.companyId;
        //            appFactory.Initialise();
        //            if (!appFactory.Organisation) {
        //                return companyFactory.getOrganisation(appFactory.User.OrganisationId);
        //            }
        //            return null;
        //        }
        //    },
        //    ncyBreadcrumb: {
        //        label: 'Employees',
        //        parent: 'companies'
        //    },
        //    sessionState: {
        //        'organisation': true,
        //        modules: ['Company'],
        //        moduleOrder: 7
        //    }
        //})
        //.state('companyusers', {
        //    url: "/companyusers/:companyId",
        //    templateUrl: "app/components/companyusers/companyUsersView.html",
        //    controller: 'companyUsersController',
        //    resolve: {
        //        companyFactory: 'companyFactory',
        //        appFactory: 'appFactory',
        //        companiesFactory: 'companiesFactory',
        //        organisation: function (companyFactory, appFactory, $stateParams) {
        //            var companyId = $stateParams.companyId;
        //            appFactory.Initialise();
        //            if (!appFactory.Organisation && !companyId) {
        //                return companyFactory.getOrganisation(appFactory.User.OrganisationId);
        //            }
        //            return null;
        //        },
        //        company: function (companiesFactory, appFactory, $stateParams) {
        //            var companyId = $stateParams.companyId;
        //            appFactory.Initialise();
        //            if (!companyId) {
        //                return companiesFactory.getCompany(appFactory.User.CompanyId);
        //            }
        //            return null;
        //        }
        //    },
        //    ncyBreadcrumb: {
        //        label: 'Users',
        //        parent: 'companies'
        //    },
        //    sessionState: {
        //        'organisation': true,
        //        modules: ['Company'],
        //        moduleOrder: 8
        //    }
        //})
        //.state('configurations', {
        //    url: "/configurations",
        //    templateUrl: "app/components/configurations/configurationsView.html",
        //    controller: 'configurationsController',
        //    ncyBreadcrumb: {
        //        label: 'System Configurations',
        //        parent: 'home',
        //    },
        //    sessionState: {
        //        modules: ['System Configurations'],
        //        moduleOrder: 2
        //    }
        //})
        //.state('taxtables', {
        //    url: "/taxtables",
        //    templateUrl: "app/components/sarsconfigurations/taxtables/taxtablesView.html",
        //    controller: 'taxTablesController',
        //    ncyBreadcrumb: {
        //        label: 'Tax Tables',
        //        parent: 'configurations'
        //    },
        //    sessionState: {
        //        modules: ['Tax Tables'],
        //        moduleOrder: 3
        //    }
        //})
        //.state('allowances', {
        //    url: "/allowances",
        //    templateUrl: "app/components/sarsconfigurations/taxallowances/taxallowancesView.html",
        //    controller: 'taxAllowancesController',
        //    ncyBreadcrumb: {
        //        label: 'Allowances',
        //        parent: 'configurations'
        //    },
        //    sessionState: {
        //        modules: ['Allowances'],
        //        moduleOrder: 4
        //    }
        //})
        //.state('pensionrules', {
        //    url: "/pensionrules",
        //    templateUrl: "app/components/sarsconfigurations/pensionrules/pensionrulesView.html",
        //    controller: 'pensionRulesController',
        //    ncyBreadcrumb: {
        //        label: 'Pension Rules',
        //        parent: 'configurations'
        //    },
        //    sessionState: {
        //        modules: ['Pension Rules'],
        //        moduleOrder: 5
        //    }
        //})
        //.state('rafrules', {
        //    url: "/rafrules",
        //    templateUrl: "app/components/sarsconfigurations/rafrules/rafrulesView.html",
        //    controller: 'rafRulesController',
        //    ncyBreadcrumb: {
        //        label: 'RAF Rules',
        //        parent: 'configurations'
        //    },
        //    sessionState: {
        //        modules: ['RAF Rules'],
        //        moduleOrder: 6
        //    }
        //})
        //.state('medicalaidcredits', {
        //    url: "/medicalaidcredits",
        //    templateUrl: "app/components/sarsconfigurations/medicalaidtaxrules/medicalaidtaxrulesView.html",
        //    controller: 'medicalAidTaxRulesController',
        //    ncyBreadcrumb: {
        //        label: 'Medical Aid Credits',
        //        parent: 'configurations'
        //    },
        //    sessionState: {
        //        modules: ['Medical Aid Credits'],
        //        moduleOrder: 7
        //    }
        //})
        //.state('rolesadmin', {
        //    url: "/rolesadmin",
        //    templateUrl: "app/components/rolesadmin/rolesAdminView.html",
        //    controller: 'rolesAdminController',
        //    ncyBreadcrumb: {
        //        label: 'Roles',
        //        parent: 'home'
        //    },
        //    sessionState: {
        //        modules: ['Roles'],
        //        moduleOrder: 2
        //    }
        //})
        //.state('userprofile', {
        //    url: "/userprofile/:userProfileId",
        //    templateUrl: "app/components/userprofile/userProfileView.html",
        //    controller: 'userProfileController',
        //    ncyBreadcrumb: {
        //        skip: true
        //    }
        //})
        //.state('employee', {
        //    url: "/employee/:employeeId",
        //    views: {
        //        '': {
        //            templateUrl: "app/components/employee/employeeView.html",
        //            controller: 'employeeController'
        //        },
        //        'personaldetails@employee': {
        //            templateUrl: "app/components/employee/components/personalDetailsView.html"
        //        },
        //        'employeementdetails@employee': {
        //            templateUrl: "app/components/employee/components/employementDetailsView.html"
        //        },
        //        'medicalaiddetails@employee': {
        //            templateUrl: "app/components/employee/components/medicalAidDetailsView.html"
        //        },
        //        'bankdetails@employee': {
        //            templateUrl: "app/components/employee/components/bankDetailsView.html"
        //        },
        //        'contactdetails@employee': {
        //            templateUrl: "app/components/employee/components/contactDetailsView.html"
        //        }
        //    },
        //    ncyBreadcrumb: {
        //        skip: true
        //    },
        //    sessionState: {
        //        'organisation': true,
        //        modules: ['Employee'],
        //        moduleOrder: 8
        //    }
        //})
        //.state('companysetup', {
        //    url: "/companysetup/:companyId",
        //    templateUrl: "app/components/companysetup/companySetupView.html",
        //    controller: 'companySetupController',
        //    ncyBreadcrumb: {
        //        label: 'Company Set Up',
        //        parent: 'companies'
        //    },
        //    sessionState: {
        //        'organisation': true,
        //        modules: ['Company'],
        //        moduleOrder: 6
        //    }
        //});
    };

    routesmanager.getLandingRoute = function (usermodules, routes) {
        var sortedRoutes = _.sortBy(routes, function (o) { return !o.sessionState || !o.sessionState.moduleOrder ? 1000 : o.sessionState.moduleOrder; });
        var landingRoute = null;
        var returnRoute = null;


        _.find(sortedRoutes, function (route) {
            landingRoute = _.find(usermodules, function (usermodule) { return !route.sessionState || !route.sessionState.modules ? false : _.indexOf(route.sessionState.modules, usermodule.ModuleName) >= 0; });

            if (landingRoute != null) {
                returnRoute = route;
            }

            return landingRoute != null;
        });

        return returnRoute;
    };

    routesmanager.canRouteAccessModule = function (usermodules, route) {
        if (!usermodules || usermodules.length == 0 || !route.sessionState || !route.sessionState.modules) {
            return true;
        }

        var matchedmodules = _.find(usermodules, function (usermodule) {
            return _.indexOf(route.sessionState.modules, usermodule.ModuleName) >= 0;
        });

        return matchedmodules !== null && matchedmodules !== undefined;
    };

    routesmanager.canModuleAccessRoute = function (usermodules, module) {
        if (!usermodules || usermodules.length == 0 || !module) {
            return true;
        }

        var matchedmodules = _.find(usermodules, function (usermodule) {
            return usermodule.ModuleName == module;
        });

        return matchedmodules !== null && matchedmodules !== undefined;
    };

    routesmanager.getMenuItems = function (usermodules, menus, path) {
        var menuItems = [];
        var menuKeys = _.keys(menus);

        for (var i = 0; i < menuKeys.length; i++) {
            var canItemBeFound = _.find(menus[menuKeys[i]].MenuItems, function (item) {
                return item.path == path;
            });

            if (!canItemBeFound) {
                continue;
            }

            _.each(menus[menuKeys[i]].MenuItems, function (menuItem) {

                if (routesmanager.canModuleAccessRoute(usermodules, menuItem.module)) {
                    menuItems.push(menuItem);
                }
            });
        };

        return menuItems;
    };

})(app.RoutesManager = {});
