(function () {

    'use strict';

    angular.module('app').directive('menuHighlight', menuHighlight);

    menuHighlight.$inject = ['$state', '$rootScope'];

    function menuHighlight($state, $rootScope) {
        var directive = {
            restrict: 'A',
            link: linkFunction
        };

        function linkFunction(scope, element, attributes) {
            scope.$on('state-menu-changed', function (event, data) {
                $(element).find('li.menuitem a').removeClass('current');
                $(element).find('li[data-url=' + data.name + '] a').addClass('current');
            });

            element.on('mouseover', 'li.menuitem', function (e) {
                $(element).find('li.menuitem a').removeClass('current');
                $(this).find('a').addClass('current');
            });

            element.on('mouseout', 'li.menuitem', function (e) {
                $(element).find('li.menuitem a').removeClass('current');
                $(element).find('li[data-url=' + $state.current.name + '] a').addClass('current');
            });                      
        };

        return directive;
    };

})();