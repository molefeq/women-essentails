(function () {

    'use strict';

    angular.module('app').controller('mainController', mainController);

    mainController.$inject = ['$scope', '$state', 'salonsFactory'];

    function mainController($scope, $state, salonsFactory) {
        var viewModel = $scope

        viewModel.goToSalons = goToSalons;
        viewModel.goToPromotions = goToPromotions;
        viewModel.SearchFilter = {};
        viewModel.searchSalons = searchSalons;

        function goToSalons(e) {
            e.preventDefault();

            salonsFactory.searchFilter = {};

            $state.go('salons');
        };

        function goToPromotions(e) {
            e.preventDefault();

            $state.go('promotionproducts');
        };

        function searchSalons() {
            salonsFactory.searchFilter = {
                SearchText: viewModel.SearchFilter.SearchText
            };

            $state.go('salons');
        };
    };

})();