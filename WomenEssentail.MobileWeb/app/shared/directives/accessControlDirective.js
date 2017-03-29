(function () {

    'use strict';

    angular.module('app').directive('accessControl', accessControlDirective);

    accessControlDirective.$inject = ['$state', 'appFactory'];

    function accessControlDirective($state, appFactory) {
        var directive = {
            restrict: 'A',
            link: linkFunction,
            scope: {
                module: '@'
            }
        };

        function linkFunction(scope, element, attributes) {
            appFactory.Initialise();

            if (appFactory.User && appFactory.User.AccessModules && app.RoutesManager.canModuleAccessRoute(appFactory.User.AccessModules, scope.module)) {
                $(element).show();
                return;
            }

            $(element).hide();
        };

        return directive;
    };

})();