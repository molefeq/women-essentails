(function () {

    'use strict';

    angular.module('app').factory('organisationUserFactory', organisationUserFactory);

    organisationUserFactory.$inject = ['$q', 'accountApiFactory', 'roleApiFactory'];

    function organisationUserFactory($q, accountApiFactory, roleApiFactory) {

        var factory = {
            initialise: initialise,
            organisation: {},
            users: [],
            totalUsers: 0,
            userRoles: [],
            getUsers: getUsers,
            getRoles: getRoles,
            addUser: addUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
        };

        return factory;

        function initialise() {

            if (sessionStorage["Organisation"] === null || sessionStorage["Organisation"] === undefined) {
                return;
            }

            factory.organisation = JSON.parse(sessionStorage["Organisation"]);
        };
    
        function getUsers(searchFilter) {
            var deferred = $q.defer();

            accountApiFactory.getUsers(searchFilter).then(function (response) {
                factory.users = response.Users;
                factory.totalUsers = response.TotalUsers;
                deferred.resolve();
            });

            return deferred.promise;
        }

        function addUser(user) {
            var deferred = $q.defer();

            accountApiFactory.addUser(user).then(function (response) {
                deferred.resolve();
            });

            return deferred.promise;
        };

        function updateUser(user) {
            var deferred = $q.defer();

            accountApiFactory.updateUser(user).then(function (response) {
                deferred.resolve();
            });

            return deferred.promise;
        };

        function deleteUser(user) {
            var deferred = $q.defer();

            accountApiFactory.deleteUser(user).then(function (response) {
                deferred.resolve();
            });

            return deferred.promise;
        };

        function getRoles() {
            var deferred = $q.defer();

            roleApiFactory.getAllRoles('').then(function (data) {
                factory.userRoles = data.Roles;
                deferred.resolve();
            });

            return deferred.promise;
        };
    };

})();