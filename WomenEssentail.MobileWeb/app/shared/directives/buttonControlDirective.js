(function () {

    'use strict';

    angular.module('app').directive('buttonControl', buttonControl);

    function buttonControl() {
        var directive = {
            restrict: 'A',
            link: linkFunction
        };

        function linkFunction(scope, element, attributes) {
            var isFormInvalid = false;

            $(element).on('click', function (e, event) {
                if (!isFormInvalid) {
                    $(element).val(attributes.actionInProgressValue);
                    $(element).prop("disabled", true);
                }
                isFormInvalid = false;
            });

            scope.$on("action-complete", function (event, data) {
                isFormInvalid = data ? data : false;
                $(element).val(attributes.actionValue);
                $(element).prop("disabled", false);
            });
        };

        return directive;
    };

})();