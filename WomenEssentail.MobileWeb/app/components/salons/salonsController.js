(function () {

    'use strict';

    angular.module('app').controller('salonsController', SalonsController);

    SalonsController.$inject = ['$scope', '$rootScope', '$state', 'salonsFactory', 'salonDirectionFactory', 'lookupApiFactory', 'notificationFactory', 'appFactory'];

    function SalonsController($scope, $rootScope, $state, salonsFactory, salonDirectionFactory, lookupApiFactory, notificationFactory, appFactory) {
        var viewModel = $scope;
        var page = 1;

        appFactory.Initialise();

        $rootScope.isLoading = false;
        viewModel.isBusy = true;
        viewModel.salonsFactory = salonsFactory;
        viewModel.salonsFactory.isScrollDisabled = true;
        viewModel.searchSalons = searchSalons;
        viewModel.goToSalon = goToSalon;
        viewModel.goToMain = goToMain;
        viewModel.goToSalonDirection = goToSalonDirection;
        viewModel.subCategories = [];
        viewModel.nextPage = nextPage;

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: salonsFactory.searchFilter.SearchText,
            SubCategoryId: salonsFactory.searchFilter.SubCategoryId,
            IsLocationSearch: true,
            DeviceId: appFactory.User.DeviceId
        };

        initialise();

        function initialise() {
            $rootScope.isLoading = true;
            page = 0;
            viewModel.salonsFactory.salons = [];
            viewModel.SearchFilter.Latitude = appFactory.location.latitude;
            viewModel.SearchFilter.Longitude = appFactory.location.longitude;

            nextPage();

            lookupApiFactory.getSubCategories({ PageData: { IncludeAllData: true } }).then(function (data) {
                $rootScope.isLoading = false;
                viewModel.subCategories = data.Items;
            }, function () {
                $rootScope.isLoading = false;
            });
        };

        function searchSalons(isClear) {
            viewModel.isBusy = true;
            $rootScope.isLoading = true;
            $rootScope.Message = 'Loading salons ..';

            if (isClear) {
                viewModel.salonsFactory.salons = [];
            };
            viewModel.salonsFactory.searchSalons(viewModel.SearchFilter).then(function (response) {
                viewModel.isBusy = false;
                $rootScope.isLoading = false;
                $rootScope.Message = '';
                console.log(viewModel.isBusy);
            }, function () {
                viewModel.isBusy = false;
                $rootScope.isLoading = false;
                $rootScope.Message = '';
            });
        }

        function goToMain(e) {
            e.preventDefault();

            $state.go('main');
        };

        function goToSalon(salon) {
            $state.go('salon', { salonId: salon.Id });
        };

        function goToSalonDirection(salon) {
            lookupApiFactory.logGoToCompany(salon.Id, appFactory.User.DeviceId);

            if (!window.device) {
                salonDirectionFactory.salon = salon;

                return $state.go('salondirection', { salonId: salon.Id });
            }

            var platform = device.platform.toLowerCase();

            launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, function (isAvailable) {
                if (isAvailable) {
                    navigate(launchnavigator.APP.GOOGLE_MAPS, salon);
                }
                else if (platform == "android") {
                    launchnavigator.isAppAvailable(launchnavigator.APP.GEO, function (isAppAvailable) {
                        if (isAppAvailable) {
                            navigate(launchnavigator.APP.GEO, salon);
                        }
                        else {
                            salonDirectionFactory.salon = salon;

                            return $state.go('salondirection', { salonId: salon.Id });
                        }
                    });
                }
                else if (platform == "ios") {
                    launchnavigator.isAppAvailable(launchnavigator.APP.APPLE_MAPS, function (isAppAvailable) {
                        if (isAppAvailable) {
                            navigate(launchnavigator.APP.APPLE_MAPS, salon);
                        }
                        else {
                            salonDirectionFactory.salon = salon;

                            return $state.go('salondirection', { salonId: salon.Id });
                        }
                    });
                }
            });
        };

        function navigate(navigatorApp, salon) {
            navigator.geolocation.getCurrentPosition(function (position) {
                app.NavigatorUtils.navigate(position.coords, { latitude: salon.PhysicalAddressLatitude, longitude: salon.PhysicalAddressLongitude }, navigatorApp);
            }, locationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });
        };

        function locationSuccess(position) {
            viewModel.SearchFilter.Latitude = appFactory.location.coords.latitude;
            viewModel.SearchFilter.Longitude = appFactory.location.coords.longitude;

            nextPage();
            lookupApiFactory.getSubCategories({ PageData: { IncludeAllData: true } }).then(function (data) {
                $rootScope.isLoading = false;
                viewModel.subCategories = data.Items;
            }, function () {
                $rootScope.isLoading = false;
            });
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

        function nextPage() {
            page = page + 1;
            viewModel.SearchFilter.PageData.Skip = viewModel.SearchFilter.PageData.Take * (page - 1);
            searchSalons();
        };

    };

})();