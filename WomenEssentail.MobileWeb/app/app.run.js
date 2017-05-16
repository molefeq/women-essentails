(function () {
    'use strict';

    angular.module('app').run(['appFactory', '$rootScope', '$interval', 'utilsFactory', function (appFactory, $rootScope, $interval, utilsFactory) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            appFactory.ManageUrlRedirects(event, fromState, toState);
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
        });

        $rootScope.isLoading = true;
        $rootScope.loadingMessage = 'Switching on location services.';

        utilsFactory.switchOnGPSLocationServices().then(function (response) {

            if (!appFactory.isLocationServicesEnabled) {

                $rootScope.isLoading = false;
                $rootScope.loadingMessage = '';
                return;
            }

            $rootScope.loadingMessage = 'Retrieving current location.';

            utilsFactory.getCurrentLocation().then(function (data) {
                $rootScope.loadingMessage = 'Retrieving current location full address.';

                utilsFactory.getCurrentLocationAddress(appFactory.location).then(function (data) {
                    $rootScope.isLoading = false;
                    $rootScope.loadingMessage = '';
                });
            });
        });

        var locationInterval = $interval(function () {
            $rootScope.loadingMessage = 'Retrieving current location.';

            utilsFactory.getCurrentLocation().then(function (data) {
                $rootScope.loadingMessage = 'Retrieving current location full address.';

                utilsFactory.getCurrentLocationAddress(appFactory.location).then(function (data) {
                    $rootScope.isLoading = false;
                    $rootScope.loadingMessage = '';
                });
            });
        }, 300000);

    }]);
})();