﻿(function () {

    'use strict';

    angular.module('app').controller('promotionProductsController', promotionProductsController);

    promotionProductsController.$inject = ['$scope', '$state', '$rootScope', 'productApiFactory', 'salonsFactory', 'geolocation', 'lookupApiFactory'];

    function promotionProductsController($scope, $state, $rootScope, productApiFactory, salonsFactory, geolocation, lookupApiFactory) {
        var viewModel = $scope

        viewModel.searchPromotionProducts = searchPromotionProducts;
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

        viewModel.promotionProductsGridOptions = {
            Paging: {
                PageIndex: 1,
                PageSize: 30
            },
            PageSizes: [30, 40, 60, 90, 100],
            Read: function (options) {
                var that = this;

                $rootScope.isDataLoading = true;
                $rootScope.loadingMessage = 'Loading data, please wait ...';

                viewModel.SearchFilter.PageData.Take = options.take;
                viewModel.SearchFilter.PageData.Skip = options.skip;

                productApiFactory.getPromotionProducts(viewModel.SearchFilter).then(function (response) {
                    viewModel.promotionProductsGrid.SetDataSource(response.PromotionProducts, response.TotalPromotionProducts);
                    $rootScope.isDataLoading = false;
                });
            }
        };

        $rootScope.isLoading = true;

        geolocation.getLocation().then(function (data) {
            $rootScope.isLoading = false;
            viewModel.SearchFilter.Latitude = data.coords.latitude;
            viewModel.SearchFilter.Longitude = data.coords.longitude;
            lookupApiFactory.getSubCategories({ PageData: { IncludeAllData: true } }).then(function (response) {
                viewModel.subCategories = response.Items;

                productApiFactory.getPromotionProducts(viewModel.SearchFilter).then(function (response) {
                    viewModel.promotions = response.PromotionProducts
                    $rootScope.isDataLoading = false;
                });
            });
        });

        function searchPromotionProducts() {
            viewModel.promotionProductsGrid.SetPage(null, 1);
        };

        function goToSalonDirection(salonId) {
            $state.go('salondirection', { salonId: salonId });
        };
    };

})();