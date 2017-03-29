(function () {

    'use strict';

    angular.module('app').controller('salonController', salonController);

    salonController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'salonFactory'];

    function salonController($scope, $rootScope, $state, $stateParams, salonFactory) {
        var viewModel = $scope;
        var salonId = $stateParams.salonId

        viewModel.salonFactory = salonFactory;
        viewModel.goToSalonDirections = goToSalonDirections;
        viewModel.goToSalons = goToSalons;
        viewModel.viewProducts = viewProducts;
        viewModel.products = [];
        viewModel.categoryName = '';
        viewModel.subCategoryName = '';
        viewModel.backToSubCategories = backToSubCategories;
        viewModel.isLoading = true;

        viewModel.salonFactory.initialise(salonId).then(function () {
            viewModel.isLoading = false;
        });

        function goToSalons(e) {
            e.preventDefault();

            $state.go('salons');
        };

        function goToSalonDirections() {
            $state.go('salondirection', { salonId: salonId });
        };

        function viewProducts(e, categoryName, subCategoryName, products) {
            e.preventDefault();

            viewModel.products = products;
            viewModel.categoryName = categoryName;
            viewModel.subCategoryName = subCategoryName;
        };

        function backToSubCategories() {
            viewModel.products = [];
            viewModel.categoryName = '';
            viewModel.subCategoryName = '';
        };
    };

})();