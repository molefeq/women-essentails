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

        $rootScope.isLoading = true;
        viewModel.ViewType = 'Map';
        viewModel.salonDirectionFactory = salonDirectionFactory;
        viewModel.goToSalons = goToSalons;
        viewModel.showList = false;

        geolocation.getLocation().then(function (data) {
            $scope.map.center = {
                latitude: data.coords.latitude,
                longitude: data.coords.longitude
            };

            viewModel.showList = false;
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
                        viewModel.showList = true;
                        $rootScope.isLoading = false;
                    } else {
                        alert('Google route unsuccesfull!');
                        $rootScope.isLoading = false;
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