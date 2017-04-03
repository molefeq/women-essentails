(function () {

    'use strict';

    angular.module('app').factory('loginFactory', loginFactory);

    loginFactory.$inject = ['$http', '$q', '$state', 'ServerBaseUrl', 'appFactory', 'errorFactory'];

    function loginFactory($http, $q, $state, ServerBaseUrl, appFactory, errorFactory) {
        var factory = {
            login: login,
            loginauthExternalProvider: authExternalProvider,
            obtainAccessToken: obtainAccessToken
        };

        return factory;

        function login(username, password) {
            var deferred = $q.defer();
            var data = "grant_type=password&username=" + username + "&password=" + password;

            $http(
            {
                method: 'Post',
                url: ServerBaseUrl + '/Account/Login',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            })
            .success(function (data, status, headers, config) {
                var response = JSON.parse(data.UserModel);

                if (!response || response.HasErrors) {
                    deferred.reject();
                    return;
                }

                appFactory.Login(response.Item, data.access_token);

                if (response.Item.IsFirstTimeLoggedInd) {
                    deferred.resolve({ redirectState: 'changepassword' });
                    return;
                }

                if (appFactory.User.AccessModules == null || appFactory.User.AccessModules.length == 0) {
                    errorFactory.handleHttpServerError({
                        status: 403,
                        data: {
                            Message: 'You do not have enough permessions to access this view.'
                        }
                    });
                    deferred.reject();
                    return;
                }

                var landingRoute = app.RoutesManager.getLandingRoute(appFactory.User.AccessModules, $state.get());

                deferred.resolve({ redirectState: landingRoute.name });
            });

            return deferred.promise;
        };

        function authExternalProvider(provider, scope) {
            var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

            var externalProviderUrl = ServerBaseUrl + "api/Account/ExternalLogin?provider=" + provider
                                                                        + "&response_type=token&client_id=ngAuthApp"
                                                                        + "&redirect_uri=" + redirectUri;
            window.$windowScope = scope;

            var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
        };


        function obtainAccessToken(externalData) {

            var deferred = $q.defer();

            $http.get(ServerBaseUrl + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {


                deferred.resolve(response);

            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;

        };
    };

})();