(function () {

    'use strict';

    angular.module('app').controller('salonController', salonController);

    salonController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'salonFactory', 'notificationFactory', 'companyApiFactory', 'appFactory', 'lookupApiFactory'];

    function salonController($scope, $rootScope, $state, $stateParams, salonFactory, notificationFactory, companyApiFactory, appFactory, lookupApiFactory) {
        var viewModel = $scope;
        var salonId = $stateParams.salonId

        appFactory.Initialise();

        viewModel.salonFactory = salonFactory;
        viewModel.goToSalonDirections = goToSalonDirections;
        viewModel.goToSalons = goToSalons;
        viewModel.viewProducts = viewProducts;
        viewModel.products = [];
        viewModel.categoryName = '';
        viewModel.subCategoryName = '';
        viewModel.backToSubCategories = backToSubCategories;
        viewModel.isLoading = true;
        viewModel.loadingMessage = 'Loading salon details ...';
        viewModel.setRating = setRating;
        viewModel.viewFeedbackHistory = viewFeedbackHistory;
        viewModel.giveFeedback = giveFeedback;

        $scope.rate = 2;

        $scope.hoveringOver = function (value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / 5);
        };

        viewModel.salonFactory.initialise(salonId, appFactory.User.DeviceId).then(function () {
            $rootScope.isLoading = true;
            $rootScope.loadingMessage = 'Navigating, please wait ...';

            $rootScope.isLoading = false;
            $rootScope.loadingMessage = '';
            //navigator.geolocation.getCurrentPosition(function (position) {
            var salonPosition = { lat: Number(viewModel.salonFactory.salon.PhysicalAddressLatitude), lng: Number(viewModel.salonFactory.salon.PhysicalAddressLongitude) }
            var map = new google.maps.Map(document.getElementById('map'), {
                center: salonPosition,
                zoom: 8
            });
            var marker = new google.maps.Marker({
                position: salonPosition,
                map: map
            });
            //}, locationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });
        });

        function goToSalons(e) {
            e.preventDefault();

            $state.go('salons');
        };

        function goToSalonDirections() {
            lookupApiFactory.logGoToCompany(salonId, appFactory.User.DeviceId);

            if (!window.device) {
                return $state.go('salondirection', { salonId: salonId });
            }

            var platform = device.platform.toLowerCase();

            launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, function (isAvailable) {
                if (isAvailable) {
                    navigate(launchnavigator.APP.GOOGLE_MAPS);
                }
                else if (platform == "android") {
                    launchnavigator.isAppAvailable(launchnavigator.APP.GEO, function (isAppAvailable) {
                        if (isAppAvailable) {
                            navigate(launchnavigator.APP.GEO);
                        }
                        else {
                            return $state.go('salondirection', { salonId: salonId });
                        }
                    });
                }
                else if (platform == "ios") {
                    launchnavigator.isAppAvailable(launchnavigator.APP.APPLE_MAPS, function (isAppAvailable) {
                        if (isAppAvailable) {
                            navigate(launchnavigator.APP.APPLE_MAPS);
                        }
                        else {
                            return $state.go('salondirection', { salonId: salonId });
                        }
                    });
                }
            });
        };

        function navigate(navigatorApp) {
            $rootScope.isLoading = true;
            $rootScope.loadingMessage = 'Navigating, please wait ...';

            navigator.geolocation.getCurrentPosition(function (position) {
                app.NavigatorUtils.navigate(position.coords, { latitude: viewModel.salonFactory.salon.PhysicalAddressLatitude, longitude: viewModel.salonFactory.salon.PhysicalAddressLongitude }, navigatorApp);
                $rootScope.isLoading = false;
            }, locationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });
        };

        function viewProducts(e, categoryName, subCategoryName, products) {
            e.preventDefault();

            viewModel.products = products;
            viewModel.categoryName = categoryName;
            viewModel.subCategoryName = subCategoryName;
        };

        function backToSubCategories() {
            viewModel.products = [];
            viewModel.categoryName = '';
            viewModel.subCategoryName = '';
        };

        function locationError(error) {
            var newScope = $rootScope.$new();

            newScope.model = {
                'ErrorCode': 408,
                'ErrorHeader': 'Error retrieving location',
                'ErrorDetails': 'Error retrieving location, please ensure that gps location is enabled. ' + 'Error Code: ' + error.code + 'Error Message: ' + error.message
            };

            notificationFactory.open({
                templateUrl: 'errortemplate.html',
                scope: newScope,
                size: 'sm',
                controller: errorController
            });
        };

        function setRating(rating) {
            companyApiFactory.addCompanyRating({ CompanyId: salonId, Rating: rating }).then(function (response) {

            });
        };

        function viewFeedbackHistory(e) {
            e.preventDefault();

            var newScope = $rootScope.$new();
            newScope.CompanyId = salonId;

            notificationFactory.open({
                templateUrl: 'salon-feedback-history-template.html',
                scope: newScope,
                size: 'sm',
                controller: salonFeedbackHistoryController
            });
        }

        function giveFeedback() {
            var newScope = $rootScope.$new();

            newScope.model = { CompanyId: salonId };

            notificationFactory.open({
                templateUrl: 'salon-feedback-template.html',
                scope: newScope,
                size: 'sm',
                controller: salonFeedbackController
            });
        }

    };

    salonFeedbackHistoryController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'companyApiFactory', 'salonFactory'];

    function salonFeedbackHistoryController($scope, $rootScope, $uibModalInstance, companyApiFactory, salonFactory) {
        var viewModel = $scope;

        viewModel.feedbacks = [];

        var searchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: '',
            CompanyId: viewModel.CompanyId
        };

        viewModel.closeDialog = closeDialog;

        companyApiFactory.getCompanyFeedbacks(searchFilter).then(function (response) {
            viewModel.feedbacks = response.CompanyFeedbacks;
        });

        function closeDialog() {
            $uibModalInstance.dismiss();
        };

    };

    salonFeedbackController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'companyApiFactory', 'salonFactory'];

    function salonFeedbackController($scope, $rootScope, $uibModalInstance, companyApiFactory, salonFactory) {
        var viewModel = $scope;

        viewModel.closeDialog = closeDialog;
        viewModel.addFeedback = addFeedback;

        function closeDialog() {
            $uibModalInstance.dismiss();
        };

        function addFeedback() {
            if (!viewModel.model.Feedback) {
                return;
            }

            companyApiFactory.addCompanyFeedback(viewModel.model).then(function (response) {
                salonFactory.salon.FeedbackCount = salonFactory.salon.FeedbackCount + 1;
                $uibModalInstance.dismiss();
            });
        }
    };

})();