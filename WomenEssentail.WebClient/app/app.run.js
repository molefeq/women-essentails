(function () {
    'use strict';

    angular.module('app').run(['appFactory', '$rootScope', function (appFactory, $rootScope) {
        appFactory.Initialise();

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            appFactory.ManageUrlRedirects(event, fromState, toState);

            $rootScope.$broadcast('state-changed', toState);
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
            $rootScope.$broadcast('state-menu-changed', toState);
        });
    }]);
})();