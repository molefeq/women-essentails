(function () {

    'use strict';

    angular.module('app').factory('dashboardApiFactory', dashboardApiFactory);

    dashboardApiFactory.$inject = ['$http', '$rootScope', '$q', 'ServerApiBaseUrl'];

    function dashboardApiFactory($http, $rootScope, $q, ServerApiBaseUrl) {
        var factory = {
            getData: getData
        };

        return factory;

        function getData() {
            var deferred = $q.defer();

            $http(
            {
                method: 'GET',
                url: ServerApiBaseUrl + 'Dashboard/GetData'
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Dashboard: data });
            });

            return deferred.promise;
        };
    };

})();