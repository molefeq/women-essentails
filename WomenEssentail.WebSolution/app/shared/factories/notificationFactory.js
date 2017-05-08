(function () {

    'use strict';

    angular.module('app').factory('notificationFactory', notificationFactory);

    notificationFactory.$inject = ['$uibModal'];

    function notificationFactory($uibModal) {
        var factory = {
            open: open
        };

        return factory;

        function open(options) {
            if (!options || !options.templateUrl || !options.controller || !options.scope) {
                return;
            }

            var animation = options.animation ? options.animation : false;
            var size = options.size ? options.size : 'lg';

            var modalInstance = $uibModal.open({
                templateUrl: options.templateUrl,
                controller: options.controller,
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                fullscreen: false,
                backdrop: 'static',
                escapeToClose: false,
                scope: options.scope,
                size: size
            });

            return modalInstance;
        };
    };

})();