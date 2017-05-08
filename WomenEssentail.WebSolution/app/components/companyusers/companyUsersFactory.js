(function () {

    'use strict';

    angular.module('app').factory('companyUsersFactory', companyUsersFactory);

    companyUsersFactory.$inject = ['$q', 'companyApiFactory', 'accountApiFactory', 'roleApiFactory'];

    function companyUsersFactory($q, companyApiFactory, accountApiFactory, roleApiFactory) {

        var factory = {
            initialise: initialise,
            salon: {},
            role: {},
            getUsers: getUsers,
            user: {},
            editUser: editUser,
            addUser: addUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
        };

        return factory;

        function initialise(companyId) {
            var deferred = $q.defer();
            var promises = {
                RolesPromise: roleApiFactory.getAllRoles(''),
                CompanyPrmoise: companyApiFactory.getCompany(companyId)
            };

            $q.all(promises).then(function (values) {
                for (var i = 0; i < values.RolesPromise.Roles.length; i++) {
                    if (values.RolesPromise.Roles[i].Code == 'ADM') {
                        factory.role = values.RolesPromise.Roles[i];
                        break;
                    }
                }

                factory.salon = values.CompanyPrmoise.Company;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function getUsers(searchFilter) {
            var deferred = $q.defer();

            accountApiFactory.getUsers(searchFilter).then(function (response) {
                factory.users = response.Users;
                factory.totalUsers = response.TotalUsers;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function editUser(userId) {
            var deferred = $q.defer();

            accountApiFactory.getUser(userId).then(function (data) {
                factory.user = data.User
                deferred.resolve();
            });

            return deferred.promise;
        };

        function addUser() {
            var deferred = $q.defer();

            accountApiFactory.addUser(factory.user).then(function (response) {
                factory.user = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function updateUser() {
            var deferred = $q.defer();

            accountApiFactory.updateUser(factory.user).then(function (response) {
                factory.user = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function deleteUser() {
            var deferred = $q.defer();

            accountApiFactory.deleteUser(factory.user).then(function (response) {
                factory.user = {};
                deferred.resolve();
            });

            return deferred.promise;
        };
    };

})();