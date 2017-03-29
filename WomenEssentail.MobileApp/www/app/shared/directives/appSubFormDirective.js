(function () {

    'use strict';

    angular.module('app').directive('appSubForm', appSubForm);

    function appSubForm() {

        var directive = {
            restrict: 'AE',
            link: linkFunction,
        };

        return directive;

        function linkFunction(scope, element, attributes, tabsController) {
            scope.$root[attributes.name] = new app.SubFormValidator();

            var directiveSubForm = scope.$root[attributes.name];

            directiveSubForm.initialise(element, scope.$root, attributes.model);

            element.on('change', 'select', function (e) {
                directiveSubForm.clearValidationMessages();
            });

            element.on('blur', 'input[type="password"]', function (e) {
                directiveSubForm.clearValidationMessages();
            });

            element.on('keyup', 'input[type="text"]', function (e) {
                directiveSubForm.clearValidationMessages();
            });

            element.on('blur', 'input[type="text"]', function (e) {
                directiveSubForm.clearValidationMessages();
            });

            element.on('keyup', 'textarea', function (e) {
                directiveSubForm.clearValidationMessages();
            });

            element.on('blur', 'textarea', function (e) {
                directiveSubForm.clearValidationMessages();
            });

            
        };
    };

})();