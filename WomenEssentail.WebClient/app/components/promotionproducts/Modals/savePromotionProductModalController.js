promotionProductModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'promotionProductsFactory'];

function promotionProductModalController($scope, $rootScope, $uibModalInstance, promotionProductsFactory) {
    var viewModel = $scope;

    viewModel.IsDeletePromotion = viewModel.actionType == 'DELETE';
    viewModel.Title = viewModel.actionType == 'DELETE' ? 'Delete Promotion' : viewModel.actionType == 'CREATE' ? 'Add New Promotion' : 'Edit Promotion';
    viewModel.cancel = cancel;
    viewModel.save = save;
    viewModel.uploadImage = uploadImage;
    viewModel.promotionProductsFactory = promotionProductsFactory;
    viewModel.openCalendar = openCalendar;

    viewModel.dateOptions = {
        dateDisabled: false,
        formatYear: 'yyyy',
        maxDate: new Date(2099, 1, 1),
        minDate: new Date(1890, 1, 1),
        startingDay: 1
    };

    viewModel.altInputFormats = ['M!/d!/yyyy'];

    viewModel.calendarStatuses = {
        isStartDateCalendarOpened: false,
        isEndDateCalendarOpened: false
    };

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

        viewModel.promotionProductsFactory.uploadLogo(files[0]).then(function (data) {
            viewModel.imageuploading = false;
        });
    };

    function openCalendar(calendarControl) {

        viewModel.calendarStatuses = {
            isStartDateCalendarOpened: false,
            isEndDateCalendarOpened: false
        };

        switch (calendarControl) {
            case 'StartDate':
                viewModel.calendarStatuses.isStartDateCalendarOpened = true;
                break
            case 'EndDate':
                viewModel.calendarStatuses.isEndDateCalendarOpened = true;
                break
        }
    };

    function save() {
        if (!viewModel.frmPromotionProduct.$valid) {
            $rootScope.$broadcast('action-complete', true);
            return;
        }

        if (viewModel.actionType == 'CREATE') {
            viewModel.promotionProductsFactory.add().then(function (data) {
                $rootScope.$broadcast('promotion-product-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'UPDATE') {
            viewModel.promotionProductsFactory.update().then(function (data) {
                $rootScope.$broadcast('promotion-product-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'DELETE') {
            viewModel.promotionProductsFactory.deletePromotionProduct().then(function (data) {
                $rootScope.$broadcast('promotion-product-updated', true);
                $uibModalInstance.dismiss();
            });
        }
    };
};

