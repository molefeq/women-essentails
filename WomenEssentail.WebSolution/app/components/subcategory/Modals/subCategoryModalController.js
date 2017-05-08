subCategoryModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'subCategoryFactory'];

function subCategoryModalController($scope, $rootScope, $uibModalInstance, subCategoryFactory) {
    var viewModel = $scope;

    viewModel.IsDeleteSubCategory = viewModel.actionType == 'DELETE';
    viewModel.Title = viewModel.actionType == 'DELETE' ? 'Delete Service' : viewModel.actionType == 'CREATE' ? 'Add New Service' : 'Edit Service';
    viewModel.cancel = cancel;
    viewModel.save = save;
    viewModel.subCategoryFactory = subCategoryFactory;

    function cancel() {
        $uibModalInstance.dismiss();
    };

    function save() {
        if (!viewModel.frmSubCategory.$valid) {
            $rootScope.$broadcast('action-complete', true);
            return;
        }

        if (viewModel.actionType == 'CREATE') {
            viewModel.subCategoryFactory.add().then(function (data) {
                $rootScope.$broadcast('sucategory-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'UPDATE') {
            viewModel.subCategoryFactory.update().then(function (data) {
                $rootScope.$broadcast('sucategory-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'DELETE') {
            viewModel.subCategoryFactory.deleteSubCategory().then(function (data) {
                $rootScope.$broadcast('sucategory-updated', true);
                $uibModalInstance.dismiss();
            });
        }
    };

};

