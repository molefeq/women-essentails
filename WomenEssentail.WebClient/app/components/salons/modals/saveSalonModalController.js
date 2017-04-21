﻿salonModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'geolocation', 'salonsFactory'];

function salonModalController($scope, $rootScope, $uibModalInstance, geolocation, salonsFactory) {
    var viewModel = $scope;

    viewModel.IsDeleteUser = viewModel.actionType == 'DELETE';
    viewModel.Title = viewModel.actionType == 'DELETE' ? 'Delete Salon' : viewModel.actionType == 'CREATE' ? 'Add New Salon' : 'Edit Salon';
    viewModel.cancel = cancel;
    viewModel.save = save;
    viewModel.uploadImage = uploadImage;
    viewModel.salonsFactory = salonsFactory;
    viewModel.setPostalSameAsPhysicalAddress = setPostalSameAsPhysicalAddress;
    viewModel.postalSameAsPhysical = false;
    viewModel.getCurrentLocation = getCurrentLocation;
    viewModel.removeImage = removeImage;

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

        viewModel.salonsFactory.uploadLogo(files).then(function (data) {
            viewModel.imageuploading = false;
        });
    };

    function save() {
        if (!viewModel.frmSalon.$valid) {
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
        geolocation.getLocation().then(function (data) {
            viewModel.salonsFactory.salon.PostalAddressLatitude = data.coords.latitude;
            viewModel.salonsFactory.salon.PostalAddressLongitude = data.coords.longitude;
            viewModel.salonsFactory.salon.PhysicalAddressLatitude = data.coords.latitude;
            viewModel.salonsFactory.salon.PhysicalAddressLongitude = data.coords.longitude;
        });
    };

    function removeImage(imageIndex) {
        var index = app.Utils.indexOf(viewModel.salonsFactory.salon.Logos, imageIndex, 'id');

        if (index >= 0) {
            viewModel.salonsFactory.salon.Logos.splice(index, 1);
        }
    };

};

