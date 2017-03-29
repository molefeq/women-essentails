(function () {

    'use strict';

    angular.module('app').directive('compare', compareToValidator);

    function compareToValidator() {
        var directive = {
            require: 'ngModel',
            restrict: 'EA',
            link: linkFunction,
            scope: {
                compareToField: '=comparefield'
            }
        };

        function linkFunction(scope, element, attributes, controller) {

            controller.$parsers.unshift(function (modelValue) {
                var compareToValue = scope.compareToField;

                if (controller.$isEmpty(modelValue) && controller.$isEmpty(compareToValue)) {
                    controller.$setValidity('compare', true);
                }
                else {
                    controller.$setValidity('compare', modelValue == compareToValue);
                }

                return modelValue;
            });

            scope.$watch('compareToField', function (newValue, oldValue) {
                if (!newValue) {
                    controller.$setValidity('compare', true);
                }
                else {
                    controller.$setValidity('compare', newValue == controller.$viewValue);
                }
            });
        };

        return directive;
    };

})();