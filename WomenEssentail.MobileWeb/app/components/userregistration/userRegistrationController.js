(function () {

    'use strict';

    angular.module('app').controller('userRegisterSalonController', UserRegisterSalonController);

    UserRegisterSalonController.$inject = ['$scope', '$rootScope', '$state', 'lookupApiFactory'];

    function UserRegisterSalonController($scope, $rootScope, $state, lookupApiFactory) {
        var viewModel = $scope;

        viewModel.model = {
            DeviceId: 'WebBrowser',
            DeviceName: 'WebBrowser'
        };

        viewModel.register = register;

        //var model = {
        //    DeviceId: 'WebBrowser',
        //    DeviceName: 'WebBrowser'
        //}

        if (window.device && !window.device.isVirtual) {
            viewModel.model = {
                DeviceId: window.device.uuid,
                DeviceName: window.device.model,
                DevicePlatform: window.device.platform,
                DeviceSerialNumber: window.device.serial
            }
        }

        function register() {
            if (!viewModel.frmRegisterUser.$valid) {
                $rootScope.$broadcast('action-complete', true);
                return;
            }

            lookupApiFactory.saveDeviceDetails(viewModel.model).then(function (data) {
                localStorage.setItem('user', JSON.stringify(viewModel.model));
                $state.go('main');
            });
        };

    };

})();