(function () {

    'use strict';

    angular.module('app').controller('searchSalonController', searchSalonController);

    searchSalonController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'searchSalonFactory'];

    function searchSalonController($scope, $rootScope, $state, $stateParams, searchSalonFactory) {
        var viewModel = $scope;
        var salonId = $stateParams.salonId

        viewModel.isLoading = false;
        viewModel.goToSalonDirections = goToSalonDirections;
        viewModel.searchSalonFactory = searchSalonFactory;

        viewModel.searchSalonFactory.initialise(salonId).then(function () {
            viewModel.isLoading = false;
        });

        function goToSalonDirections() {
            $state.go('searchsalondirections', { salonId: viewModel.searchSalonFactory.salon.Id });
        };
    };

})();