(function () {

    'use strict';

    angular.module('app').controller('salonsController', SalonsController);

    SalonsController.$inject = ['$scope', '$rootScope', '$state', 'salonsFactory'];

    function SalonsController($scope, $rootScope, $state, salonsFactory) {
        var viewModel = $scope;

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
            SearchText: ''
        };

        searchSalons();

        function searchSalons() {
            viewModel.salonsFactory.searchSalons(viewModel.SearchFilter).then(function (response) {
                $rootScope.isDataLoading = false;
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
            $state.go('salondirection', { salonId: salon.Id });
        };
    };

})();