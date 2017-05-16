salonModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'geolocation', 'salonsFactory', 'utilsFactory', 'companyWorkingHourFactory'];

function salonModalController($scope, $rootScope, $uibModalInstance, geolocation, salonsFactory, utilsFactory, companyWorkingHourFactory) {
    var viewModel = $scope;

    viewModel.IsDeleteUser = viewModel.actionType == 'DELETE';
    viewModel.Title = viewModel.actionType == 'DELETE' ? 'Delete Salon' : viewModel.actionType == 'CREATE' ? 'Add New Salon' : 'Edit Salon';
    viewModel.cancel = cancel;
    viewModel.save = save;
    viewModel.uploadImage = uploadImage;
    viewModel.uploadLogo = uploadLogo;
    viewModel.salonsFactory = salonsFactory;
    viewModel.setPostalSameAsPhysicalAddress = setPostalSameAsPhysicalAddress;
    viewModel.postalSameAsPhysical = false;
    viewModel.getCurrentLocation = getCurrentLocation;
    viewModel.removeImage = removeImage;
    viewModel.saveWorkingHour = saveWorkingHour;
    viewModel.companyWorkingHourViewModel = companyWorkingHourFactory;

    viewModel.companyWorkingHourViewModel.dayNames = angular.copy(salonsFactory.dayNames);

    function cancel() {
        $uibModalInstance.dismiss();
    };

    function uploadLogo(files) {
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

        viewModel.salonsFactory.uploadLogo(files).then(function (data) {
            viewModel.imageuploading = false;
        });
    };

    function uploadLogo(files) {
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

        viewModel.salonsFactory.uploadSalonLogo(files).then(function (data) {
            viewModel.imageuploading = false;
        });
    };

    function uploadImage(files) {

        if (viewModel.salonsFactory.salon.Galleries && viewModel.salonsFactory.salon.Galleries.length > 2) {
            displayError("Error Uploading Iamges", 'Salon galleries are required and must not be more than 2.');
            $scope.imageuploading = false;
            return;
        }

        var filesLength = viewModel.salonsFactory.salon.Galleries ? viewModel.salonsFactory.salon.Galleries.length : 0;

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
            displayError("Error Uploading Iamges", 'Only image files can be uploaded for an company logo');
            $scope.imageuploading = false;
            return;
        }

        filesLength = filesLength + files.length;

        if (filesLength > 2) {
            displayError("Error Uploading Iamges", 'Salon galleries are required and must not be more than 2.');
            $scope.imageuploading = false;
            return;
        }

        viewModel.salonsFactory.uploadSalonImage(files).then(function (data) {
            viewModel.imageuploading = false;
        });
    };

    function save() {
        if (!viewModel.frmSalon.$valid || !validateImages()) {
            $rootScope.$broadcast('action-complete', true);
            return;
        }

        if (viewModel.actionType == 'CREATE') {
            viewModel.salonsFactory.add().then(function (data) {
                $rootScope.$broadcast('salon-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'UPDATE') {
            viewModel.salonsFactory.update().then(function (data) {
                $rootScope.$broadcast('salon-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'DELETE') {
            viewModel.salonsFactory.deleteSalon().then(function (data) {
                $rootScope.$broadcast('salon-updated', true);
                $uibModalInstance.dismiss();
            });
        }
    };

    function setPostalSameAsPhysicalAddress(postalSameAsPhysical) {
        if (!postalSameAsPhysical || !viewModel.salonsFactory.salon) {
            return;
        }

        viewModel.salonsFactory.salon.PostalAddressLine1 = viewModel.salonsFactory.salon.PhysicalAddressLine1;
        viewModel.salonsFactory.salon.PostalAddressLine2 = viewModel.salonsFactory.salon.PhysicalAddressLine2;
        viewModel.salonsFactory.salon.PostalAddressSuburb = viewModel.salonsFactory.salon.PhysicalAddressSuburb;
        viewModel.salonsFactory.salon.PostalAddressCity = viewModel.salonsFactory.salon.PhysicalAddressCity;
        viewModel.salonsFactory.salon.PostalAddressPostalCode = viewModel.salonsFactory.salon.PhysicalAddressPostalCode;
        viewModel.salonsFactory.salon.PostalAddressLatitude = viewModel.salonsFactory.salon.PhysicalAddressLatitude;
        viewModel.salonsFactory.salon.PostalAddressLongitude = viewModel.salonsFactory.salon.PhysicalAddressLongitude;
    };

    function getCurrentLocation() {
        utilsFactory.getCurrentLocation().then(function (data) {
            viewModel.salonsFactory.salon.PostalAddressLatitude = data.Position.latitude;
            viewModel.salonsFactory.salon.PostalAddressLongitude = data.Position.longitude;
            viewModel.salonsFactory.salon.PhysicalAddressLatitude = data.Position.latitude;
            viewModel.salonsFactory.salon.PhysicalAddressLongitude = data.Position.longitude;
        }, locationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });
    };

    function removeImage(imageIndex) {
        var index = app.Utils.indexOf(viewModel.salonsFactory.salon.Galleries, imageIndex, 'id');

        if (index >= 0) {
            viewModel.salonsFactory.salon.Galleries.splice(index, 1);
        }
    };

    function validateImages() {
        var isValid = true;
        var errorMessage = '';

        if (!viewModel.salonsFactory.salon.Logo || !viewModel.salonsFactory.salon.Logo) {
            errorMessage = '<div>Salon Logo is required.</div>';
            isValid = false;
        }

        if (!viewModel.salonsFactory.salon.Galleries || viewModel.salonsFactory.salon.Galleries.length == 0 || viewModel.salonsFactory.salon.Galleries.length > 2) {
            errorMessage = errorMessage + '<div>Salon galleries are required and must not be more than 2.</div>';
            isValid = false;
        }

        if (!isValid) {
            displayError("Error Saving Salons", errorMessage);
        }

        return isValid;
    }

    function locationError(error) {
        var newScope = $rootScope.$new();

        newScope.model = {
            'ErrorCode': 408,
            'ErrorHeader': 'Error retrieving location',
            'ErrorDetails': 'Error retrieving location, please ensure that gps location is enabled.'
        };

        $rootScope.$broadcast('server-error-occurred', {
            templateUrl: 'errortemplate.html',
            scope: newScope,
            size: 'sm'
        });
    };

    function displayError(errorHeader, errorDetails) {

        var newScope = $rootScope.$new();

        newScope.model = {
            'ErrorCode': "404",
            'ErrorHeader': errorHeader,
            'ErrorDetails': errorDetails,
        };

        $rootScope.$broadcast('server-error-occurred', {
            templateUrl: 'errortemplate.html',
            scope: newScope,
            size: 'sm'
        });

    }

    function saveWorkingHour() {
        if (!viewModel.frmWorkingHours.isValid(viewModel.companyWorkingHourViewModel.companyWorkingHour)) {
            return;
        }
    };
};

