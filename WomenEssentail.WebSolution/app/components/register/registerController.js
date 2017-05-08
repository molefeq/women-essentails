(function () {

    'use strict';

    angular.module('app').controller('registerController', RegisterController);

    RegisterController.$inject = ['$scope', '$rootScope', '$state', 'registerFactory'];

    function RegisterController($scope, $rootScope, $state, registerFactory) {
        var viewModel = $scope;

        viewModel.model = {};
        viewModel.register = register;
        viewModel.cancel = cancel;
        viewModel.isRegistrationSucceful = false;
        
        function register() {
            if (!viewModel.frmRegister.$valid) {
                $rootScope.$broadcast('action-complete', true);
                return;
            }

            registerFactory.register(viewModel.model).then(function (response) {
                viewModel.isRegistrationSucceful = true;
            });
        };

        function cancel(provider) {
            $state.go('landing');
        };

    };

})();