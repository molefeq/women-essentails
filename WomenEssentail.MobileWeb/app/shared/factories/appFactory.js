(function () {

    'use strict';

    angular.module('app').factory('appFactory', AppFactory);

    AppFactory.$inject = ['$state'];

    function AppFactory($state) {
        var user, userDisplayName, token;

        var factory = {
            ManageUrlRedirects: manageUrlRedirects,
            location: null,
            locationAddress: null,
            isLocationServicesEnabled: false,
            Initialise: initialise,
            User: {}
        };

        return factory;

        function initialise() {
            if (localStorage["user"] === null || localStorage["user"] === undefined) {
                factory.User = null;
                return;
            }

            factory.User = JSON.parse(localStorage["user"]);
        }

        function manageUrlRedirects(event, fromState, toState) {

            if (toState.name != 'userregistration' && (localStorage["user"] === null || localStorage["user"] === undefined)) {
                event.preventDefault();
                $state.go('userregistration');
                return;
            }

        };
    };

})();