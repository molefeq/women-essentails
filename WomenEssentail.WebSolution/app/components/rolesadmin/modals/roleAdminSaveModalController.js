'use strict';

roleAdminSaveModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'rolesAdminFactory'];

function roleAdminSaveModalController($scope, $rootScope, $uibModalInstance, rolesAdminFactory) {
    var viewModel = $scope;

    viewModel.rolesAdminFactory = rolesAdminFactory;
    viewModel.IsDeleteUser = viewModel.actionType == 'DELETE';
    viewModel.IsNew = viewModel.actionType == 'CREATE';
    viewModel.Title = viewModel.IsNew ? 'Add New Role' : viewModel.IsDeleteUser ? 'Delete Role' : 'Edit Role';
    viewModel.save = save;
    viewModel.deleteRole = deleteRole;
    viewModel.cancel = cancel;

    function cancel() {
        $rootScope.$broadcast('role-cancel');
        $uibModalInstance.dismiss();
    };

    function save() {

        if (!viewModel.frmRoleAdmin.$valid) {
            $rootScope.$broadcast('action-complete', true);
            return;
        }

        if (viewModel.actionType == 'CREATE') {
            viewModel.rolesAdminFactory.addRole().then(function (data) {
                $rootScope.$broadcast('roles-updated');
                $uibModalInstance.dismiss();
            });
        }

        if (viewModel.actionType == 'UPDATE') {
            viewModel.rolesAdminFactory.updateRole().then(function (data) {
                $rootScope.$broadcast('roles-updated');
                $uibModalInstance.dismiss();
            });
        }
    };

    function deleteRole() {
        viewModel.rolesAdminFactory.deleteRole().then(function (data) {
            $rootScope.$broadcast('roles-updated');
            $uibModalInstance.dismiss();
        });
    };
};
