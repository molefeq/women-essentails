(function () {

    'use strict';

    angular.module('app').controller('userProfileController', UserProfileController);

    UserProfileController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'userProfileFactory', 'toastr', 'toastrConfig'];

    function UserProfileController($scope, $rootScope, $state, $stateParams, userProfileFactory, toastr, toastrConfig) {
        var viewModel = $scope;
        var userProfileId = $stateParams.userProfileId;

        viewModel.userProfileFactory = userProfileFactory;
        viewModel.saveProfile = saveProfile;
        toastrConfig.positionClass = 'toast-bottom-right';

        viewModel.userProfileFactory.getUser(userProfileId);

        function saveProfile() {
            if (!viewModel.frmUserProfile.$valid) {
                $rootScope.$broadcast('action-complete', true);
                return;
            }

            viewModel.userProfileFactory.save().then(function (data) {
                toastr.success('User profile save was successful.', 'Save');
            });
        };
    };

})();