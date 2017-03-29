(function () {

    'use strict';

    angular.module('app').controller('organisationUserController', organisationUserController);

    organisationUserController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'notificationFactory', 'organisationUserFactory'];

    function organisationUserController($scope, $rootScope, $state, $stateParams, notificationFactory, organisationUserFactory) {
        var viewModel = $scope;
        var organisationId = $stateParams.organisationId;

        viewModel.organisationUserFactory = organisationUserFactory;

        viewModel.organisationUserFactory.initialise();

        if (!viewModel.organisationUserFactory.organisation ||
           !viewModel.organisationUserFactory.organisation.Id ||
           viewModel.organisationUserFactory.organisation.Id != Number(organisationId)) {
            $state.go('organisations');
            return;
        }

        viewModel.searchOrganisationUsers = searchOrganisationUsers;
        viewModel.addUser = addUser;
        viewModel.editUser = editUser;
        viewModel.deleteUser = deleteUser;

        viewModel.SearchFilter = {
            PageData: {
                Take: 20,
                Skip: 0
            },
            SearchText: '',
            OrganisationId: organisationId
        };

        viewModel.organisationUsersGridOptions = {
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

                viewModel.organisationUserFactory.getUsers(viewModel.SearchFilter).then(function (response) {
                    viewModel.organisationUsersGrid.SetDataSource(viewModel.organisationUserFactory.users, viewModel.organisationUserFactory.totalUsers);
                    $rootScope.isDataLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            viewModel.organisationUsersGrid = data.grid;

            viewModel.organisationUserFactory.getRoles().then(function () {
                viewModel.organisationUsersGrid.SetPage(null, 1);
            });
        });

        viewModel.$on('user-updated', function (event, data) {
            viewModel.organisationUsersGrid.SetPage(null, viewModel.organisationUsersGrid.Paging.PageIndex);
        });

        function searchOrganisationUsers() {
            viewModel.organisationUsersGrid.SetPage(null, 1);
        };

        function addUser() {
            var newScope = $rootScope.$new();

            newScope.actionType = 'CREATE';
            newScope.roles = viewModel.organisationUserFactory.userRoles;
            newScope.model = { OrganisationId: organisationId };

            notificationFactory.open({
                templateUrl: 'organisationusertemplate.html',
                scope: newScope,
                size: 'xs',
                controller: organisationUserModalController
            });
        };

        function editUser(user) {
            var newScope = $rootScope.$new();

            newScope.actionType = 'UPDATE';
            newScope.roles = viewModel.organisationUserFactory.userRoles;
            newScope.model = user;

            notificationFactory.open({
                templateUrl: 'organisationusertemplate.html',
                scope: newScope,
                size: 'xs',
                controller: organisationUserModalController
            });
        };

        function deleteUser(user) {
            var newScope = $rootScope.$new();

            newScope.actionType = 'DELETE';
            newScope.model = user;

            notificationFactory.open({
                templateUrl: 'organisationusertemplate.html',
                scope: newScope,
                size: 'xs',
                controller: organisationUserModalController
            });
        };
    };

})();