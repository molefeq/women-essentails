'use strict';

companyUserModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'companyUsersFactory'];

function companyUserModalController($scope, $rootScope, $uibModalInstance, companyUsersFactory) {
    var viewModel = $scope;

    viewModel.IsDeleteUser = viewModel.actionType == 'DELETE';
    viewModel.IsNew = viewModel.actionType == 'CREATE';
    viewModel.Title = viewModel.IsNew ? 'Add New User' : viewModel.IsDeleteUser ? 'Delete User' : 'Edit User';
    viewModel.save = save;
    viewModel.cancel = cancel;
    viewModel.companyUsersFactory = companyUsersFactory;

    function cancel() {
        $rootScope.$broadcast('user-cancel');
        $uibModalInstance.dismiss();
    };

    function save() {

        if (!viewModel.frmCompanyUser.$valid) {
            $rootScope.$broadcast('action-complete', true);
            return;
        }

        if (viewModel.actionType == 'CREATE') {
            companyUsersFactory.addUser().then(function (data) {
                $rootScope.$broadcast('user-updated');
                $uibModalInstance.dismiss();
            });
        }

        if (viewModel.actionType == 'UPDATE') {
            companyUsersFactory.updateUser().then(function (data) {
                $rootScope.$broadcast('user-updated');
                $uibModalInstance.dismiss();
            });
        }
        if (viewModel.actionType == 'DELETE') {
            companyUsersFactory.deleteUser().then(function (data) {
                $rootScope.$broadcast('user-updated');
                $uibModalInstance.dismiss();
            });
        }
    };

};
