(function () {

    'use strict';

    angular.module('app').factory('rolesAdminFactory', rolesAdminFactory);

    rolesAdminFactory.$inject = ['$q', 'moduleApiFactory', 'roleApiFactory'];

    function rolesAdminFactory($q, moduleApiFactory, roleApiFactory) {

        var factory = {
            initialiseRoleModal: initialiseRoleModal,
            roles: [],
            role: {},
            totalRoles: 0,
            getRoles: getRoles,
            getRole: getRole,
            addRole: addRole,
            updateRole: updateRole,
            deleteRole: deleteRole,
        };

        return factory;

        function initialiseRoleModal(roleId) {
            var deferred = $q.defer();

            getModules().then(function () {
                if (roleId) {
                    factory.getRole(roleId).then(function () {
                        deferred.resolve();
                    });
                }
                else {
                    deferred.resolve();
                }
            });

            return deferred.promise;
        };

        function getRoles(searchFilter) {
            var deferred = $q.defer();

            roleApiFactory.searchRoles(searchFilter).then(function (response) {
                factory.roles = response.Roles;
                factory.totalRoles = response.TotalRoles;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function getRole(roleId) {
            var deferred = $q.defer();

            roleApiFactory.getRole(roleId).then(function (response) {

                for (var i = 0; i < factory.role.RoleModules.length; i++) {
                    var indexOfModule = app.Utils.indexOf(response.Role.RoleModules, factory.role.RoleModules[i].ModuleId, 'ModuleId');

                    if (response.Role.RoleModules[indexOfModule] && response.Role.RoleModules[indexOfModule].Id && indexOfModule >= 0) {
                        response.Role.RoleModules[indexOfModule].IsSelected = true;
                        continue;
                    }

                    response.Role.RoleModules.push(factory.role.RoleModules[i]);
                }

                factory.role = response.Role;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function addRole() {
            var deferred = $q.defer();

            factory.role.RoleModules = excludeUnselectedRoleModules();

            roleApiFactory.addRole(factory.role).then(function (response) {
                factory.role = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function updateRole() {
            var deferred = $q.defer();

            factory.role.RoleModules = excludeUnselectedRoleModules();

            roleApiFactory.updateRole(factory.role).then(function (response) {
                factory.role = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function deleteRole() {
            var deferred = $q.defer();

            factory.role.RoleModules = excludeUnselectedRoleModules();

            roleApiFactory.deleteRole(factory.role).then(function (response) {
                factory.role = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function getModules() {
            var deferred = $q.defer();

            moduleApiFactory.getAllModules('').then(function (data) {
                factory.role.RoleModules = [];
                for (var i = 0; i < data.Modules.length; i++) {
                    factory.role.RoleModules.push({ ModuleId: data.Modules[i].Id, ModuleName: data.Modules[i].Name, IsSelected: false });
                }
                deferred.resolve();
            });

            return deferred.promise;
        };

        function excludeUnselectedRoleModules() {
            var roleModules = [];

            for (var i = 0; i < factory.role.RoleModules.length; i++) {
                if (!factory.role.RoleModules[i].IsSelected) {
                    continue;
                }

                roleModules.push(factory.role.RoleModules[i]);
            }

            return roleModules;
        };
    };

})();