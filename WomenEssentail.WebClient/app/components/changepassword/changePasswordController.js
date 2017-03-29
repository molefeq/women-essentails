(function () {

    'use strict';

    angular.module('app').controller('changePasswordController', ChangePasswordController);

    ChangePasswordController.$inject = ['$scope', '$rootScope', '$state', '$location', 'changePasswordFactory', 'appFactory'];

    function ChangePasswordController($scope, $rootScope, $state, $location, changePasswordFactory, appFactory) {
        var viewModel = $scope;

        viewModel.changepassword = changepassword;
        viewModel.model = { Username: appFactory.User.UserName };

        function changepassword() {
            if (!viewModel.frmChangePassword.$valid) {
                $rootScope.$broadcast('action-complete', true);
                return;
            }

            changePasswordFactory.changePassword(viewModel.model).then(function (response) {
                $state.go(response.redirectState);
            });
        };

    };

})();