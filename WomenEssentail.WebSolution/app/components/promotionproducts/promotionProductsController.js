(function () {

    'use strict';

    angular.module('app').controller('promotionProductsController', promotionProductsController);

    promotionProductsController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'notificationFactory', 'promotionProductsFactory'];

    function promotionProductsController($scope, $rootScope, $state, $stateParams, notificationFactory, promotionProductsFactory) {
        var viewModel = $scope;
        var productId = $stateParams.productId;

        viewModel.promotionProductsFactory = promotionProductsFactory;
        viewModel.addPromotionProduct = addPromotionProduct;
        viewModel.editPromotionProduct = editPromotionProduct;
        viewModel.deletePromotionProduct = deletePromotionProduct;
        viewModel.searchPromotionProducts = searchPromotionProducts;
        viewModel.goHome = goHome;
        viewModel.goToSalons = goToSalons;
        viewModel.goToProducts = goToProducts;

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: '',
            ProductId: {}
        };

        viewModel.promotionProductsGridOptions = {
            Paging: {
                PageIndex: 1,
                PageSize: 5
            },
            PageSizes: [30, 40, 60, 90, 100],
            Read: function (options) {
                var that = this;

                $rootScope.isLoading = true;
                $rootScope.loadingMessage = 'Loading data, please wait ...';

                viewModel.SearchFilter.PageData.Take = options.take;
                viewModel.SearchFilter.PageData.Skip = options.skip;

                viewModel.promotionProductsFactory.searchPromotionProducts(viewModel.SearchFilter).then(function (response) {
                    viewModel.promotionProductsGrid.SetDataSource(response.PromotionProducts, response.TotalPromotionProducts);
                    $rootScope.isLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            viewModel.promotionProductsFactory.initialise(productId).then(function () {
                viewModel.SearchFilter.ProductId = viewModel.promotionProductsFactory.product.Id;
                viewModel.promotionProductsGrid.SetPage(null, 1);
            });
        });

        viewModel.$on('promotion-product-updated', function (event, data) {
            viewModel.promotionProductsGrid.SetPage(null, viewModel.promotionProductsGrid.Paging.PageIndex);
        });

        function searchPromotionProducts() {
            viewModel.promotionProductsGrid.SetPage(null, 1);
        };

        function addPromotionProduct() {
            var newScope = $rootScope.$new();
            newScope.actionType = 'CREATE';
            viewModel.promotionProductsFactory.promotionProduct = { ProductId: promotionProductsFactory.product.Id };

            notificationFactory.open({
                templateUrl: 'promotionproducttemplate.html',
                scope: newScope,
                size: 'lg',
                controller: promotionProductModalController
            });
        };

        function editPromotionProduct(promotionProduct) {
            viewModel.promotionProductsFactory.edit(promotionProduct.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'UPDATE';

                notificationFactory.open({
                    templateUrl: 'promotionproducttemplate.html',
                    scope: newScope,
                    size: 'lg',
                    controller: promotionProductModalController
                });
            });
        };

        function deletePromotionProduct(promotionProduct) {
            viewModel.promotionProductsFactory.edit(promotionProduct.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'DELETE';

                notificationFactory.open({
                    templateUrl: 'promotionproducttemplate.html',
                    scope: newScope,
                    size: 'sm',
                    controller: promotionProductModalController
                });
            });
        }

        function goHome(e) {
            e.preventDefault();

            $state.go('home');
        };

        function goToProducts(e) {
            e.preventDefault();

            $state.go('products', { salonId: viewModel.promotionProductsFactory.product.CompanyId });
        };

        function goToSalons(e) {
            e.preventDefault();

            $state.go('salons');
        };
    };

})();