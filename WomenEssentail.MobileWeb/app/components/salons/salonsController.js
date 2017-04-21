(function () {

    'use strict';

    angular.module('app').controller('salonsController', SalonsController);

    SalonsController.$inject = ['$scope', '$rootScope', '$state', 'salonsFactory', 'salonDirectionFactory', 'lookupApiFactory', 'notificationFactory'];

    function SalonsController($scope, $rootScope, $state, salonsFactory, salonDirectionFactory, lookupApiFactory, notificationFactory) {
        var viewModel = $scope;

        $rootScope.isLoading = false;
        viewModel.salonsFactory = salonsFactory;
        viewModel.searchSalons = searchSalons;
        viewModel.goToSalon = goToSalon;
        viewModel.goToMain = goToMain;
        viewModel.goToSalonDirection = goToSalonDirection;
        viewModel.subCategories = [];

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: salonsFactory.searchFilter.SearchText,
            SubCategoryId: salonsFactory.searchFilter.SubCategoryId,
            IsLocationSearch: true
        };

        searchSalons();

        function searchSalons() {
            $rootScope.isLoading = true;

            navigator.geolocation.getCurrentPosition(locationSuccess, locationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });
        };

        function goToMain(e) {
            e.preventDefault();

            $state.go('main');
        };

        function goToSalon(salon) {
            $state.go('salon', { salonId: salon.Id });
        };

        function goToSalonDirection(salon) {
            salonDirectionFactory.salon = salon;
            $state.go('salondirection', { salonId: salon.Id });
        };

        function locationSuccess(position) {
            viewModel.SearchFilter.Latitude = position.coords.latitude;
            viewModel.SearchFilter.Longitude = position.coords.longitude;

            lookupApiFactory.getSubCategories({ PageData: { IncludeAllData: true } }).then(function (data) {
                viewModel.subCategories = data.Items;
                viewModel.salonsFactory.searchSalons(viewModel.SearchFilter).then(function (response) {
                    $rootScope.isLoading = false;
                }, function () {
                    $rootScope.isLoading = false;
                });
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
    };

})();