(function () {

    'use strict';

    angular.module('app').directive('mobileTableToggle', mobileTableToggleDirective);

    function mobileTableToggleDirective() {
        var directive = {
            restrict: 'EA',
            link: linkFunction
        };

        function linkFunction(scope, element, attributes) {

            $(element).click(function () {
                toggleTooltip(this);
            });

            function toggleTooltip(toolTipElement) {
                if ($(toolTipElement).parent().children('div.info-container').hasClass('hide')) {
                    //$('table.tableContainer').find('div.info-container').removeClass('display').addClass('hide');
                    $(toolTipElement).parent().children('div.info-container').removeClass('hide').addClass('display');
                }
                else {
                    $(toolTipElement).parent().children('div.info-container').removeClass('display').addClass('hide');
                }
            };
        };

        return directive;
    };

    angular.module('app').directive('loadingModal', loadingModalDirective);

    function loadingModalDirective() {
        var directive = {
            restrict: 'EA',
            link: linkFunction
        };

        function linkFunction(scope, element, attributes) {

            $(element).hide();

            scope.$watch('isLoading', function (newValue, oldValue) {

                if (newValue) {
                    var p = $('.content-wrapper');
                    var position = p.position();

                    $(element).css('top', position.top)
                    $(element).show();
                }
                else {
                    $(element).hide();
                }
            });
        };

        return directive;
    };

    angular.module('app').directive('toggleMenuDisplay', toggleMenuDisplayDirective);

    function toggleMenuDisplayDirective() {
        var directive = {
            restrict: 'EA',
            link: linkFunction
        };

        function linkFunction(scope, element, attributes) {
            $(element).find('.navbar-nav-item').click(function () {
                if (attributes.toggleMenuDisplay && $('#' + attributes.toggleMenuDisplay).length > 0) {
                    $('#' + attributes.toggleMenuDisplay).collapse('hide');
                }
            });
        };

        return directive;
    };
})();