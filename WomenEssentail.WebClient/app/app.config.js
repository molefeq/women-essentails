
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
        $urlRouterProvider.otherwise("/");
        app.RoutesManager.initialise($stateProvider);
    };

})();
