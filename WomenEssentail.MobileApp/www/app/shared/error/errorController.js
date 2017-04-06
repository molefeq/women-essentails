
function errorController($scope, $rootScope, $uibModalInstance) {
    $rootScope.isLoading = false;

    $scope.closeDialog = function () {
        $uibModalInstance.dismiss();
    };
};