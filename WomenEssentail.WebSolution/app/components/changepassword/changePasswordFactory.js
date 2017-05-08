(function () {

    'use strict';

    angular.module('app').factory('changePasswordFactory', changePasswordFactory);

    changePasswordFactory.$inject = ['$http', '$q', '$state', 'ServerApiBaseUrl', 'appFactory'];

    function changePasswordFactory($http, $q, $state, ServerApiBaseUrl, appFactory) {
        var factory = {
            changePassword: changePassword
        };

        return factory;

        function changePassword(model) {
            var deferred = $q.defer();

            $http(
            {
                method: 'Post',
                url: ServerApiBaseUrl + '/Account/ChangePassword/',
                data: model
            })
            .success(function (data, status, headers, config) {
                if (data.HasErrors) {
                    deferred.reject();
                    return;
                }

                appFactory.Login(data.Item, data.access_token);

                var landingRoute = app.RoutesManager.getLandingRoute(appFactory.User.AccessModules, $state.get());

                deferred.resolve({ redirectState: landingRoute.name });
            });

            return deferred.promise;
        };
    };

})();