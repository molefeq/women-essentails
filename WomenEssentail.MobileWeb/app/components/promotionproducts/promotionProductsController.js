(function () {

    'use strict';

    angular.module('app').controller('promotionProductsController', promotionProductsController);

    promotionProductsController.$inject = ['$scope', '$state', '$rootScope', 'productApiFactory', 'salonsFactory', 'geolocation', 'lookupApiFactory', 'companyApiFactory', 'notificationFactory'];

    function promotionProductsController($scope, $state, $rootScope, productApiFactory, salonsFactory, geolocation, lookupApiFactory, companyApiFactory, notificationFactory) {
        var viewModel = $scope

        viewModel.goToSalonDirection = goToSalonDirection;
        viewModel.subCategories = [];
        viewModel.promotions = [];
        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: salonsFactory.searchFilter.SearchText,
            SubCategoryId: salonsFactory.searchFilter.SubCategoryId
        };

        $rootScope.isLoading = true;
        $rootScope.loadingMessage = 'Loading Promotions, please wait ...';

        navigator.geolocation.getCurrentPosition(function (position) {
            viewModel.SearchFilter.Latitude = position.coords.latitude;
            viewModel.SearchFilter.Longitude = position.coords.longitude;
            lookupApiFactory.getSubCategories({ PageData: { IncludeAllData: true } }).then(function (response) {
                viewModel.subCategories = response.Items;

                productApiFactory.getPromotionProducts(viewModel.SearchFilter).then(function (response) {
                    viewModel.promotions = response.PromotionProducts
                    $rootScope.isLoading = false;
                });
            });
        }, locationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });

        function goToSalonDirection(salonId) {
            if (!window.device) {
                return $state.go('salondirection', { salonId: salonId });
            }

            var platform = device.platform.toLowerCase();

            launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, function (isAvailable) {
                if (isAvailable) {
                    navigate(launchnavigator.APP.GOOGLE_MAPS, salonId);
                }
                else if (platform == "android") {
                    launchnavigator.isAppAvailable(launchnavigator.APP.GEO, function (isAppAvailable) {
                        if (isAppAvailable) {
                            navigate(launchnavigator.APP.GEO, salonId);
                        }
                        else {
                            return $state.go('salondirection', { salonId: salonId });
                        }
                    });
                }
                else if (platform == "ios") {
                    launchnavigator.isAppAvailable(launchnavigator.APP.APPLE_MAPS, function (isAppAvailable) {
                        if (isAppAvailable) {
                            navigate(launchnavigator.APP.APPLE_MAPS, salonId);
                        }
                        else {
                            return $state.go('salondirection', { salonId: salonId });
                        }
                    });
                }
            });
        };

        function navigate(navigatorApp, salonId) {
            $rootScope.isLoading = true;
            $rootScope.loadingMessage = 'Navigating, please wait ...';

            navigator.geolocation.getCurrentPosition(function (position) {
                companyApiFactory.getCompany(salonId).then(function (data) {
                    app.NavigatorUtils.navigate(position.coords, { latitude: data.Company.PhysicalAddressLatitude, longitude: data.Company.PhysicalAddressLongitude }, navigatorApp);
                    $rootScope.isLoading = false;
                });
            }, locationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });
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
    };

})();