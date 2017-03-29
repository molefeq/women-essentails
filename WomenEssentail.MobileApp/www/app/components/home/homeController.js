(function () {

    'use strict';

    angular.module('app').controller('homeController', HomeController);

    HomeController.$inject = ['$scope', '$state', '$timeout'];

    function HomeController($scope, $state, $timeout) {
        var viewModel = $scope

        var viewModel = $scope;

        $scope.map = {
            control: {},
            center: {
                latitude: -26.1706755,
                longitude: 28.0483971
            },
            zoom: 14
        };

        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();

        var geocoder = new google.maps.Geocoder();
        var directions = {
            origin: {
                lat: -26.1706755,
                lng: 28.0483971
            },
            destination: {
                lat: -26.017833,
                lng: 27.935051
            },
            showList: false
        };
        var request = {
            origin: directions.origin,
            destination: directions.destination,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap($scope.map.control.getGMap());
                directionsDisplay.setPanel(document.getElementById('directionsList'));
                $scope.showList = true;
            } else {
                alert('Google route unsuccesfull!');
            }
        });

        //viewModel.goToMain = goToMain;

        //function goToMain() {
        //    $state.go('main');
        //};
    };

})();