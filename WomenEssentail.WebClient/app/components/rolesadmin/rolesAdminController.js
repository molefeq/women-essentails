(function () {

    'use strict';

    angular.module('app').controller('rolesAdminController', rolesAdminController);

    rolesAdminController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'notificationFactory', 'rolesAdminFactory'];

    function rolesAdminController($scope, $rootScope, $state, $stateParams, notificationFactory, rolesAdminFactory) {
        var viewModel = $scope;

        viewModel.rolesAdminFactory = rolesAdminFactory;
        
        viewModel.searchRoles = searchRoles;
        viewModel.addRole = addRole;
        viewModel.editRole = editRole;
        viewModel.deleteRole = deleteRole;

        viewModel.SearchFilter = {
            PageData: {
                Take: 20,
                Skip: 0
            },
            SearchText: ''
        };

        viewModel.rolesGridOptions = {
            Paging: {
                PageIndex: 1,
                PageSize: 20
            },
            PageSizes: [20, 40, 60, 90, 100],
            Read: function (options) {
                var that = this;

                $rootScope.isDataLoading = true;
                $rootScope.loadingMessage = 'Loading data, please wait ...';

                viewModel.SearchFilter.PageData.Take = options.take;
                viewModel.SearchFilter.PageData.Skip = options.skip;

                viewModel.rolesAdminFactory.getRoles(viewModel.SearchFilter).then(function (response) {
                    viewModel.rolesGrid.SetDataSource(viewModel.rolesAdminFactory.roles, viewModel.rolesAdminFactory.totalRoles);
                    $rootScope.isDataLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            viewModel.rolesGrid = data.grid;
            viewModel.rolesGrid.SetPage(null, 1);
        });

        viewModel.$on('roles-updated', function (event, data) {
            viewModel.rolesGrid.SetPage(null, viewModel.rolesGrid.Paging.PageIndex);
        });

        function searchRoles() {
            viewModel.rolesGrid.SetPage(null, 1);
        };

        function addRole() {

            viewModel.rolesAdminFactory.initialiseRoleModal().then(function () {
                var newScope = $rootScope.$new();

                newScope.actionType = 'CREATE';

                notificationFactory.open({
                    templateUrl: 'saveroletemplate.html',
                    scope: newScope,
                    size: 'md',
                    controller: roleAdminSaveModalController
                });
            });
        };

        function editRole(role) {
            viewModel.rolesAdminFactory.initialiseRoleModal(role.Id).then(function () {
                var newScope = $rootScope.$new();

                newScope.actionType = 'UPDATE';

                notificationFactory.open({
                    templateUrl: 'saveroletemplate.html',
                    scope: newScope,
                    size: 'md',
                    controller: roleAdminSaveModalController
                });
            });
        };

        function deleteRole(role) {
            var newScope = $rootScope.$new();

            viewModel.rolesAdminFactory.role = role;
            newScope.actionType = 'DELETE';
            
            notificationFactory.open({
                templateUrl: 'saveroletemplate.html',
                scope: newScope,
                size: 'md',
                controller: roleAdminSaveModalController
            });
        };
    };

})();