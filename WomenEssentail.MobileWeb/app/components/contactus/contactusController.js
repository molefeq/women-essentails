(function () {

    'use strict';

    angular.module('app').controller('contactusController', contactusController);

    contactusController.$inject = ['$scope', '$state', 'lookupApiFactory'];

    function contactusController($scope, $state, lookupApiFactory) {
        var viewModel = $scope

        viewModel.model = {};

        lookupApiFactory.getContactDetails().then(function (data) {
            viewModel.model = data;
        });

        viewModel.share = function () {
            app.Utils.share();
        };

    };

})();