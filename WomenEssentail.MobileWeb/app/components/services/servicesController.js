(function () {

    'use strict';

    angular.module('app').controller('servicesController', servicesController);

    servicesController.$inject = ['$scope', '$rootScope', '$state', 'lookupApiFactory', 'salonsFactory'];

    function servicesController($scope, $rootScope, $state, lookupApiFactory, salonsFactory) {
        var viewModel = $scope

        viewModel.subCategories = [];
        viewModel.SearchFilter = {};
        viewModel.searchSalons = searchSalons;
        viewModel.searchServiceSalons = searchServiceSalons;

        $rootScope.isLoading = true;
        $rootScope.loadingMessage = 'Loading Services ...';

        lookupApiFactory.getSubCategories({ PageData: { IncludeAllData: true } }).then(function (data) {
            viewModel.subCategories = data.Items;
            $rootScope.isLoading = false;
        });

        function searchSalons() {
            salonsFactory.searchFilter = {
                SearchText: viewModel.SearchFilter.SearchText,
            };

            $state.go('salons');
        };

        function searchServiceSalons(e, subCategoryId) {
            e.preventDefault();

            salonsFactory.searchFilter = {
                SearchText: viewModel.SearchFilter.SearchText,
                SubCategoryId: subCategoryId
            };

            $state.go('salons');
        };
    };

})();