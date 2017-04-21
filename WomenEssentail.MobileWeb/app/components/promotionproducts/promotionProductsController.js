(function () {

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

        navigator.geolocation.getCurrentPosition(function (position) {
            $rootScope.isLoading = false;
            viewModel.SearchFilter.Latitude = position.coords.latitude;
            viewModel.SearchFilter.Longitude = position.coords.longitude;
            lookupApiFactory.getSubCategories({ PageData: { IncludeAllData: true } }).then(function (response) {
                viewModel.subCategories = response.Items;

                productApiFactory.getPromotionProducts(viewModel.SearchFilter).then(function (response) {
                    viewModel.promotions = response.PromotionProducts
                    $rootScope.isDataLoading = false;
                });
            });
        }, function (error) {
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
        }, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });

        function searchPromotionProducts() {
            viewModel.promotionProductsGrid.SetPage(null, 1);
        };

        function goToSalonDirection(salonId) {
            $state.go('salondirection', { salonId: salonId });
        };
    };

})();