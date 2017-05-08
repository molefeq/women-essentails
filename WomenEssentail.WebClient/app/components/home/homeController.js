(function () {

    'use strict';

    angular.module('app').controller('homeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope', '$state', 'appFactory', 'dashboardApiFactory'];

    function HomeController($scope, $rootScope, $state, appFactory, dashboardApiFactory) {
        var viewModel = $scope;

        viewModel.model = {};
        viewModel.goToSalons = goToSalons;
        viewModel.goToProducts = goToProducts;
        viewModel.goToUsers = goToUsers;
        viewModel.goToRequests = goToRequests;

        initialise();

        function goToSalons(e) {
            e.preventDefault();

            $state.go('salons');
        };

        function initialise() {
            $rootScope.isLoading = true;
            $rootScope.loadingMessage = 'Loading data, please wait ...';

            dashboardApiFactory.getData().then(function (data) {
                viewModel.model = data.Dashboard;
                $rootScope.isLoading = false;
            });
        }
        function goToProducts(salon) {
            $state.go('products', { salonId: salon.Id });
        };

        function goToUsers(salon) {
            $state.go('companyusers', { companyId: salon.Id });
        };
        function goToRequests(e) {
            e.preventDefault();

            $state.go('salonrequests');
        };
    };

})();