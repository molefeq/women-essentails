(function () {

    'use strict';

    angular.module('app').directive('appGrid', appGrid);

    appGrid.$inject = ['$rootScope'];

    function appGrid($rootScope) {
        var directive = {
            restrict: 'A',
            link: linkFunction,
            scope: {
                appGrid: '=',
                gridOptions: '=appGridOptions'
            }
        };

        function linkFunction(scope, element, attributes) {
            var gridName = attributes.appGrid ? attributes.appGrid : 'appGrid';

            scope.appGrid = app.CustomGrid;
            scope.appGrid.setOptions(scope.gridOptions);

            $rootScope.$broadcast('app-grid-rendered', { name: gridName, grid: scope.appGrid });
        };

        return directive;
    };

})();