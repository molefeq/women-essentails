beuatyTipModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'beautyTipsFactory'];

function beuatyTipModalController($scope, $rootScope, $uibModalInstance, beautyTipsFactory) {
    var viewModel = $scope;

    viewModel.IsDeleteUser = viewModel.actionType == 'DELETE';
    viewModel.Title = viewModel.actionType == 'DELETE' ? 'Delete Beuaty Tip' : viewModel.actionType == 'CREATE' ? 'Add New Beuaty Tip' : 'Edit Beuaty Tip';
    viewModel.cancel = cancel;
    viewModel.save = save;
    viewModel.beautyTipsFactory = beautyTipsFactory;
    viewModel.categoryChange = categoryChange;

    function cancel() {
        $uibModalInstance.dismiss();
    };
    
    function save() {
        if (!viewModel.frmBeautyTip.$valid) {
            $rootScope.$broadcast('action-complete', true);
            return;
        }

        if (viewModel.actionType == 'CREATE') {
            viewModel.beautyTipsFactory.add().then(function (data) {
                $rootScope.$broadcast('beuaty-tip-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'UPDATE') {
            viewModel.beautyTipsFactory.update().then(function (data) {
                $rootScope.$broadcast('beuaty-tip-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'DELETE') {
            viewModel.beautyTipsFactory.deleteBeuatyTip().then(function (data) {
                $rootScope.$broadcast('beuaty-tip-updated', true);
                $uibModalInstance.dismiss();
            });
        }
    };

    function categoryChange() {
        viewModel.beautyTipsFactory.getSubCategories(viewModel.beautyTipsFactory.beuatyTip.CategoryId);
    };
};

