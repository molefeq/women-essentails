'use strict'

var app = app || {};

(function (tabformvalidator) {
    var parentFormName;
    var formNameElement;
    var childForms = [];
    var viewModel = {};

    tabformvalidator.initialise = function (element, listOfChildForms, currentViewModel) {
        formNameElement = element;
        childForms = listOfChildForms;
        viewModel = currentViewModel;
        parentFormName = $(element).attr('name');
    };

    tabformvalidator.resetControl = function (control) {
        var childFormName = $(control).closest('ng-form').attr('name');
        var validationItem = viewModel[parentFormName][childFormName][$(control).attr('name')];

        viewModel[parentFormName][childFormName][$(control).attr('name')].$setValidity("custom", true);
        elementValidate(validationItem, $(control));
    };

    tabformvalidator.validateTabs = function () {
        for (var i = 0; i < childForms.length; i++) {
            clearValidationMessages(childForms[i].Element);
            showTabValidationMessages(childForms[i]);
        }
    };

    tabformvalidator.displayServerErrors = function (errorMessages) {
        for (var i = 0; i < childForms.length; i++) {
            clearValidationMessages(childForms[i].Element);
            showTabServerValidationMessages(errorMessages, childForms[i]);
        }

        for (var i = 0; i < errorMessages.length; i++) {
            if (errorMessages[i].IsFound) {
                continue;
            }

            displaySummaryValidationMessages(errorMessages[i].KeyFieldMessages);
        }
    };

    tabformvalidator.clearServerErrors = function () {
        var validationMessageContainer = $('#' + $(formNameElement).attr('validation-summary-id'));

        if (!validationMessageContainer || validationMessageContainer.length == 0) {
            return;
        }

        toggleElementClass(validationMessageContainer, 'summary-validation-valid', 'summary-validation-invalid');
    };

    function elementValidate(validationItem, control) {
        var validationElement = $(control).siblings('div[data-for="' + $(control).attr('name') + '"]').first();

        if (!validationItem || !validationItem.$invalid) {
            displayValidationMessage(validationElement, null, $(control).parent());
            return;
        }

        for (var key in validationItem.$error) {
            var errorMessage = $(control).attr('data-' + key + '-msg');

            if (errorMessage) {
                displayValidationMessage(validationElement, errorMessage, $(control).parent());
            }
        }
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

    function toggleElementClass(element, newClassName, oldClassName) {
        if ($(element) && $(element).length > 0 && $(element).hasClass(oldClassName) && oldClassName) {
            $(element).removeClass(oldClassName);
        }

        if ($(element) && $(element).length > 0 && !$(element).hasClass(newClassName) && newClassName) {
            $(element).addClass(newClassName);
        }
    };

    function showTabValidationMessages(childForm) {
        var parentForm = viewModel[parentFormName];

        $(childForm.Element).find('[data-for]').each(function (index, element) {
            var elementName = $(element).attr('data-for');

            parentForm[childForm.Name][elementName].$setValidity("custom", true);

            var errorKeys = Object.keys(parentForm[childForm.Name][elementName].$error);
            var parentElement = $(element).parent();
            var validationElement = parentElement.find('[name=' + elementName + ']')[0];

            if (errorKeys && errorKeys.length > 0) {
                for (var j = 0; j < errorKeys.length; j++) {
                    var errorMessage = $(validationElement).attr('data-' + errorKeys[j] + '-msg');

                    displayValidationMessage(element, errorMessage, parentElement);
                }
            }
            else {
                displayValidationMessage(element, null, parentElement);
            }
        });
    };

    function clearValidationMessages(element) {
        $(element).find('div[data-valmsg-summary=true]').empty();
        toggleElementClass($(element).find('div[data-valmsg-summary=true]'), 'summary-validation-valid', 'summary-validation-invalid');

    };

    function showTabServerValidationMessages(errorMessages, childForm) {
        for (var i = 0; i < errorMessages.length; i++) {
            var errorMessageItem = errorMessages[i];
            var elementControl = errorMessageItem.KeyField ? $(childForm.Element).find('[name="' + errorMessageItem.KeyField + '"]') : null;

            if (!errorMessageItem.KeyFieldMessages || errorMessageItem.KeyFieldMessages.length == 0) {
                continue;
            }

            if ((elementControl == null || $(elementControl).length == 0) && errorMessageItem.KeyFieldMessages && errorMessageItem.KeyFieldMessages.length > 0) {
                continue;
            }

            errorMessages[i].IsFound = true;

            var validationMessageControl = $(childForm.Element).find('[data-for=' + errorMessageItem.KeyField + ']');
            var parentElement = $(validationMessageControl).parent();

            viewModel[parentFormName][childForm.Name][errorMessageItem.KeyField].$setValidity("custom", false);
            displayValidationMessage(validationMessageControl, errorMessageItem.KeyFieldMessages[0], parentElement);
        }
    };

    function displaySummaryValidationMessages(messages) {
        var validationMessageContainer = $('#' + $(formNameElement).attr('validation-summary-id'));

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

})(app.TabFormValidator = {});
