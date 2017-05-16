'use strict'

var app = app || {};

(function (routesmanager) {
    routesmanager.initialise = function (stateProvider) {
        stateProvider
          .state('home', {
              url: "/home",
              templateUrl: "app/components/home/views/homeView.html",
              controller: 'homeController'
          })
          .state('aboutus', {
              url: "/aboutus",
              templateUrl: "app/components/aboutus/aboutUsView.html",
              controller: 'appController'
          })
          .state('main', {
              url: "/main",
              templateUrl: "app/components/main/mainView.html",
              controller: 'mainController',
          })
          .state('salons', {
              url: "/salons",
              templateUrl: "app/components/salons/salonsView.html",
              controller: 'salonsController'
          })
          .state('services', {
              url: "/services",
              templateUrl: "app/components/services/servicesView.html",
              controller: 'servicesController'
          })
          .state('contactus', {
              url: "/contactus",
              templateUrl: "app/components/contactus/contactusView.html",
              controller: 'contactusController'
          })
          .state('beautytips', {
              url: "/beautytips",
              templateUrl: "app/components/beautytips/beautyTipsView.html",
              controller: 'beautyTipsController'
          })
          .state('registersalon', {
              url: "/registersalon",
              templateUrl: "app/components/registersalon/registerSalonView.html",
              controller: 'registerSalonController'
          })
          .state('salon', {
              url: "/salon/:salonId",
              templateUrl: "app/components/salon/salonView.html",
              controller: 'salonController'
          })
          .state('promotionproducts', {
              url: "/promotionproducts",
              templateUrl: "app/components/promotionproducts/promotionProductsView.html",
              controller: 'promotionProductsController'
          })
        .state('salondirection', {
            url: "/salondirection/:salonId",
            templateUrl: "app/components/salondirection/salonDirectionView.html",
            controller: 'salonDirectionController'
        })
        .state('shareapp', {
            url: "/shareapp",
            templateUrl: "app/components/shareapp/shareAppView.html",
            controller: 'shareAppController'
        })
        .state('technicalreport', {
            url: "/technicalreport",
            templateUrl: "app/components/technicalreport/technicalReportView.html",
            controller: 'technicalReportController'
        })
        .state('salonlocationfinder', {
            url: "/salonlocationfinder",
            templateUrl: "app/components/salonlocationfinder/salonLocationFinderView.html",
            controller: 'salonLocationFinderController'
        })
        .state('userregistration', {
            url: "/userregistration",
            templateUrl: "app/components/userregistration/userRegistrationView.html",
            controller: 'userRegisterSalonController'
        });
    };

})(app.RoutesManager = {});
