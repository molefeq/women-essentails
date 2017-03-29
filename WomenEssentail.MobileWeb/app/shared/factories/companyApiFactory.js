(function () {

    'use strict';

    angular.module('app').factory('companyApiFactory', companyApiFactory);

    companyApiFactory.$inject = ['$http', '$rootScope', '$q', 'ServerApiBaseUrl'];

    function companyApiFactory($http, $rootScope, $q, ServerApiBaseUrl) {
        var factory = {
            getCompanies: getCompanies,
            getCompany: getCompany
        }

        return factory;

        function getCompanies(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Company/GetCompanies',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Companies: data.Items, TotalCompanies: data.TotalItems });
            });

            return deferred.promise;
        };

        function getCompany(companyId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Company/FetchCompany/?companyId=' + companyId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Company: data.Item });
            });

            return deferred.promise;
        };
        
    };

})();