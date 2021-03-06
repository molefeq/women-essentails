﻿(function () {

    'use strict';

    angular.module('app').controller('searchSalonsController', searchSalonsController);

    searchSalonsController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'geolocation', 'companyApiFactory', 'searchSalonsFactory'];

    function searchSalonsController($scope, $rootScope, $state, $stateParams, geolocation, companyApiFactory, searchSalonsFactory) {
        var viewModel = $scope;

        viewModel.isLoading = false;
        viewModel.searchSalons = searchSalons;
        viewModel.goToSalonDirection = goToSalonDirection;
        viewModel.viewSalon = viewSalon;
        viewModel.salons = [];

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: searchSalonsFactory.SearchText,
            SubCategoryId: searchSalonsFactory.SubCategoryId,
            IsLocationSearch: true
        };
        
        searchSalonsFactory.SearchText = '';
        searchSalonsFactory.SubCategoryId = {};

        viewModel.salonsGridOptions = {
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

                companyApiFactory.getAppCompanies(viewModel.SearchFilter).then(function (response) {
                    viewModel.salonsGrid.SetDataSource(response.Companies, response.TotalCompanies);
                    $rootScope.isLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            initialise();
        });

        function searchSalons() {
            viewModel.salonsGrid.SetPage(null, 1);
        };

        function initialise() {
            viewModel.isLoading = true;
            $rootScope.loadingMessage = 'Locating current location, please wait ...';
            geolocation.getLocation().then(function (data) {
                viewModel.SearchFilter.Latitude = data.coords.latitude;
                viewModel.SearchFilter.Longitude = data.coords.longitude;
                viewModel.isLoading = false;
                viewModel.salonsGrid.SetPage(null, 1);
            });
        };

        function goToSalonDirection(salon) {
            $state.go('searchsalondirections', { salonId: salon.Id });
        };

        function viewSalon(salon) {
            $state.go('searchsalon', { salonId: salon.Id });
        };
    };

})();