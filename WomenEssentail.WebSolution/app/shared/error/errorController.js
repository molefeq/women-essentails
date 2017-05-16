errorController.$inject = ['$scope', '$uibModalInstance'];

function errorController($scope, $uibModalInstance) {
    $scope.closeDialog = function () {
        $uibModalInstance.dismiss();
    };
};