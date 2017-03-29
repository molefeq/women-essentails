(function () {

    'use strict';

    angular.module('app').controller('appController', AppController);

    AppController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'appFactory', 'notificationFactory', 'SubMenuItems', 'AnonymousStates'];

    function AppController($scope, $rootScope, $state, $stateParams, appFactory, notificationFactory, SubMenuItems, AnonymousStates) {
        var viewModel = $scope;

        viewModel.appFactory = appFactory;
        viewModel.viewProfile = viewprofile;
        viewModel.changePassword = changepassword;
        viewModel.editOrganisation = editorganisation;
        viewModel.goToMenuItem = goToMenuItem;
        viewModel.goToHome = goToHome;
        viewModel.subMenuItems = [];
        viewModel.currentNavItem = '';

        viewModel.appFactory.Initialise();

        $scope.$on('server-error-occurred', function (event, data) {
            data.controller = errorController;
            notificationFactory.open(data);
        });

        $scope.$on('state-changed', function (event, data) {
            viewModel.currentNavItem = '';
            viewModel.subMenuItems = !viewModel.appFactory.User || !viewModel.appFactory.User.AccessModules ? [] : app.RoutesManager.getMenuItems(viewModel.appFactory.User.AccessModules, SubMenuItems, data.name);

            if (viewModel.subMenuItems && viewModel.subMenuItems.length > 0) {
                viewModel.currentNavItem = viewModel.subMenuItems[0].DisplayName;
            }
        });

        function viewprofile(e) {
            e.preventDefault();

            $state.go('userprofile', { userProfileId: appFactory.User.Id });
        };

        function changepassword(e) {
            e.preventDefault();

            $state.go('changepassword');
        };

        function editorganisation() {
            $state.go('organisation', { organisationId: appFactory.User.OrganisationId });
        };

        function goToMenuItem(menuItem) {
            var queryStrings = {};

            viewModel.currentNavItem = menuItem.DisplayName;

            if (menuItem.QueryParameters && menuItem.QueryParameters.length > 0) {
                for (var i = 0; i < menuItem.QueryParameters.length > 0; i++) {
                    queryStrings[menuItem.QueryParameters[i]] = $stateParams[menuItem.QueryParameters[i]];
                }
            }

            $state.go(menuItem.path, queryStrings);
        };

        function goToHome(e) {
            e.preventDefault();

            if ($state.current.sessionState && $state.current.sessionState.home) {
                $state.go($state.current.sessionState.home);
            }

            //if (AnonymousStates[$state.current.name] && !appFactory.User) {
            //    $state.go('login');
            //    return;
            //}

            //var landingRoute = app.RoutesManager.getLandingRoute(appFactory.User.AccessModules, $state.get());

            //$state.go(landingRoute.name);
        };
    };

})();