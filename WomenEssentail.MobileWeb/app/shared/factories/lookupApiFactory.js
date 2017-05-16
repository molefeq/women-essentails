(function () {

    'use strict';

    angular.module('app').factory('lookupApiFactory', lookupApiFactory);

    lookupApiFactory.$inject = ['$http', '$q', 'ServerApiBaseUrl'];

    function lookupApiFactory($http, $q, ServerApiBaseUrl) {
        var factory = {
            getCompanyTypes: getCompanyTypes,
            getSubCategories: getSubCategories,
            getContactDetails: getContactDetails,
            saveDeviceDetails: saveDeviceDetails,
            logGoToCompany: logGoToCompany
        };

        return factory;

        function getCompanyTypes(searchFilter) {
            return getResultSet(searchFilter, ServerApiBaseUrl + 'Lookup/GetCompanTypes');
        };

        function getSubCategories(searchFilter) {
            return getResultSet(searchFilter, ServerApiBaseUrl + 'Lookup/GetSubCategories');
        };

        function getResultSet(searchFilter, url) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: url,
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            });

            return deferred.promise;
        };

        function getContactDetails() {
            var deferred = $q.defer();

            $http(
            {
                method: 'GET',
                url: ServerApiBaseUrl + 'Lookup/GetContactDetails'
            })
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            });

            return deferred.promise;
        };

        function saveDeviceDetails(model) {
            var deferred = $q.defer();

            $http(
            {
                method: 'Post',
                url: ServerApiBaseUrl + 'Lookup/SaveDeviceDetails',
                data: model
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ DeviceDetail: data.Item });
            });

            return deferred.promise;
        };


        function logGoToCompany(companyId, deviceId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'Post',
                url: ServerApiBaseUrl + 'Lookup/LogGoToCompany?companyId=' + companyId + '&deviceId=' + deviceId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve();
            });

            return deferred.promise;
        };

    };

})();