(function () {

    'use strict';

    angular.module('app').directive('appTabsValidator', appTabsValidator);

    function appTabsValidator() {
        var directive = {
            restrict: 'A',
            link: linkFunction,
            controller: tabsController
        };

        tabsController.$inject = ['$scope'];

        function linkFunction(scope, element, attributes, tabsController) {
            var tabFormValidator = app.TabFormValidator;

            tabFormValidator.initialise(element, tabsController.childForms, scope);

            scope.$on('server-validation-error-occurred', function (event, data) {
                tabFormValidator.displayServerErrors(data);
            });

            scope.$on('server-validation-successfull', function (event, data) {
                tabFormValidator.clearServerErrors();
            });

            element.bind("submit", function () {
                tabFormValidator.validateTabs();
            });

            element.on('change', 'select', function (e) {
                tabFormValidator.resetControl(this);
            });

            element.on('keyup', 'input[type="password"]', function (e) {
                tabFormValidator.resetControl(this);
            });

            element.on('blur', 'input[type="password"]', function (e) {
                tabFormValidator.resetControl(this);
            });

            scope.$on('file-uploaded', function (e, data) {
                tabFormValidator.resetControl(data);
            });

            element.on('keyup', 'input[type="text"]', function (e) {
                tabFormValidator.resetControl(this);
            });

            element.on('blur', 'input[type="text"]', function (e) {
                tabFormValidator.resetControl(this);
            });

            element.on('keyup', 'textarea', function (e) {
                tabFormValidator.resetControl(this);
            });

            element.on('blur', 'textarea', function (e) {
                tabFormValidator.resetControl(this);
            });

        };

        function tabsController($scope) {
            var controller = {
                childForms: []
            };

            return controller;
        };

        return directive;
    };

    angular.module('app').directive('appTabValidator', appTabValidator);

    function appTabValidator() {
        var directive = {
            restrict: 'A',
            link: linkFunction,
            require: ["^appTabsValidator"],
        };

        function linkFunction(scope, element, attributes, ctrl) {
            ctrl[0].childForms.push({ Element: element, Name: $(element).attr('name') });
        };

        return directive;
    };

})();