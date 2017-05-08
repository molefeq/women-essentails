(function () {

    'use strict';

    angular.module('app').factory('roleApiFactory', roleApiFactory);

    roleApiFactory.$inject = ['$http', '$q', 'ServerApiBaseUrl'];

    function roleApiFactory($http, $q, ServerApiBaseUrl) {
        var factory = {
            getAllRoles: getAllRoles,
            searchRoles: searchRoles,
            getRole: getRole,
            addRole: addRole,
            updateRole: updateRole,
            deleteRole: deleteRole
        };

        return factory;

        function getAllRoles(searchText) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Role/GetRoles/',
                data: { SearchText: searchText, PageData: { IncludeAllData: true, SortOrder: 1 } }
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Roles: data.Items, TotalRoles: data.TotalItems });
            });

            return deferred.promise;
        };

        function searchRoles(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Role/GetRoles/',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Roles: data.Items, TotalRoles: data.TotalItems });
            });

            return deferred.promise;
        };

        function getRole(roleId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Role/FetchRole/?roleId=' + roleId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Role: data.Item });
            });

            return deferred.promise;
        };

        function addRole(role) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Role/AddRole',
                data: role
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Role: data.Item });
            });

            return deferred.promise;
        };

        function updateRole(role) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Role/UpdateRole',
                data: role
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Role: data.Item });
            });

            return deferred.promise;
        };

        function deleteRole(role) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Role/DeleteRole',
                data: role
            })
            .success(function (data, status, headers, config) {
                deferred.resolve();
            });

            return deferred.promise;
        };
    };

})();