(function () {

    'use strict';

    angular.module('app').controller('salonDirectionController', salonDirectionController);

    salonDirectionController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'salonDirectionFactory', 'notificationFactory'];

    function salonDirectionController($scope, $rootScope, $state, $stateParams, salonDirectionFactory, notificationFactory) {
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

        navigator.geolocation.getCurrentPosition(locationSuccess, locationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });

        function locationSuccess(position) {
            $scope.map.center = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
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
                        var newScope = $rootScope.$new();

                        newScope.model = {
                            'ErrorCode': 408,
                            'ErrorHeader': 'Error retrieving route',
                            'ErrorDetails': 'Error retrieving route, please ensure that gps location is enabled.'
                        };

                        notificationFactory.open({
                            templateUrl: 'errortemplate.html',
                            scope: newScope,
                            size: 'sm',
                            controller: errorController
                        });
                        $rootScope.isLoading = false;
                    }
                });
            });
        };

        function locationError(error) {
            var newScope = $rootScope.$new();

            newScope.model = {
                'ErrorCode': 408,
                'ErrorHeader': 'Error retrieving location',
                'ErrorDetails': 'Error retrieving location, please ensure that gps location is enabled. ' + 'Error Code: ' + error.code + 'Error Message: ' + error.message
            };

            notificationFactory.open({
                templateUrl: 'errortemplate.html',
                scope: newScope,
                size: 'sm',
                controller: errorController
            });
        };

        function goToSalons(e) {
            e.preventDefault();

            $state.go('salons');
        };
    };

})();