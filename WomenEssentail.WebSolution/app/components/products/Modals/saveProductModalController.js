productModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'productsFactory'];

function productModalController($scope, $rootScope, $uibModalInstance, productsFactory) {
    var viewModel = $scope;

    viewModel.IsDeleteUser = viewModel.actionType == 'DELETE';
    viewModel.Title = viewModel.actionType == 'DELETE' ? 'Delete Product' : viewModel.actionType == 'CREATE' ? 'Add New Product' : 'Edit Product';
    viewModel.cancel = cancel;
    viewModel.save = save;
    viewModel.uploadImage = uploadImage;
    viewModel.productsFactory = productsFactory;
    viewModel.categoryChange = categoryChange;

    function cancel() {
        $uibModalInstance.dismiss();
    };

    function uploadImage(files) {
        var isInvalidFileFound = false;

        viewModel.imageuploading = true;

        if (!files || files.length == 0) {
            viewModel.imageuploading = false;
            return;
        }

        angular.forEach(files, function (file, key) {
            if (file.type.indexOf('image') < 0) {
                isInvalidFileFound = true;
                return;
            }
        });

        if (isInvalidFileFound) {
            alert('Only image files can be uploaded for an company logo');
            $scope.imageuploading = false;
            return;
        }

        viewModel.productsFactory.uploadLogo(files[0]).then(function (data) {
            viewModel.imageuploading = false;
        });
    };

    function save() {
        if (!viewModel.frmProduct.$valid) {
            $rootScope.$broadcast('action-complete', true);
            return;
        }

        if (viewModel.actionType == 'CREATE') {
            viewModel.productsFactory.add().then(function (data) {
                $rootScope.$broadcast('product-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'UPDATE') {
            viewModel.productsFactory.update().then(function (data) {
                $rootScope.$broadcast('product-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'DELETE') {
            viewModel.productsFactory.deleteProduct().then(function (data) {
                $rootScope.$broadcast('product-updated', true);
                $uibModalInstance.dismiss();
            });
        }
    };

    function categoryChange() {
        viewModel.productsFactory.getSubCategories(viewModel.productsFactory.product.CategoryId);
    };
};

