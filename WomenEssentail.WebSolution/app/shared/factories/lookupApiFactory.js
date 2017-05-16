(function () {

    'use strict';

    angular.module('app').factory('lookupApiFactory', lookupApiFactory);

    lookupApiFactory.$inject = ['$http', '$q', 'ServerApiBaseUrl'];

    function lookupApiFactory($http, $q, ServerApiBaseUrl) {
        var factory = {
            getCompanyTypes: getCompanyTypes,
            getCategories: getCategories,
            getSubCategories: getSubCategories,
            sendMessage: sendMessage,
            getContactDetails: getContactDetails,
            getLookupFields: getLookupFields
        };

        return factory;

        function getCompanyTypes(searchFilter) {
            return getResultSet(searchFilter, ServerApiBaseUrl + 'Lookup/GetCompanTypes');
        };

        function getCategories(searchFilter) {
            return getResultSet(searchFilter, ServerApiBaseUrl + 'Lookup/GetCategories');
        };

        function getSubCategories(searchFilter) {
            return getResultSet(searchFilter, ServerApiBaseUrl + 'Lookup/GetSubCategories');
        };

        function getLookupFields(fieldName) {
            var deferred = $q.defer();

            $http(
            {
                method: 'GET',
                url: ServerApiBaseUrl + 'Lookup/GetLookupFields?fieldName=' + fieldName
            })
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }

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

        function sendMessage(model) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Lookup/SendMessage',
                data: model
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

    };

})();