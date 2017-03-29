(function () {

    'use strict';

    angular.module('app').controller('salonDirectionController', salonDirectionController);

    salonDirectionController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'geolocation', 'salonDirectionFactory'];

    function salonDirectionController($scope, $rootScope, $state, $stateParams, geolocation, salonDirectionFactory) {
        var viewModel = $scope;
        var salonId = $stateParams.salonId;

        $scope.map = {
            control: {},
            center: {
                latitude: -26.1706755,
                longitude: 28.0483971
            },
            zoom: 14
        };
        
        viewModel.isLoading = true;
        viewModel.salonDirectionFactory = salonDirectionFactory;
        viewModel.goToSalons = goToSalons;

        geolocation.getLocation().then(function (data) {
            $scope.map.center = {
                latitude: data.coords.latitude,
                longitude: data.coords.longitude
            };

            viewModel.salonDirectionFactory.initialise(salonId).then(function () {
                var directionsDisplay = new google.maps.DirectionsRenderer();
                var directionsService = new google.maps.DirectionsService();
                var geocoder = new google.maps.Geocoder();

                var directions = {
                    origin: {
                        lat: viewModel.map.center.latitude,
                        lng: viewModel.map.center.longitude
                    },
                    destination: {
                        lat: Number(viewModel.salonDirectionFactory.salon.PhysicalAddressLatitude),
                        lng: Number(viewModel.salonDirectionFactory.salon.PhysicalAddressLongitude)
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
                        viewModel.isLoading = false;
                    } else {
                        alert('Google route unsuccesfull!');
                    }
                });
            });
        });

        function goToSalons(e) {
            e.preventDefault();

            $state.go('salons');
        };
    };

})();