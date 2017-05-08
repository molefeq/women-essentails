(function () {

    'use strict';

    angular.module('app').controller('contactUsController', contactUsController);

    contactUsController.$inject = ['$scope', '$rootScope', '$state', 'lookupApiFactory'];

    function contactUsController($scope, $rootScope, $state, lookupApiFactory) {
        var viewModel = $scope;

        viewModel.isMessageSent = false;
        viewModel.model = {};
        viewModel.contactUsModel = {};
        viewModel.sendMessage = sendMessage;


        lookupApiFactory.getContactDetails().then(function (data) {
            viewModel.model = data;
        });

        function sendMessage() {
            if (!viewModel.frmContactUs.$valid) {
                $rootScope.$broadcast('action-complete', true);
                return;
            }
            lookupApiFactory.sendMessage(viewModel.contactUsModel).then(function (data) {
                viewModel.isMessageSent = true;
            });
        };

    };

})();