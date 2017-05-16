(function () {

    'use strict';

    angular.module('app').factory('utilsFactory', utilsFactory);

    utilsFactory.$inject = ['$http', '$q', 'appFactory'];

    function utilsFactory($http, $q, appFactory) {
        var factory = {
            stringToDate: stringToDate,
            getCurrentLocation: getCurrentLocation,
            getCurrentLocationAddress: getCurrentLocationAddress,
            switchOnGPSLocationServices: switchOnGPSLocationServices
        };

        return factory;

        function switchOnGPSLocationServices() {
            var deferred = $q.defer();

            if (!window.device) {
                navigator.permissions && navigator.permissions.query({ name: 'geolocation' }).then(function (PermissionStatus) {
                    if (PermissionStatus.state == 'granted') {
                        appFactory.isLocationServicesEnabled = true;
                        //allowed
                    } else {
                        appFactory.isLocationServicesEnabled = false;
                        //denied
                    }
                    deferred.resolve();
                })
                return deferred.promise;
            }

            var deferred = $q.defer();

            cordova.plugins.diagnostic.isLocationAvailable(function (available) {
                if (!available) {
                    cordova.plugins.locationAccuracy.request(function () {
                        appFactory.isLocationServicesEnabled = true;
                        deferred.resolve();
                    }, function () {
                        appFactory.isLocationServicesEnabled = false;
                        deferred.resolve();
                    }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
                }
                else {
                    appFactory.isLocationServicesEnabled = true;
                    deferred.resolve();
                }
            }, function (error) {
                appFactory.isLocationServicesEnabled = false;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function getCurrentLocation() {
            var deferred = $q.defer();

            navigator.geolocation.getCurrentPosition(function (data) {
                appFactory.location = data.coords;
                deferred.resolve({ Position: data.coords });
            }, function () {
                getCurrentLocationUsingGoogleMaps(deferred).then(function (response) {
                    appFactory.location = response.Position;
                    deferred.resolve({ Position: response.Position });
                }, function () {
                    appFactory.location = null;
                    deferred.reject({
                        'ErrorCode': 408,
                        'ErrorHeader': 'Error retrieving location',
                        'ErrorDetails': 'Error retrieving location, please ensure that gps location is enabled.'
                    });
                });
            }, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });

            return deferred.promise;
        };

        function getCurrentLocationUsingGoogleMaps() {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB7Dp0M7lBi97YoSYlpgt_7IDCMeXEZBiQ"
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Position: { latitude: data.location.lat, longitude: data.location.lng } });
            });

            return deferred.promise;
        };

        function getCurrentLocationAddress(position) {
            var deferred = $q.defer();

            $http(
            {
                method: 'GET',
                url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.latitude + "," + position.longitude + "&key=AIzaSyAXNExX0Fa99nRDq8xAZv93oiL8MI-b-Ew",
            })
            .success(function (data, status, headers, config) {
                appFactory.locationAddress = data.results[0].formatted_address;
                deferred.resolve({ address: data.results[0].formatted_address });
            }, function () {
                appFactory.locationAddress = null;
                deferred.reject({
                    'ErrorCode': 408,
                    'ErrorHeader': 'Error retrieving location',
                    'ErrorDetails': 'Error retrieving location, please ensure that gps location is enabled.'
                });
            });

            return deferred.promise;
        };

        //function onRequestSuccess(success) {
        //    appFactory.isLocationServicesEnabled = true;
        //};

        //function onRequestFailure(error) {
        //    if (error) {
        //        if (error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
        //            if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
        //                cordova.plugins.diagnostic.switchToLocationSettings();
        //                appFactory.isLocationServicesEnabled = true;
        //                loadGoogleMapsApi();
        //            }
        //            else {
        //                appFactory.isLocationServicesEnabled = false;
        //                loadGoogleMapsApi();
        //            }
        //        }
        //    }
        //};

        function stringToDate(dateText) {
            if (!dateText) {
                return '';
            }

            if (dateText instanceof Date) {
                return dateText;
            }

            return new Date(getYear(dateText), getMonth(dateText), getDay(dateText));
        };

        function getYear(dateText) {
            var year = dateText.split('/')[2].split(' ')[0];
            return year;
        };

        function getMonth(dateText) {
            var month = dateText.split('/')[1];

            if (month > 0) {
                month = month - 1;
            }
            return month;
        };

        function getDay(dateText) {
            var day = dateText.split('/')[0];
            return day;
        };

        function getHours(dateText) {
            if (dateText.split('/')[2].split(' ').length == 1) {
                return 2;
            }

            var hours = dateText.split('/')[2].split(' ')[1].split(':')[0];
            return hours;
        };

        function getMinutes(dateText) {
            if (dateText.split('/')[2].split(' ').length == 1) {
                return 0;
            }
            var minutes = dateText.split('/')[2].split(' ')[1].split(':')[1];
            return minutes;
        };

        function getSeconds(dateText) {
            if (dateText.split('/')[2].split(' ').length == 1) {
                return 0;
            }
            var seconds = dateText.split('/')[2].split(' ')[1].split(':')[2];
            return seconds;
        };

        function getAddress(addressItems) {

        }
    };

})();