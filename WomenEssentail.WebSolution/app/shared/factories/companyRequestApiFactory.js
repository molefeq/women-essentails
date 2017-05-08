(function () {

    'use strict';

    angular.module('app').factory('companyRequestApiFactory', companyRequestApiFactory);

    companyRequestApiFactory.$inject = ['$http', '$rootScope', '$q', '$upload', 'ServerApiBaseUrl'];

    function companyRequestApiFactory($http, $rootScope, $q, $upload, ServerApiBaseUrl) {
        var factory = {
            getCompanyRequests: getCompanyRequests,
            addCompanyRequest: addCompanyRequest,
            updateCompanyRequest: updateCompanyRequest
        };

        return factory;

        function getCompanyRequests(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/CompanyRequest/GetCompanyRequests',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ CompanyRequests: data.Items, TotalCompanyRequests: data.TotalItems });
            });

            return deferred.promise;
        };

        function addCompanyRequest(companyRequest) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/CompanyRequest/AddCompanyRequest',
                data: companyRequest
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ CompanyRequest: data.Item });
            });

            return deferred.promise;
        };

        function updateCompanyRequest(companyRequest) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/CompanyRequest/UpdateCompanyRequest',
                data: companyRequest
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ CompanyRequest: data.Item });
            });

            return deferred.promise;
        };
    };

})();