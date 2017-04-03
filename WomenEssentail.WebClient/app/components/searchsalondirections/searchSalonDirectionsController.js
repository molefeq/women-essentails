(function () {

    'use strict';

    angular.module('app').controller('searchSalonDirectionsController', searchSalonDirectionsController);

    searchSalonDirectionsController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'geolocation', 'companyApiFactory'];

    function searchSalonDirectionsController($scope, $rootScope, $state, $stateParams, geolocation, companyApiFactory) {
        var viewModel = $scope;
        var salonId = $stateParams.salonId;

        viewModel.isLoading = false;
        viewModel.salon = {};

        $scope.map = {
            control: {},
            center: {
                latitude: -26.1706755,
                longitude: 28.0483971
            },
            zoom: 14
        };

        geolocation.getLocation().then(function (data) {

            $scope.map.center = {
                latitude: data.coords.latitude,
                longitude: data.coords.longitude
            };

            companyApiFactory.getCompany(salonId).then(function (data) {
                viewModel.salon = data.Company;

                var directionsDisplay = new google.maps.DirectionsRenderer();
                var directionsService = new google.maps.DirectionsService();
                var geocoder = new google.maps.Geocoder();

                var directions = {
                    origin: {
                        lat: viewModel.map.center.latitude,
                        lng: viewModel.map.center.longitude
                    },
                    destination: {
                        lat: Number(viewModel.salon.PhysicalAddressLatitude),
                        lng: Number(viewModel.salon.PhysicalAddressLongitude)
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

    };

})();