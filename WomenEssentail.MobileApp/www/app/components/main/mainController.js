(function () {

    'use strict';

    angular.module('app').controller('mainController', mainController);

    mainController.$inject = ['$scope', '$state', 'lookupApiFactory', 'salonsFactory'];

    function mainController($scope, $state, lookupApiFactory, salonsFactory) {
        var viewModel = $scope

        viewModel.goToSalons = goToSalons;
        viewModel.goToPromotions = goToPromotions;
        viewModel.subCategories = [];
        viewModel.SearchFilter = {};
        viewModel.searchSalons = searchSalons;

        lookupApiFactory.getSubCategories({ PageData: { IncludeAllData: true } }).then(function (data) {
            viewModel.subCategories = data.Items;
        });

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
                SearchText: viewModel.SearchFilter.SearchText,
                SubCategoryId: viewModel.SearchFilter.SubCategoryId
            };

            $state.go('salons');
        };
    };

})();