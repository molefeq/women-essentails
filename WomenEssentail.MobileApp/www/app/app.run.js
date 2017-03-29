(function () {
    'use strict';

    angular.module('app').run(['appFactory', '$rootScope', function (appFactory, $rootScope) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            appFactory.ManageUrlRedirects(event, fromState, toState);
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
        });
    }]);
})();