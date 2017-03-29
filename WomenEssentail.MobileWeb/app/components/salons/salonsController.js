(function () {

    'use strict';

    angular.module('app').controller('salonsController', SalonsController);

    SalonsController.$inject = ['$scope', '$rootScope', '$state', 'geolocation', 'salonsFactory', 'salonDirectionFactory'];

    function SalonsController($scope, $rootScope, $state, geolocation, salonsFactory, salonDirectionFactory) {
        var viewModel = $scope;

        viewModel.isLoading = false;
        viewModel.salonsFactory = salonsFactory;
        viewModel.searchSalons = searchSalons;
        viewModel.goToSalon = goToSalon;
        viewModel.goToMain = goToMain;
        viewModel.goToSalonDirection = goToSalonDirection;

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: '',
            IsLocationSearch: true
        };

        searchSalons();

        function searchSalons() {
            viewModel.isLoading = true;
            geolocation.getLocation().then(function (data) {
                viewModel.SearchFilter.Latitude = data.coords.latitude;
                viewModel.SearchFilter.Longitude = data.coords.longitude;

                viewModel.salonsFactory.searchSalons(viewModel.SearchFilter).then(function (response) {
                    viewModel.isLoading = false;
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