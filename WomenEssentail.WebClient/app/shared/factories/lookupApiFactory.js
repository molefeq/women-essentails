(function () {

    'use strict';

    angular.module('app').factory('lookupApiFactory', lookupApiFactory);

    lookupApiFactory.$inject = ['$http', '$q', 'ServerApiBaseUrl'];

    function lookupApiFactory($http, $q, ServerApiBaseUrl) {
        var factory = {
            getCompanyTypes: getCompanyTypes,
            getCategories: getCategories,
            getSubCategories: getSubCategories
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

    };

})();