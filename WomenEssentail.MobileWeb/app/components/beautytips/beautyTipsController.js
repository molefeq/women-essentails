(function () {

    'use strict';

    angular.module('app').controller('beautyTipsController', beautyTipsController);

    beautyTipsController.$inject = ['$scope', '$rootScope', '$state', 'beautyTipsFactory'];

    function beautyTipsController($scope, $rootScope, $state, beautyTipsFactory) {
        var viewModel = $scope

        viewModel.beautyTipsFactory = beautyTipsFactory;
        viewModel.SearchFilter = {
            StatusCode: 'ACTIVE',
            PageData: {
                Take: 30,
                Skip: 0,
                SortColumn: 'CreateDate',
                SortOrder: 2
            }
        };
        viewModel.searchBeautyTips = searchBeautyTips;

        $rootScope.isLoading = true;
        $rootScope.loadingMessage = 'Loading Services ...';

        viewModel.beautyTipsFactory.initialise(viewModel.SearchFilter).then(function (data) {
            $rootScope.isLoading = false;
        })
        
        function searchBeautyTips() {
            viewModel.beautyTipsFactory.searchBeautyTips(viewModel.SearchFilter)
        };
    };

})();