(function () {

    'use strict';

    angular.module('app').factory('forgotPasswordFactory', ForgotPasswordFactory);

    ForgotPasswordFactory.$inject = ['$http', '$q', 'ServerApiBaseUrl'];

    function ForgotPasswordFactory($http, $q, ServerApiBaseUrl) {
        var factory = {
            forgotPassword: forgotPassword,
            passwordReset: passwordReset
        };

        return factory;

        function forgotPassword(username) {
            var deferred = $q.defer();

            $http(
            {
                method: 'Post',
                url: ServerApiBaseUrl + 'Account/ForgotPassword/?username=' + username
            })
            .success(function (data, status, headers, config) {

                if (data.HasErrors) {
                    deferred.reject();
                    return;
                }

                deferred.resolve();
            });

            return deferred.promise;
        };

        function passwordReset(model) {
            var deferred = $q.defer();

            $http(
            {
                method: 'Post',
                url: ServerApiBaseUrl + 'Account/ResetPassword/',
                data: model
            })
            .success(function (data, status, headers, config) {

                if (data.HasErrors) {
                    deferred.reject();
                    return;
                }

                deferred.resolve();
            });

            return deferred.promise;
        };
    };

})();