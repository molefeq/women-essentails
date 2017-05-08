(function () {

    'use strict';

    angular.module('app').controller('searchBeautyTipsController', searchBeautyTipsController);

    searchBeautyTipsController.$inject = ['$scope', '$rootScope', '$state', 'beautyTipApiFactory'];

    function searchBeautyTipsController($scope, $rootScope, $state, beautyTipApiFactory) {
        var viewModel = $scope;

        viewModel.isLoading = false;
        viewModel.searchBeautyTips = searchBeautyTips;

        viewModel.SearchFilter = {
            StatusCode: 'ACTIVE',
            PageData: {
                Take: 30,
                Skip: 0,
                SortColumn: 'CreateDate',
                SortOrder: 2
            },
            SearchText: ''
        };

        viewModel.beautyTipsGridOptions = {
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

                beautyTipApiFactory.getBeautyTips(viewModel.SearchFilter).then(function (response) {
                    viewModel.beautyTipsGrid.SetDataSource(response.BeautyTips, response.TotalBeautyTips);
                    $rootScope.isLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            viewModel.beautyTipsGrid = data.grid;
            viewModel.beautyTipsGrid.SetPage(null, 1);
        });

        function searchBeautyTips() {
            viewModel.beautyTipsGrid.SetPage(null, 1);
        };

    };

})();