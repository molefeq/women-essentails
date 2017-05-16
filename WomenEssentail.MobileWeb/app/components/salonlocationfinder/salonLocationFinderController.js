(function () {

    'use strict';

    angular.module('app').controller('salonLocationFinderController', SalonLocationFinderController);

    SalonLocationFinderController.$inject = ['$scope', '$state', '$rootScope'];

    function SalonLocationFinderController($scope, $state, $rootScope) {
        var viewModel = $scope;
        
        viewModel.$on('google-map-place-updated', function (event, data) {
            console.log(data);
        });

    };

})();