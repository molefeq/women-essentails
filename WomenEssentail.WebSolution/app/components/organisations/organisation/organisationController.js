(function () {

    'use strict';

    angular.module('app').controller('organisationController', OrganisationController);

    OrganisationController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'notificationFactory', 'organisationFactory', 'toastr', 'toastrConfig', 'appFactory', '$breadcrumb'];

    function OrganisationController($scope, $rootScope, $state, $stateParams, notificationFactory, organisationFactory, toastr, toastrConfig, appFactory, $breadcrumb) {
        var viewModel = $scope;
        var organisationId = $stateParams.organisationId;

        appFactory.Initialise();

        if (!organisationId) {
            //$rootScope.DoesPageHaveBreadcrumb = false;
            $state.$current.self.ncyBreadcrumb.parent = 'companies';
            organisationId = appFactory.User.OrganisationId;
        }

        viewModel.uploadImage = uploadImage;
        viewModel.organisationFactory = organisationFactory;
        viewModel.saveOrganisation = saveOrganisation;
        viewModel.setPostalSameAsPhysicalAddress = setPostalSameAsPhysicalAddress;
        toastrConfig.positionClass = 'toast-bottom-right';

        viewModel.organisationFactory.getOrganisation(organisationId);

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

            viewModel.organisationFactory.uploadOrganisationImage(files[0]).then(function (data) {
                $scope.imageuploading = false;
            });
        };

        function saveOrganisation() {
            if (!viewModel.frmOrganisation.$valid) {
                $rootScope.$broadcast('action-complete', true);
                return;
            }

            viewModel.organisationFactory.saveOrganisation().then(function (data) {
                toastr.success('Organisation save was successful.', 'Save');
            });
        };

        function setPostalSameAsPhysicalAddress() {
            if (!viewModel.postalSameAsPhysicalAddress) {
                return;
            }

            viewModel.organisationFactory.organisation.PostalAddressLine1 = viewModel.organisationFactory.organisation.PhysicalAddressLine1;
            viewModel.organisationFactory.organisation.PostalAddressLine2 = viewModel.organisationFactory.organisation.PhysicalAddressLine2;
            viewModel.organisationFactory.organisation.PostalAddressSuburb = viewModel.organisationFactory.organisation.PhysicalAddressSuburb;
            viewModel.organisationFactory.organisation.PostalAddressCity = viewModel.organisationFactory.organisation.PhysicalAddressCity;
            viewModel.organisationFactory.organisation.PostalAddressPostalCode = viewModel.organisationFactory.organisation.PhysicalAddressPostalCode;
        };

    };

})();