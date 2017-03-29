'use strict'

var app = app || {};

app.SubFormValidator = function () {
    var subformvalidator = this;

    var isValid = true;
    var validationFields = {};
    var element = null;
    var modelName = null;
    var rules = {
        required: {},
        maxlength: {},
        pattern: {}
    };

    subformvalidator.initialise = function (containerElement, currentModelName) {
        element = containerElement;
        modelName = currentModelName;

        initialiseValidationFields();
    };

    subformvalidator.isValid = function (model) {
        subformvalidator.clearValidationMessages();

        for (var validationField in validationFields) {
            if (validationField == 'IsValid') {
                continue;
            }

            var fieldName = validationField.split('_').length == 1 ? validationField : validationField.split('_')[validationField.split('_').length - 1];

            if (validationFields[validationField].required && !model[fieldName] && !validationFields[validationField].error) {
                validationFields[validationField].error = true;
                isValid = false;
                showValidationMessage(element, validationField, validationFields[validationField].required.message);
                continue;
            }

            if (validationFields[validationField].maxlength && model[fieldName] && model[fieldName].length > validationFields[validationField].maxlength &&
                !validationFields[validationField].error) {
                validationFields[validationField].error = true;
                isValid = false;
                showValidationMessage(element, validationField, validationFields[validationField].maxlength.message);
                continue;
            }

            if (validationFields[validationField].minlength && model[fieldName] && model[fieldName].length < validationFields[validationField].minlength &&
                !validationFields[validationField].error) {
                validationFields[validationField].error = true;
                isValid = false;
                showValidationMessage(element, validationField, validationFields[validationField].minlength.message);
                continue;
            }

            if (validationFields[validationField].pattern && model[fieldName]) {

                var reqPattern = validationFields[validationField].pattern.pattern.substring(1, validationFields[validationField].pattern.pattern.length - 1);
                var regEx = new RegExp(reqPattern);

                if (!regEx.test(model[fieldName]) && !validationFields[validationField].error) {
                    validationFields[validationField].error = true;
                    isValid = false;
                    showValidationMessage(element, validationField, validationFields[validationField].pattern.message);
                }
            }
        }

        return isValid;
    };

    subformvalidator.clearValidationMessages = function () {
        isValid = true;

        for (var validationField in validationFields) {

            if (validationField == 'IsValid') {
                continue;
            }

            validationFields[validationField].error = false;

            var validationElement = $(element).find('div[data-for=' + validationField + ']');

            toggleElementClass(validationElement, 'k-valid-msg', 'k-invalid-msg');
            toggleElementClass(validationElement.parent(), null, 'haserror');

            validationElement.text('');
        }
    };

    function initialiseValidationFields() {
        var validationElements = $(element).find('[name]');

        validationFields = {};

        for (var i = 0; i < validationElements.length; i++) {
            validationFields[$(validationElements[i]).attr('name')] = { error: false };

            for (var rule in rules) {
                if ($(validationElements[i]).attr('sub-form-' + rule)) {
                    validationFields[$(validationElements[i]).attr('name')][rule] = { error: false, message: $(validationElements[i]).attr("sub-form-" + rule + "-msg") }

                    if (rule == 'pattern') {
                        validationFields[$(validationElements[i]).attr('name')][rule]['pattern'] = $(validationElements[i]).attr("sub-form-" + rule);
                    }

                    if (rule == 'minlength') {
                        validationFields[$(validationElements[i]).attr('name')][rule]['minlength'] = $(validationElements[i]).attr("sub-form-" + rule);
                    }

                    if (rule == 'maxlength') {
                        validationFields[$(validationElements[i]).attr('name')][rule]['maxlength'] = $(validationElements[i]).attr("sub-form-" + rule);
                    }
                }
            }
        }
    };

    function showValidationMessage(containerElement, elementName, message) {
        var controlElement = $(containerElement).find('div[data-for=' + elementName + ']');
        var parentElement = $(controlElement).parent();

        if (!message) {
            toggleElementClass(controlElement, 'k-valid-msg', 'k-invalid-msg');
            toggleElementClass(parentElement, null, 'haserror');

            return;
        }

        toggleElementClass(controlElement, 'k-invalid-msg', 'k-valid-msg');
        toggleElementClass(parentElement, 'haserror', null);

        $(controlElement).text(message);
    };

    function toggleElementClass(controlElement, newClassName, oldClassName) {
        if ($(controlElement) && $(controlElement).length > 0 && $(controlElement).hasClass(oldClassName) && oldClassName) {
            $(controlElement).removeClass(oldClassName);
        }

        if ($(controlElement) && $(controlElement).length > 0 && !$(controlElement).hasClass(newClassName) && newClassName) {
            $(controlElement).addClass(newClassName);
        }
    };

};
