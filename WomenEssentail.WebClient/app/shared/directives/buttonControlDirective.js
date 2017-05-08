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
            var tagName = $(element).prop("tagName");

            console.log(tagName);

            $(element).on('click', function (e, event) {

                if (!isFormInvalid) {
                    if (tagName.toLowerCase() == 'input') {
                        $(element).val(attributes.actionInProgressValue);
                    }
                    else if (tagName.toLowerCase() == 'button') {
                        $(element).text(attributes.actionInProgressValue);
                    }
                    $(element).prop("disabled", true);
                }
                isFormInvalid = false;
            });

            scope.$on("action-complete", function (event, data) {
                isFormInvalid = data ? data : false;
                if (tagName.toLowerCase() == 'input') {
                    $(element).val(attributes.actionValue);
                }
                else if (tagName.toLowerCase() == 'button') {
                    $(element).text(attributes.actionValue);
                }
                $(element).prop("disabled", false);
            });
        };

        return directive;
    };

})();