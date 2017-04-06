(function () {

    'use strict';

    angular.module('app').controller('homeController', HomeController);

    HomeController.$inject = ['$scope', '$state'];

    function HomeController($scope, $state) {
        var viewModel = $scope
              
        viewModel.goToMain = goToMain;

        function goToMain() {
            $state.go('main');
        };
    };

})();