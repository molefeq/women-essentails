(function () {

    'use strict';

    angular.module('app').controller('mainController', mainController);

    mainController.$inject = ['$scope', '$state'];

    function mainController($scope, $state) {
        var viewModel = $scope

        viewModel.goToSalons = goToSalons;
        
        function goToSalons() {
            $state.go('salons');
        };
    };

})();