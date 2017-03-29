(function () {

    'use strict';

    angular.module('app').factory('appHttpInterceptorFactory', appHttpInterceptorFactory);

    appHttpInterceptorFactory.$inject = ['$location', '$rootScope', '$q', 'errorFactory'];

    function appHttpInterceptorFactory($location, $rootScope, $q, errorFactory) {
        var factory = {
            request: request,
            requestError: requestError,
            response: response,
            responseError: responseError
        };

        return factory;

        function request(config) {
            return config;
        };

        function requestError(rejection) {
            return $q.reject(rejection);
        };

        function response(response) {            
            return response;
        };

        function responseError(rejection) {
            errorFactory.handleHttpServerError(rejection);

            $rootScope.$broadcast('action-complete');

            return $q.reject(rejection);
        };
    };

})();