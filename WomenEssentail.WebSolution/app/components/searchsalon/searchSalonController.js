(function () {

    'use strict';

    angular.module('app').controller('searchSalonController', searchSalonController);

    searchSalonController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'searchSalonFactory'];

    function searchSalonController($scope, $rootScope, $state, $stateParams, searchSalonFactory) {
        var viewModel = $scope;
        var salonId = $stateParams.salonId

        $rootScope.isLoading = true;
        $rootScope.loadingMessage = 'Loading data, please wait ...';
        viewModel.goToSalonDirections = goToSalonDirections;
        viewModel.searchSalonFactory = searchSalonFactory;

        viewModel.searchSalonFactory.initialise(salonId).then(function () {
            $rootScope.isLoading = false;
        });

        function goToSalonDirections() {
            $state.go('searchsalondirections', { salonId: viewModel.searchSalonFactory.salon.Id });
        };
    };

})();