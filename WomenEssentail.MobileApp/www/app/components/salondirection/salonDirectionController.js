(function () {

    'use strict';

    angular.module('app').controller('salonDirectionController', salonDirectionController);

    salonDirectionController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'salonDirectionFactory'];

    function salonDirectionController($scope, $rootScope, $state, $stateParams, salonDirectionFactory) {
        var viewModel = $scope;
        var salonId = $stateParams.salonId

        $scope.map = {
            control: {},
            center: {
                latitude: -26.1706755,
                longitude: 28.0483971
            },
            zoom: 14
        };

        viewModel.salonDirectionFactory = salonDirectionFactory;

        viewModel.salonDirectionFactory.initialise(salonId).then(function () {
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
        })

    };

})();