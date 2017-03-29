(function () {

    'use strict';

    angular.module('app').directive('appValidator', appValidator);

    function appValidator() {
        var directive = {
            restrict: 'EA',
            link: linkFunction
        };

        function linkFunction(scope, element, attributes) {
            var formElements = getFormElements(element);
            var formName = $(element).attr('name');
            var validationMessageContainer = $('#' + $(element).attr('validation-summary-id'));

            element.on('change', 'select', function (e) {
                var validationItem = scope[formName][$(this).attr('name')];

                elementValidate(validationItem, $(this), element);
                clearValidationMessages(element);
            });

            element.on('keyup', 'input[type="password"]', function (e) {
                var validationItem = scope[formName][$(this).attr('name')];

                elementValidate(validationItem, $(this), element);
            });

            element.on('blur', 'input[type="password"]', function (e) {
                var validationItem = scope[formName][$(this).attr('name')];

                elementValidate(validationItem, $(this), element);
                clearValidationMessages(element);
            });

            element.on('keyup', 'input[type="text"]', function (e) {
                var validationItem = scope[formName][$(this).attr('name')];
                elementValidate(validationItem, $(this), element);
            });

            element.on('blur', 'input[type="text"]', function (e) {
                var validationItem = scope[formName][$(this).attr('name')];

                elementValidate(validationItem, $(this), element);
                clearValidationMessages(element);
            });

            element.on('keyup', 'textarea', function (e) {
                var validationItem = scope[formName][$(this).attr('name')];

                elementValidate(validationItem, $(this), element);
            });

            element.on('blur', 'textarea', function (e) {
                var validationItem = scope[formName][$(this).attr('name')];

                elementValidate(validationItem, $(this), element);
            });

            element.bind("submit", function () {
                clearValidationMessages(element);

                for (var i = 0; i < formElements.length; i++) {
                    var validationElement = element.find('[name=' + formElements[i].Name + ']')[0];
                    var parentElement = $(validationElement).parent();
                    var errorKeys = Object.keys(scope[formName][formElements[i].Name].$error);

                    if (errorKeys && errorKeys.length > 0) {
                        for (var j = 0; j < errorKeys.length; j++) {
                            var errorMessage = $(validationElement).attr('data-' + errorKeys[j] + '-msg');

                            displayValidationMessage(formElements[i].Element, errorMessage, parentElement);
                        }

                        continue;
                    }

                    displayValidationMessage(formElements[i].Element, null, parentElement);
                }
            });

            scope.$on('server-validation-error-occurred', function (event, data) {
                for (var i = 0; i < data.length; i++) {
                    var errorMessageItem = data[i];
                    var elementControl = errorMessageItem.KeyField ? $(element).find('[name="' + errorMessageItem.KeyField + '"]') : null;

                    if (!errorMessageItem.KeyFieldMessages || errorMessageItem.KeyFieldMessages.length == 0) {
                        continue;
                    }

                    if ((elementControl == null || $(elementControl).length == 0) && errorMessageItem.KeyFieldMessages && errorMessageItem.KeyFieldMessages.length > 0) {
                        displaySummaryValidationMessages(element, errorMessageItem.KeyFieldMessages);
                        continue;
                    }

                    displayValidationMessage($(element).find('div[data-for="' + errorMessageItem.KeyField + '"]')[0], errorMessageItem.KeyFieldMessages[0], $(elementControl).parent());
                }
            });

            scope.$on('server-validation-successfull', function (event, data) {
                if (!validationMessageContainer || validationMessageContainer.length == 0) {
                    return;
                }

                toggleElementClass(validationMessageContainer, 'summary-validation-valid', 'summary-validation-invalid');
            });
        };

        function getFormElements(element) {
            var elements = [];

            $(element).find('[data-for]').each(function (index, element) {
                elements.push({
                    Element: element,
                    Name: $(element).attr('data-for')
                });
            });

            return elements;
        };

        function displayValidationMessage(element, message, parentElement) {
            if (!message) {
                toggleElementClass(element, 'k-valid-msg', 'k-invalid-msg');
                toggleElementClass(parentElement, null, 'haserror');

                return;
            }

            toggleElementClass(element, 'k-invalid-msg', 'k-valid-msg');
            toggleElementClass(parentElement, 'haserror', null);

            $(element).text(message);
        };

        function displaySummaryValidationMessages(formElement, messages) {
            var validationMessageContainer = $('#' + $(formElement).attr('validation-summary-id'));

            if (!validationMessageContainer || validationMessageContainer.length == 0 || !messages || messages.length == 0) {
                return;
            }

            validationMessageContainer.empty();

            for (var i = 0; i < messages.length; i++) {
                var errorMessage = '<div>' + messages[i] + '</div>';
                $(validationMessageContainer).append(errorMessage);
            }

            toggleElementClass(validationMessageContainer, 'summary-validation-invalid', 'summary-validation-valid');
        };

        function clearValidationMessages(element) {
            $(element).find('div[data-valmsg-summary=true]').empty();
            toggleElementClass($(element).find('div[data-valmsg-summary=true]'), 'summary-validation-valid', 'summary-validation-invalid');
        }

        function toggleElementClass(element, newClassName, oldClassName) {
            if ($(element) && $(element).length > 0 && $(element).hasClass(oldClassName) && oldClassName) {
                $(element).removeClass(oldClassName);
            }

            if ($(element) && $(element).length > 0 && !$(element).hasClass(newClassName) && newClassName) {
                $(element).addClass(newClassName);
            }
        }

        function elementValidate(validationItem, element, containerElement) {
            var elementName = $(element).attr('name');
            var parentElement = $(element).parent();
            var validationElement = $(containerElement).find('div[data-for="' + elementName + '"]').first();

            if (!validationItem || !validationItem.$invalid) {
                displayValidationMessage(validationElement, null, parentElement);
                return;
            }

            for (var key in validationItem.$error) {
                var errorMessage = $(element).attr('data-' + key + '-msg');

                if (errorMessage) {
                    displayValidationMessage(validationElement, errorMessage, parentElement);
                }
            }
        };

        return directive;
    };

})();