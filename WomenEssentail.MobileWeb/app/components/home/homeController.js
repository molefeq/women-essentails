(function () {

    'use strict';

    angular.module('app').controller('homeController', HomeController);

    HomeController.$inject = ['$scope', '$state', '$rootScope', 'lookupApiFactory'];

    function HomeController($scope, $state, $rootScope, lookupApiFactory) {
        var viewModel = $scope

        viewModel.goToMain = goToMain;

        $rootScope.isLoading = true;
      
        if (window.device && !window.device.isVirtual) {

            var model = {
                DeviceId: window.device.uuid,
                DeviceName: window.device.model,
                DevicePlatform: window.device.platform,
                DeviceSerialNumber: window.device.serial
            }

            lookupApiFactory.saveDeviceDetails(model).then(function (data) {
                $rootScope.isLoading = false;
            });
        }
        else {
            $rootScope.isLoading = false;
        }

        function goToMain() {
            $state.go('main');
        };
    };

})();