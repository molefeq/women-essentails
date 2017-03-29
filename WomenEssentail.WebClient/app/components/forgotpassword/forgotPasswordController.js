(function () {

    'use strict';

    angular.module('app').controller('forgotPasswordController', ForgotPasswordController);

    ForgotPasswordController.$inject = ['$scope', '$rootScope', '$state', 'forgotPasswordFactory'];

    function ForgotPasswordController($scope, $rootScope, $state, forgotPasswordFactory) {
        var viewModel = $scope;

        viewModel.isPasswordResetSuccessFull = false;
        viewModel.forgotpassword = forgotpassword;

        function forgotpassword() {
            if (!viewModel.frmForgotPassword.$valid) {
                $rootScope.$broadcast('action-complete', true);
                return;
            }

            forgotPasswordFactory.forgotPassword(viewModel.Username).then(function (response) {
                viewModel.isPasswordResetSuccessFull = true;
            });
        };

    };

})();