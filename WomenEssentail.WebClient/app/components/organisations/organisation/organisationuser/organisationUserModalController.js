'use strict';

organisationUserModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'organisationUserFactory'];

function organisationUserModalController($scope, $rootScope, $uibModalInstance, organisationUserFactory) {
    var viewModel = $scope;

    viewModel.IsDeleteUser = viewModel.actionType == 'DELETE';
    viewModel.IsNew = viewModel.actionType == 'CREATE';
    viewModel.Title = viewModel.IsNew ? 'Add New User' : viewModel.IsDeleteUser ? 'Delete User' : 'Edit User';
    viewModel.save = save;
    viewModel.deleteUser = deleteUser;
    viewModel.cancel = cancel;

    function cancel() {
        $rootScope.$broadcast('user-cancel');
        $uibModalInstance.dismiss();
    };

    function save() {

        if (!viewModel.frmOrganisationUser.$valid) {
            $rootScope.$broadcast('action-complete', true);
            return;
        }

        if (viewModel.actionType == 'CREATE') {
            organisationUserFactory.addUser(viewModel.model).then(function (data) {
                $rootScope.$broadcast('user-updated');
                $uibModalInstance.dismiss();
            });
        }

        if (viewModel.actionType == 'UPDATE') {
            organisationUserFactory.updateUser(viewModel.model).then(function (data) {
                $rootScope.$broadcast('user-updated');
                $uibModalInstance.dismiss();
            });
        }
    };

    function deleteUser() {
        organisationUserFactory.deleteUser(viewModel.model).then(function (data) {
            $rootScope.$broadcast('user-updated');
            $uibModalInstance.dismiss();
        });
    };
};
