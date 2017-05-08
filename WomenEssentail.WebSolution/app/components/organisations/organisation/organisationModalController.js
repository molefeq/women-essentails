
function organisationModalController($scope, $rootScope, $uibModalInstance, organisationsFactory) {
    var viewModel = $scope;

    viewModel.Title = viewModel.actionType == 'CREATE' ? 'Add New Organisation' : 'Edit Organisation';
    viewModel.save = save;
    viewModel.cancel = cancel;
    viewModel.uploadImage = uploadImage;
    viewModel.organisationsFactory = organisationsFactory;
    viewModel.setPostalSameAsPhysicalAddress = setPostalSameAsPhysicalAddress;
    viewModel.postalSameAsPhysicalAddress = false;

    function cancel() {
        $uibModalInstance.dismiss();
    };

    function uploadImage(files) {
        var isInvalidFileFound = false;

        $scope.imageuploading = true;

        if (!files || files.length == 0) {
            $scope.imageuploading = false;
            return;
        }

        angular.forEach(files, function (file, key) {
            if (file.type.indexOf('image') < 0) {
                isInvalidFileFound = true;
                return;
            }
        });

        if (isInvalidFileFound) {
            alert('Only image files can be uploaded for an organisation logo');
            $scope.imageuploading = false;
            return;
        }

        organisationsFactory.uploadOrganisationImage(files[0]).then(function (data) {
            $scope.imageuploading = false;
        });
    };

    function save() {
        if (!viewModel.frmOrganisation.$valid) {
            $rootScope.$broadcast('action-complete', true);
            return;
        }

        if (viewModel.actionType == 'CREATE') {
            organisationsFactory.add().then(function (data) {
                $uibModalInstance.close();
            });
        }

    };

    function setPostalSameAsPhysicalAddress() {
        if (!viewModel.postalSameAsPhysicalAddress) {
            return;
        }

        viewModel.organisationsFactory.organisation.PostalAddressLine1 = viewModel.organisationsFactory.organisation.PhysicalAddressLine1;
        viewModel.organisationsFactory.organisation.PostalAddressLine2 = viewModel.organisationsFactory.organisation.PhysicalAddressLine2;
        viewModel.organisationsFactory.organisation.PostalAddressSuburb = viewModel.organisationsFactory.organisation.PhysicalAddressSuburb;
        viewModel.organisationsFactory.organisation.PostalAddressCity = viewModel.organisationsFactory.organisation.PhysicalAddressCity;
        viewModel.organisationsFactory.organisation.PostalAddressPostalCode = viewModel.organisationsFactory.organisation.PhysicalAddressPostalCode;
    };

};