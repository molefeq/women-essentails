(function () {

    'use strict';

    angular.module('app').controller('companyController', CompanyController);

    CompanyController.$inject = ['$scope', '$uibModalInstance', '$state', 'items'];

    function CompanyController($scope, $uibModalInstance, $state, items) {
        var viewModel = $scope;

        viewModel.items = items;
        viewModel.selected = {
            item: viewModel.items[0]
        };
        viewModel.ok = ok
        viewModel.cancel = cancel;

        function ok() {
            $uibModalInstance.close($scope.selected.item);
        };

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        };
    };

})();