(function () {

    'use strict';

    angular.module('app').factory('errorFactory', errorFactory);

    errorFactory.$inject = ['$rootScope'];

    function errorFactory($rootScope) {
        var errors = {
            0: 'Internal Error',
            1: 'Invalid Request',
            400: 'Bad Request',
            401: 'User is not authorized to use this resource',
            403: 'User is forbidden from accessing the resource',
            405: 'Method Not Allowed',
            407: 'Proxy Authentication Required',
            408: 'Request Timeout'
        };

        var factory = {
            handleHttpServerError: handleHttpServerError
        };

        return factory;

        function handleHttpServerError(httpResponse) {
            var errorCode = httpResponse.status;
            var newScope = $rootScope.$new();

            newScope.model = {
                'ErrorCode': errorCode,
                'ErrorHeader': getErrorTitle(errorCode),
                'ErrorDetails': getErrorDetail(errorCode, httpResponse),
            };

            $rootScope.$broadcast('server-error-occurred', {
                templateUrl: 'errortemplate.html',
                scope: newScope,
                size: 'sm'
            });

        };

        function getErrorTitle(errorCode) {
            if (errorCode <= 0 || errorCode >= 500) {
                return errors[0];
            }

            if (errors[errorCode]) {
                return errors[errorCode];
            }

            if (errorCode >= 400) {
                return errors[1];
            }
        };

        function getErrorDetail(errorCode, httpResponse) {
            if (errorCode <= 0) {
                return 'You are not online. Please check your connectivity and try again';
            }

            if (httpResponse.data && httpResponse.data.Message) {
                switch (errorCode) {
                    case 405:
                        var errorMessage = httpResponse.config.url + ' does not support method ' + httpResponse.config.method;
                        return errorMessage;
                    default:
                        return httpResponse.data.Message;
                }
            }

            return httpResponse.statusText;
        };
    };

})();