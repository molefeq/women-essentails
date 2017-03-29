(function () {

    'use strict';

    angular.module('app').factory('accountApiFactory', accountApiFactory);

    accountApiFactory.$inject = ['$http', '$q', 'ServerApiBaseUrl'];

    function accountApiFactory($http, $q, ServerApiBaseUrl) {
        var factory = {
            getUsers: getUsers,
            getUser: getUser,
            addUser: addUser,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return factory;

        function getUsers(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Account/GetUsers',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Users: data.Items, TotalUsers: data.TotalItems });
            });

            return deferred.promise;
        };

        function getUser(userId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Account/FetchUser/?userId=' + userId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ User: data.Item });
            });

            return deferred.promise;
        };

        function addUser(user) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Account/AddUser',
                data: user
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ User: data.Item });
            });

            return deferred.promise;
        };

        function updateUser(user) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Account/UpdateUser',
                data: user
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ User: data.Item });
            });

            return deferred.promise;
        };

        function deleteUser(user) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Account/DeleteUser',
                data: user
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ User: data.Item });
            });

            return deferred.promise;
        };
    };

})();