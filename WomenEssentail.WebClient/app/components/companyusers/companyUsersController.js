(function () {

    'use strict';

    angular.module('app').controller('companyUsersController', companyUsersController);

    companyUsersController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'notificationFactory', 'companyUsersFactory'];

    function companyUsersController($scope, $rootScope, $state, $stateParams, notificationFactory, companyUsersFactory) {
        var viewModel = $scope;
        var companyId = $stateParams.companyId;

        viewModel.companyUsersFactory = companyUsersFactory;
        viewModel.searchCompanyUsers = searchCompanyUsers;
        viewModel.addUser = addUser;
        viewModel.editUser = editUser;
        viewModel.deleteUser = deleteUser;
        viewModel.goHome = goHome;
        viewModel.goToSalons = goToSalons;

        viewModel.SearchFilter = {
            PageData: {
                Take: 20,
                Skip: 0
            },
            SearchText: '',
            CompanyId: companyId
        };

        viewModel.companyUsersGridOptions = {
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

                viewModel.companyUsersFactory.getUsers(viewModel.SearchFilter).then(function (response) {
                    viewModel.companyUsersGrid.SetDataSource(viewModel.companyUsersFactory.users, viewModel.companyUsersFactory.totalUsers);
                    $rootScope.isDataLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            viewModel.companyUsersFactory.initialise(companyId).then(function () {
                viewModel.companyUsersGrid.SetPage(null, 1);
            });
        });

        viewModel.$on('user-updated', function (event, data) {
            viewModel.companyUsersGrid.SetPage(null, viewModel.companyUsersGrid.Paging.PageIndex);
        });

        function searchCompanyUsers() {
            viewModel.companyUsersGrid.SetPage(null, 1);
        };

        function addUser() {
            var newScope = $rootScope.$new();

            newScope.actionType = 'CREATE';
            viewModel.companyUsersFactory.user = { CompanyId: companyId, RoleId: viewModel.companyUsersFactory.role.Id };

            notificationFactory.open({
                templateUrl: 'companyusertemplate.html',
                scope: newScope,
                size: 'xs',
                controller: companyUserModalController
            });
        };

        function editUser(user) {

            viewModel.companyUsersFactory.editUser(user.Id).then(function (response) {
                var newScope = $rootScope.$new();

                newScope.actionType = 'UPDATE';

                notificationFactory.open({
                    templateUrl: 'companyusertemplate.html',
                    scope: newScope,
                    size: 'xs',
                    controller: companyUserModalController
                });
            });
        };

        function deleteUser(user) {
            viewModel.companyUsersFactory.editUser(user.Id).then(function (response) {
                var newScope = $rootScope.$new();

                newScope.actionType = 'DELETE';
                newScope.model = user;

                notificationFactory.open({
                    templateUrl: 'companyusertemplate.html',
                    scope: newScope,
                    size: 'xs',
                    controller: companyUserModalController
                });
            });
        };

        function goHome(e) {
            e.preventDefault();

            $state.go('home');
        };

        function goToSalons(e) {
            e.preventDefault();

            $state.go('salons');
        };
    };

})();