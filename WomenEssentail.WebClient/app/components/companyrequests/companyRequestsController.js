(function () {

    'use strict';

    angular.module('app').controller('companyRequestsController', companyRequestsController);

    companyRequestsController.$inject = ['$scope', '$rootScope', '$state', 'notificationFactory', 'salonsFactory', 'companyRequestApiFactory'];

    function companyRequestsController($scope, $rootScope, $state, notificationFactory, salonsFactory, companyRequestApiFactory) {
        var viewModel = $scope;

        viewModel.completeRequest = completeRequest;
        viewModel.declineRequest = declineRequest;
        viewModel.search = search;
        viewModel.goHome = goHome;
        viewModel.request = {};

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: ''
        };

        viewModel.requestsGridOptions = {
            Paging: {
                PageIndex: 1,
                PageSize: 5
            },
            PageSizes: [30, 40, 60, 90, 100],
            Read: function (options) {
                var that = this;

                $rootScope.isDataLoading = true;
                $rootScope.loadingMessage = 'Loading data, please wait ...';

                viewModel.SearchFilter.PageData.Take = options.take;
                viewModel.SearchFilter.PageData.Skip = options.skip;

                companyRequestApiFactory.getCompanyRequests(viewModel.SearchFilter).then(function (response) {
                    viewModel.requestsGrid.SetDataSource(response.CompanyRequests, response.TotalCompanyRequests);
                    $rootScope.isDataLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            salonsFactory.initialise().then(function () {
                viewModel.requestsGrid.SetPage(null, 1);
            });
        });

        viewModel.$on('salon-updated', function (event, data) {
            $rootScope.isDataLoading = true;
            viewModel.request.StatusCode = 'COMPLETED';

            companyRequestApiFactory.updateCompanyRequest(request).then(function (response) {
                $rootScope.isDataLoading = false;
                viewModel.request = {};
                search();
            });
        });

        function search() {
            viewModel.requestsGrid.SetPage(null, 1);
        };

        function completeRequest(request) {
            var newScope = $rootScope.$new();

            newScope.actionType = 'CREATE';
            viewModel.request = request;

            salonsFactory.salon = {
                CompanyTypeId: salonsFactory.companyTypeId,
                FirstName: request.FirstName,
                LastName: request.LastName,
                EmailAddress: request.EmailAddress
            };

            notificationFactory.open({
                templateUrl: 'salontemplate.html',
                scope: newScope,
                size: 'lg',
                controller: salonModalController
            });
        };

        function declineRequest(request) {
            $rootScope.isDataLoading = true;
            request.StatusCode = 'DECLINED';

            companyRequestApiFactory.updateCompanyRequest(request).then(function (response) {
                $rootScope.isDataLoading = false;
                viewModel.request = {};
                search();
            });
        };

        function goHome(e) {
            e.preventDefault();

            $state.go('home');
        };
    };

})();