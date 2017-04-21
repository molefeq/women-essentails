
(function () {
    'use strict';

    angular.module('app').config(appConfig);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', '$compileProvider'];

    function appConfig($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider) {
        $httpProvider.interceptors.push('appHttpInterceptorFactory');
        $httpProvider.defaults.useXDomain = true;
        $compileProvider.debugInfoEnabled(false);
        configRoutes($stateProvider, $urlRouterProvider);
    };

    function configRoutes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        app.RoutesManager.initialise($stateProvider);
    };

})();
