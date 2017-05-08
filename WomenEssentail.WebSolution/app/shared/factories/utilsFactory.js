(function () {

    'use strict';

    angular.module('app').factory('utilsFactory', utilsFactory);


    utilsFactory.$inject = ['$http', '$q'];

    function utilsFactory($http, $q) {
        var factory = {
            stringToDate: stringToDate,
            getCurrentLocation: getCurrentLocation
        };

        return factory;

        function getCurrentLocation() {
            var deferred = $q.defer();

            navigator.geolocation.getCurrentPosition(function (data) {
                deferred.resolve({ Position: data.coords });
            }, function () {
                getCurrentLocationUsingGoogleMaps(deferred).then(function (response) {
                    deferred.resolve({ Position: response.Position });
                }, function () {
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
    };

})();