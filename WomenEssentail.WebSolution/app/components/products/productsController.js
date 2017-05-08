(function () {

    'use strict';

    angular.module('app').controller('productsController', productsController);

    productsController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'notificationFactory', 'productsFactory', 'appFactory'];

    function productsController($scope, $rootScope, $state, $stateParams, notificationFactory, productsFactory, appFactory) {
        var viewModel = $scope;

        appFactory.Initialise();

        var companyId = $stateParams.salonId ? $stateParams.salonId : appFactory.User.CompanyId;

        viewModel.productsFactory = productsFactory;
        viewModel.addProduct = addProduct;
        viewModel.editProduct = editProduct;
        viewModel.deleteProduct = deleteProduct;
        viewModel.searchProducts = searchProducts;
        viewModel.goHome = goHome;
        viewModel.goToSalons = goToSalons;
        viewModel.goToPromotions = goToPromotions;

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: '',
            CompanyId: {}
        };

        viewModel.productsGridOptions = {
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

                viewModel.productsFactory.searchProducts(viewModel.SearchFilter).then(function (response) {
                    viewModel.productsGrid.SetDataSource(response.Products, response.TotalProducts);
                    $rootScope.isLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            viewModel.productsFactory.initialise(companyId).then(function () {
                viewModel.SearchFilter.CompanyId = viewModel.productsFactory.salon.Id;
                viewModel.productsGrid.SetPage(null, 1);
            });
        });

        viewModel.$on('product-updated', function (event, data) {
            viewModel.productsGrid.SetPage(null, viewModel.productsGrid.Paging.PageIndex);
        });

        function searchProducts() {
            viewModel.productsGrid.SetPage(null, 1);
        };

        function addProduct() {
            var newScope = $rootScope.$new();
            newScope.actionType = 'CREATE';
            viewModel.productsFactory.product = { CompanyId: productsFactory.salon.Id };

            notificationFactory.open({
                templateUrl: 'producttemplate.html',
                scope: newScope,
                size: 'md',
                controller: productModalController
            });
        };

        function editProduct(product) {
            viewModel.productsFactory.edit(product.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'UPDATE';

                notificationFactory.open({
                    templateUrl: 'producttemplate.html',
                    scope: newScope,
                    size: 'md',
                    controller: productModalController
                });
            });
        };

        function deleteProduct(product) {
            viewModel.productsFactory.edit(product.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'DELETE';

                notificationFactory.open({
                    templateUrl: 'producttemplate.html',
                    scope: newScope,
                    size: 'sm',
                    controller: productModalController
                });
            });
        };

        function goHome(e) {
            e.preventDefault();

            $state.go('home');
        };

        function goToSalons(e) {
            e.preventDefault();

            $state.go('salons');
        };

        function goToPromotions(product) {
            $state.go('promotionproducts', { productId: product.Id });
        };
    };

})();