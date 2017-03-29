(function () {

    'use strict';

    angular.module('app').controller('organisationsController', OrganisationsController);

    OrganisationsController.$inject = ['$scope', '$rootScope', '$state', 'notificationFactory', 'organisationsFactory', 'appFactory'];

    function OrganisationsController($scope, $rootScope, $state, notificationFactory, organisationsFactory, appFactory) {
        var viewModel = $scope;

        viewModel.organisationsFactory = organisationsFactory;
        viewModel.addOrganisation = addOrganisation;
        viewModel.editOrganisation = editOrganisation;
        viewModel.viewOrganisation = viewOrganisation;

        viewModel.searchText = '';

        initialise();

        function addOrganisation() {
            var newScope = $rootScope.$new();
            viewModel.organisationsFactory.organisation = {};

            newScope.actionType = 'CREATE';

            notificationFactory.open({
                templateUrl: 'organisationtemplate.html',
                scope: newScope,
                controller: organisationModalController
            });
        };

        function editOrganisation(organisation, e) {
            e.preventDefault();

            sessionStorage.setItem("Organisation", JSON.stringify(organisation));

            $state.go('organisation', { organisationId: organisation.Id });
        };

        function viewOrganisation(organisation, e) {
            e.preventDefault();
            
            appFactory.ViewOrganisation(organisation);
            $state.go('companies');
        };

        function initialise() {
            viewModel.organisationsFactory.searchOrganisations(viewModel.searchText).then(function (response) {

            });
        };
    };

})();