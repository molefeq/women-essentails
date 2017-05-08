(function () {

    'use strict';

    angular.module('app').controller('searchPromotionProductsController', searchPromotionProductsController);

    searchPromotionProductsController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'notificationFactory', 'promotionProductApiFactory', 'utilsFactory'];

    function searchPromotionProductsController($scope, $rootScope, $state, $stateParams, notificationFactory, promotionProductApiFactory, utilsFactory) {
        var viewModel = $scope;

        viewModel.isLoading = false;
        viewModel.searchSpecials = searchSpecials;
        viewModel.goToSalonDirection = goToSalonDirection;

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: ''
        };

        viewModel.specialsGridOptions = {
            Paging: {
                PageIndex: 1,
                PageSize: 30
            },
            PageSizes: [30, 40, 60, 90, 100],
            Read: function (options) {
                var that = this;

                $rootScope.isLoading = true;
                $rootScope.loadingMessage = 'Loading data, please wait ...';

                viewModel.SearchFilter.PageData.Take = options.take;
                viewModel.SearchFilter.PageData.Skip = options.skip;

                promotionProductApiFactory.getAppPromotionProducts(viewModel.SearchFilter).then(function (response) {
                    viewModel.specialsGrid.SetDataSource(response.PromotionProducts, response.TotalPromotionProducts);
                    $rootScope.isLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            utilsFactory.getCurrentLocation().then(function (data) {
                viewModel.SearchFilter.Latitude = data.Position.latitude;
                viewModel.SearchFilter.Longitude = data.Position.longitude;
                viewModel.specialsGrid.SetPage(null, 1);
            }, locationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });
        });

        function searchSpecials() {
            viewModel.specialsGrid.SetPage(null, 1);
        };

        function goToSalonDirection(salonId) {
            $state.go('searchsalondirections', { salonId: salonId });
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