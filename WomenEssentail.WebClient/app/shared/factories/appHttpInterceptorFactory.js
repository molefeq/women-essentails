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
            var tokenKey = localStorage.getItem('TokenKey');

            if (tokenKey) {
                config.headers.Authorization = 'Bearer ' + tokenKey;
            }

            return config;
        };

        function requestError(rejection) {
            return $q.reject(rejection);
        };

        function response(response) {
            var model = getModel(response);

            $rootScope.$broadcast('action-complete');

            if (model && model.HasErrors) {
                $rootScope.$broadcast('server-validation-error-occurred', model.ErrorMessages);
                return $q.reject(response);
            }
            else {
                $rootScope.$broadcast('server-validation-successfull', model.ErrorMessages);
            }

            return response;
        };

        function responseError(rejection) {
            errorFactory.handleHttpServerError(rejection);

            $rootScope.$broadcast('action-complete');

            return $q.reject(rejection);
        };

        function getModel(response) {
            var model = response.data;

            if ($location.path() == '/login' && response.data.UserModel) {
                model = JSON.parse(response.data.UserModel);
            }

            return model;
        };
    };

})();