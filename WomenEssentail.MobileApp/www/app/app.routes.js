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
        });
    };
    
})(app.RoutesManager = {});
