(function () {

    'use strict';

    angular.module('app').controller('loginController', LoginController);

    LoginController.$inject = ['$scope', '$rootScope', '$state', 'loginFactory'];

    function LoginController($scope, $rootScope, $state, loginFactory) {
        var viewModel = $scope;

        viewModel.model = {};
        viewModel.forgotPassword = forgotpassword;
        viewModel.login = login;
        viewModel.authExternalProvider = authExternalProvider;

        function forgotpassword() {
            $state.path('root.resetpassword');
        };

        function login() {
            if (!viewModel.frmLogin.$valid) {
                $rootScope.$broadcast('action-complete', true);
                return;
            }

            loginFactory.login(viewModel.model.Username, viewModel.model.Password).then(function (response) {
                $state.go(response.redirectState);
            });
        };

        function authExternalProvider(provider) {
            loginFactory.loginauthExternalProvider(provider, $scope);
        };

        $scope.authCompletedCB = function (fragment) {

            $scope.$apply(function () {

                if (fragment.haslocalaccount == 'False') {

                    authService.logOut();

                    authService.externalAuthData = {
                        provider: fragment.provider,
                        userName: fragment.external_user_name,
                        externalAccessToken: fragment.external_access_token
                    };

                    $location.path('/associate');

                }
                else {
                    //Obtain access token and redirect to orders
                    var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                    loginFactory.obtainAccessToken(externalData).then(function (response) {

                        $location.path('/orders');

                    },
                 function (err) {
                     $scope.message = err.error_description;
                 });
                }

            });
        }
    };

})();