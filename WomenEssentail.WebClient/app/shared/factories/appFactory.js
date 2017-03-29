(function () {

    'use strict';

    angular.module('app').factory('appFactory', AppFactory);

    AppFactory.$inject = ['$http', '$q', '$state', '$rootScope', 'ServerApiBaseUrl', 'AnonymousStates'];

    function AppFactory($http, $q, $state, $rootScope, ServerApiBaseUrl, AnonymousStates) {
        var user, userDisplayName, token;

        var factory = {
            User: null,
            Organisation: null,
            Company: null,
            TokenKey: null,
            IsUserLogged: false,
            UserDisplayName: null,
            Login: login,
            LogOut: logout,
            ViewOrganisation: viewOrganisation,
            SetOrganisation: setOrganisation,
            Initialise: initialise,
            ManageUrlRedirects: manageUrlRedirects
        };

        return factory;

        function login(userModel, tokenKey) {
            if (!userModel || !tokenKey) {
                return;
            }

            localStorage.setItem('TokenKey', tokenKey);
            localStorage.setItem('UserModel', JSON.stringify(userModel));

            initialise();
        };

        function initialise() {
            setUser();
            setToken();
            setIsUserLoggedIn();
            setUserDisplayName();
            setOrganisation();
        }

        function setUser() {

            if (localStorage["UserModel"] === null || localStorage["UserModel"] === undefined) {
                factory.User = null;
                return;
            }

            factory.User = JSON.parse(localStorage["UserModel"]);
            factory.User.CreateDate = new Date(factory.User.CreateDate);
        };

        function setToken() {

            if (localStorage["TokenKey"] === null || localStorage["TokenKey"] === undefined) {
                factory.TokenKey = null;
                return;
            }

            factory.TokenKey = localStorage["TokenKey"];
        };

        function setIsUserLoggedIn() {
            setUser();
            setToken();

            factory.IsUserLogged = factory.User != null && factory.TokenKey != null;
        };

        function setUserDisplayName() {
            setUser();

            if (factory.User == null) {
                factory.UserDisplayName = null;
                return;
            }

            factory.UserDisplayName = factory.User.FirstName + ' ' + factory.User.LastName;
        };

        function viewOrganisation(organisation) {
            if (organisation === null || organisation === undefined) {
                sessionStorage["Organisation"] = null;
                return;
            }

            sessionStorage.setItem('Organisation', JSON.stringify(organisation));
        };

        function setOrganisation() {
            if (sessionStorage["Organisation"] === null || sessionStorage["Organisation"] === undefined) {
                factory.Organisation = null;
                return;
            }

            factory.Organisation = JSON.parse(sessionStorage["Organisation"]);;
        };
        
        function logout(e) {
            if (e) {
                e.preventDefault;
            }
            
            var deferred = $q.defer();

            $http(
                {
                    method: 'Post',
                    url: ServerApiBaseUrl + '/Account/LogOut'
                })
                .success(function (data, status, headers, config) {
                    localStorage.clear();
                    sessionStorage.clear();

                    factory.TokenKey = null;
                    factory.Organisation = null;
                    factory.Company = null;
                    factory.IsUserLogged = false;
                    factory.User = null;
                    factory.UserDisplayName = null;

                    $state.go('login');

                    deferred.resolve();
                });

            return deferred.promise;
        };

        function manageUrlRedirects(event, fromState, toState) {
            setIsUserLoggedIn();
            $rootScope.DoesPageHaveBreadcrumb = toState.ncyBreadcrumb && !toState.ncyBreadcrumb.skip;

            if (!AnonymousStates[toState.name] && !factory.IsUserLogged) {
                event.preventDefault();
                logout();
                $state.go('login');
                return;
            }
            else {
                manageSessionVariables(fromState, toState)
            }
        };

        function manageSessionVariables(fromState, toState) {
            if (toState.name == 'login') {
                localStorage.clear();
                sessionStorage.clear();

                factory.TokenKey = null;
                factory.Organisation = null;
                factory.Company = null;
                factory.IsUserLogged = false;
                factory.User = null;
                factory.UserDisplayName = null;

                return;
            }

            if (!toState.sessionState || toState.sessionState.skip) {
                sessionStorage.clear();
                return;
            }

            if (toState.sessionState && !toState.sessionState.organisation) {
                sessionStorage.removeItem('Organisation');
                return;
            }

        };
    };

})();