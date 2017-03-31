'use strict'

var app = app || {};

(function (routesmanager) {
    routesmanager.initialise = function (stateProvider) {
        stateProvider
          .state('landing', {
              url: "/",
              templateUrl: "app/components/landing/landingView.html",
              controller: 'appController',
              sessionState: {
                  skip: true
              }
          })
          .state('aboutus', {
              url: "/aboutus",
              templateUrl: "app/components/aboutus/aboutUsView.html",
              controller: 'appController',
              sessionState: {
                  skip: true
              }
          })
          .state('contactus', {
              url: "/contactus",
              templateUrl: "app/components/contactus/contactUsView.html",
              controller: 'appController',
              sessionState: {
                  skip: true
              }
          })
          .state('searchsalons', {
              url: "/searchsalons",
              templateUrl: "app/components/searchsalons/searchSalonsView.html",
              controller: 'appController',
              sessionState: {
                  skip: true
              }
          })
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
          .state('register', {
              url: "/register",
              templateUrl: "app/components/register/registerView.html",
              controller: 'registerController',
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
              url: "/home",
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
        })
        .state('salonrequests', {
            url: "/salonrequests",
            templateUrl: "app/components/companyrequests/companyRequestsView.html",
            controller: 'companyRequestsController',
            sessionState: {
                home: 'home',
                moduleOrder: 3
            }
        });
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
