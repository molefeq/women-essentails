(function () {

    'use strict';

    angular.module('app').controller('registerSalonController', RegisterSalonController);

    RegisterSalonController.$inject = ['$scope', '$rootScope', '$state', 'companyApiFactory'];

    function RegisterSalonController($scope, $rootScope, $state, companyApiFactory) {
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

            companyApiFactory.addCompanyRequest(viewModel.model).then(function (data) {
                viewModel.model = {};
                viewModel.isRegistrationSucceful = true;
            });
        };

        function cancel() {
            $state.go('main');
        };

    };

})();