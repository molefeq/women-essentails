(function () {

    'use strict';

    angular.module('app').controller('salonsController', SalonsController);

    SalonsController.$inject = ['$scope', '$rootScope', '$state', 'notificationFactory', 'salonsFactory'];

    function SalonsController($scope, $rootScope, $state, notificationFactory, salonsFactory) {
        var viewModel = $scope;

        viewModel.salonsFactory = salonsFactory;
        viewModel.addSalon = addSalon;
        viewModel.editSalon = editSalon;
        viewModel.deleteSalon = deleteSalon;
        viewModel.searchSalons = searchSalons;
        viewModel.goToProducts = goToProducts;
        viewModel.goToUsers = goToUsers;
        viewModel.goHome = goHome;
        viewModel.activateSalons = activateSalons;
        viewModel.deactivateSalons = deactivateSalons;
        viewModel.deleteSalons = deleteSalons;

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: ''
        };

        viewModel.salonsGridOptions = {
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

                viewModel.salonsFactory.searchSalons(viewModel.SearchFilter).then(function (response) {
                    viewModel.salonsGrid.SetDataSource(response.Salons, response.TotalSalons);
                    $rootScope.isLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            viewModel.salonsFactory.initialise().then(function () {
                viewModel.salonsGrid.SetPage(null, 1);
            });
        });

        viewModel.$on('salon-updated', function (event, data) {
            viewModel.salonsGrid.SetPage(null, viewModel.salonsGrid.Paging.PageIndex);
        });

        function searchSalons() {
            viewModel.salonsGrid.SetPage(null, 1);
        };

        function addSalon() {
            var newScope = $rootScope.$new();
            newScope.actionType = 'CREATE';
            viewModel.salonsFactory.salon = { CompanyTypeId: salonsFactory.companyTypeId };

            notificationFactory.open({
                templateUrl: 'salontemplate.html',
                scope: newScope,
                size: 'lg',
                controller: salonModalController
            });
        };

        function editSalon(salon) {
            viewModel.salonsFactory.edit(salon.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'UPDATE';

                notificationFactory.open({
                    templateUrl: 'salontemplate.html',
                    scope: newScope,
                    size: 'lg',
                    controller: salonModalController
                });
            });
        };

        function deleteSalon(salon) {
            viewModel.salonsFactory.edit(salon.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'DELETE';

                notificationFactory.open({
                    templateUrl: 'salontemplate.html',
                    scope: newScope,
                    size: 'sm',
                    controller: salonModalController
                });
            });
        }

        function goHome(e) {
            e.preventDefault();

            $state.go('home');
        };

        function goToProducts(salon) {
            $state.go('products', { salonId: salon.Id });
        };

        function goToUsers(salon) {
            $state.go('companyusers', { companyId: salon.Id });
        };

        function activateSalons() {
            if (!viewModel.salonsFactory.selectedSalons || viewModel.salonsFactory.selectedSalons.length == 0) {
                return;
            };

            $rootScope.isLoading = true;
            $rootScope.loadingMessage = 'Activating salons, please wait ...';

            viewModel.salonsFactory.activateSalons().then(function () {
                viewModel.salonsGrid.SetPage(null, 1);
            }, function () {
                $rootScope.isLoading = false;
                var newScope = $rootScope.$new();

                newScope.model = {
                    'ErrorCode': "404",
                    'ErrorHeader': "Error Activating Salons",
                    'ErrorDetails': "An error occurred while activating salons.",
                };

                $rootScope.$broadcast('server-error-occurred', {
                    templateUrl: 'errortemplate.html',
                    scope: newScope,
                    size: 'sm'
                });
            });
        };

        function deactivateSalons() {
            if (!viewModel.salonsFactory.selectedSalons || viewModel.salonsFactory.selectedSalons.length == 0) {
                return;
            };

            $rootScope.isLoading = true;
            $rootScope.loadingMessage = 'Deactivating salons, please wait ...';
            viewModel.salonsFactory.deactivateSalons().then(function () {
                viewModel.salonsGrid.SetPage(null, 1);
            }, function () {
                $rootScope.isLoading = false;
                var newScope = $rootScope.$new();

                newScope.model = {
                    'ErrorCode': "404",
                    'ErrorHeader': "Error Activating Salons",
                    'ErrorDetails': "An error occurred while activating salons.",
                };

                $rootScope.$broadcast('server-error-occurred', {
                    templateUrl: 'errortemplate.html',
                    scope: newScope,
                    size: 'sm'
                });
            });
        };

        function deleteSalons() {
            if (!viewModel.salonsFactory.selectedSalons || viewModel.salonsFactory.selectedSalons.length == 0) {
                return;
            };

            $rootScope.isLoading = true;
            $rootScope.loadingMessage = 'Deleting salons, please wait ...';
            viewModel.salonsFactory.deleteSalons().then(function () {
                viewModel.salonsGrid.SetPage(null, 1);
            }, function () {
                $rootScope.isLoading = false;
                var newScope = $rootScope.$new();

                newScope.model = {
                    'ErrorCode': "404",
                    'ErrorHeader': "Error Deleting Salons",
                    'ErrorDetails': "An error occurred while activating salons.",
                };

                $rootScope.$broadcast('server-error-occurred', {
                    templateUrl: 'errortemplate.html',
                    scope: newScope,
                    size: 'sm'
                });
            });
        };
    };

})();