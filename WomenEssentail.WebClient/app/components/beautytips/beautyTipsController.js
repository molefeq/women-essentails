(function () {

    'use strict';

    angular.module('app').controller('beautyTipsController', BeautyTipsController);

    BeautyTipsController.$inject = ['$scope', '$rootScope', '$state', 'notificationFactory', 'beautyTipsFactory'];

    function BeautyTipsController($scope, $rootScope, $state, notificationFactory, beautyTipsFactory) {
        var viewModel = $scope;

        viewModel.beautyTipsFactory = beautyTipsFactory;
        viewModel.addBeuatyTip = addBeuatyTip;
        viewModel.editBeuatyTip = editBeuatyTip;
        viewModel.deleteBeuatyTip = deleteBeuatyTip;
        viewModel.searchBeuatyTips = searchBeuatyTips;
        viewModel.activateBeuatyTip = activateBeuatyTip;

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: ''
        };

        viewModel.beautyTipsGridOptions = {
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

                viewModel.beautyTipsFactory.searchBeuatyTips(viewModel.SearchFilter).then(function (response) {
                    viewModel.beautyTipsGrid.SetDataSource(response.BeautyTips, response.TotalBeautyTips);
                    $rootScope.isDataLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            viewModel.beautyTipsFactory.initialise().then(function () {
                viewModel.beautyTipsGrid.SetPage(null, 1);
            });
        });

        viewModel.$on('beuaty-tip-updated', function (event, data) {
            viewModel.beautyTipsGrid.SetPage(null, viewModel.beautyTipsGrid.Paging.PageIndex);
        });

        function searchBeuatyTips() {
            viewModel.beautyTipsGrid.SetPage(null, 1);
        };

        function addBeuatyTip() {
            var newScope = $rootScope.$new();
            newScope.actionType = 'CREATE';
            viewModel.beautyTipsFactory.beuatyTip = {};

            notificationFactory.open({
                templateUrl: 'beuatytiptemplate.html',
                scope: newScope,
                size: 'lg',
                controller: beuatyTipModalController
            });
        };

        function editBeuatyTip(beuatyTip) {
            viewModel.beautyTipsFactory.edit(beuatyTip.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'UPDATE';

                notificationFactory.open({
                    templateUrl: 'beuatytiptemplate.html',
                    scope: newScope,
                    size: 'lg',
                    controller: beuatyTipModalController
                });
            });
        };

        function deleteBeuatyTip(beuatyTip) {
            viewModel.beautyTipsFactory.edit(beuatyTip.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'DELETE';

                notificationFactory.open({
                    templateUrl: 'beuatytiptemplate.html',
                    scope: newScope,
                    size: 'sm',
                    controller: beuatyTipModalController
                });
            });
        }

        function activateBeuatyTip(beuatyTip) {
            viewModel.beautyTipsFactory.beuatyTip = beuatyTip;
            viewModel.beautyTipsFactory.actvate(beuatyTip).then(function (response) {
                viewModel.beautyTipsGrid.SetPage(null, 1);
            });
        }
    };

})();