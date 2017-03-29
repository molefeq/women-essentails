(function () {

    'use strict';

    angular.module('app').controller('resetPasswordController', ResetPasswordController);

    ResetPasswordController.$inject = ['$scope', '$rootScope', '$state', '$location', 'forgotPasswordFactory'];

    function ResetPasswordController($scope, $rootScope, $state, $location, forgotPasswordFactory) {
        var qParams = $location.search();

        //if (!qParams.key) {
        //    return $location.path('/');
        //}

        var viewModel = $scope;

        viewModel.isPasswordResetSuccessFull = false;
        viewModel.resetpassword = resetpassword;
        viewModel.goToLogin = gotologin;
        viewModel.model = { ForgotPasswordKey: qParams.key };

        function resetpassword() {
            if (!viewModel.frmForgotPassword.$valid) {
                $rootScope.$broadcast('action-complete', true);
                return;
            }

            forgotPasswordFactory.passwordReset(viewModel.model).then(function (response) {
                viewModel.isPasswordResetSuccessFull = true;
            });
        };

        function gotologin(e) {
            e.preventDefault();

            return $location.path('/login');
        }

    };

})();