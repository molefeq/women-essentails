(function () {

    'use strict';

    angular.module('app').controller('headerController', headerController);

    headerController.$inject = ['$scope', 'notificationFactory', 'appFactory'];

    function headerController($scope, notificationFactory, appFactory) {
        var viewModel = $scope;

        viewModel.viewProfile = viewprofile;
        viewModel.changePassword = changepassword;
        viewModel.editOrganisation = editorganisation;
        viewModel.logout = logout;

        $scope.$on('server-error-occurred', function (event, data) {
            data.controller = errorController;
            notificationFactory.open(data);
        });


        function viewprofile() {

        }

        function changepassword() {

        }

        function editorganisation() {

        }

        function logout() {
            appFactory.LogOut();

        };

    };

})();