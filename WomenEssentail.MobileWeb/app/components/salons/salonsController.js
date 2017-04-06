(function () {

    'use strict';

    angular.module('app').controller('salonsController', SalonsController);

    SalonsController.$inject = ['$scope', '$rootScope', '$state', 'geolocation', 'salonsFactory', 'salonDirectionFactory', 'lookupApiFactory'];

    function SalonsController($scope, $rootScope, $state, geolocation, salonsFactory, salonDirectionFactory, lookupApiFactory) {
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
            geolocation.getLocation().then(function (data) {
                viewModel.SearchFilter.Latitude = data.coords.latitude;
                viewModel.SearchFilter.Longitude = data.coords.longitude;


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
            });
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
    };

})();