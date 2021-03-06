var app = app || {};

(function (customgrid) {
    var _ReadCallBack = function (options) { };
    var _PagesOffet = 5;

    // Class properties

    customgrid.Columns = [];
    customgrid.SubColumns = [];
    customgrid.IsHierachyGrd = false;

    customgrid.Paging = {
        IsFirstPage: false,
        IsLastPage: false,
        TotalPages: 0,
        Pages: [],
        PageIndex: 0,
        PageSize: 10,
        CurrentItemsCount: 10
    };

    customgrid.PageSizes = [];
    customgrid.DataSource = {};
    customgrid.SubItemsField = '';
    customgrid.ExpandMode = 'Collapse';

    // Class methods

    customgrid.DisplayItemExpand = function (dataItem) {
        return dataItem[customgrid.SubItemsField] && dataItem[customgrid.SubItemsField].length;
    };

    customgrid.ExpandIconClass = function () {
        return customgrid.ExpandMode.toLowerCase() == 'expand' ? 'opened' : 'closed'
    };

    customgrid.ExpandRowClass = function () {
        return customgrid.ExpandMode.toLowerCase() == 'expand' ? 'expandRow' : 'closeRow'
    };

    customgrid.SetPage = function (e, pageIndex) {
        if (e) {
            e.preventDefault();
        }

        customgrid.Paging.PageIndex = pageIndex;
        customgrid.Read();
    };

    customgrid.Read = function (read_callback) {
        var take = customgrid.Paging.PageSize;
        var skip = customgrid.Paging.PageSize * (customgrid.Paging.PageIndex - 1);

        window.scrollTo(0, 0);

        if (read_callback) {
            _ReadCallBack = read_callback;
        }

        _ReadCallBack({ take: take, skip: skip });
    };

    customgrid.PageSizeChange = function (e) {
        customgrid.Paging.PageIndex = 1;
        customgrid.Read();
    };

    customgrid.isNormalColumn = function (column) {
        return !column.Filter && !column.TemplateId;
    };

    customgrid.isFormatColumn = function (column) {
        return column.Filter && column.Filter.Format && !column.TemplateId;
    };

    customgrid.isTemplateColumn = function (column) {
        return column.TemplateId;
    };

    customgrid.isNormalHeader = function (column) {
        return !column.HeaderTemplateId;
    };

    customgrid.isTemplateHeader = function (column) {
        return column.HeaderTemplateId;
    };

    customgrid.setOptions = function (options) {
        if (options.PageSizes) {
            customgrid.PageSizes = options.PageSizes;
        }

        if (options.Columns) {
            customgrid.Columns = options.Columns;
        }

        if (options.SubColumns) {
            customgrid.SubColumns = options.SubColumns;
        }

        if (options.Paging) {
            customgrid.Paging = options.Paging;
        }

        if (options.Read) {
            _ReadCallBack = options.Read;
        }

        if (options.SubItemsField) {
            customgrid.SubItemsField = options.SubItemsField;
        }

        if (options.ExpandMode) {
            customgrid.ExpandMode = options.ExpandMode;
        }

        if (options.IsHierachyGrd) {
            customgrid.IsHierachyGrd = options.IsHierachyGrd;
        }
    };

    customgrid.SetDataSource = function (data, totalItems) {
        customgrid.DataSource = {
            Data: data,
            Total: totalItems
        };

        customgrid.SetPages(totalItems);
    };

    customgrid.SetPages = function (totalItems) {
        customgrid.Paging.IsLastPage = false;
        customgrid.Paging.Pages = [];
        customgrid.Paging.TotalPages = Math.ceil(totalItems / customgrid.Paging.PageSize);

        var pageInterval = Math.floor(customgrid.Paging.PageIndex / _PagesOffet);
        var startPageIndex = pageInterval == 0 ? 1 : pageInterval * _PagesOffet;
        var lastPageIndex = pageInterval == 0 ? _PagesOffet : startPageIndex + (_PagesOffet - 1);
        var currentItemsCount = customgrid.Paging.PageIndex * customgrid.Paging.PageSize;

        if (lastPageIndex >= customgrid.Paging.TotalPages) {
            lastPageIndex = customgrid.Paging.TotalPages;
            startPageIndex = startPageIndex == 1 || lastPageIndex - _PagesOffet < 1 ? 1 : lastPageIndex - _PagesOffet;
        }

        for (var i = startPageIndex; i <= lastPageIndex; i++) {
            customgrid.Paging.Pages.push(i);
        }

        customgrid.Paging.IsFirstPage = customgrid.Paging.PageIndex === 1;
        customgrid.Paging.IsLastPage = customgrid.Paging.PageIndex === customgrid.Paging.TotalPages || customgrid.Paging.TotalPages == 0;
        customgrid.Paging.CurrentItemsCount = currentItemsCount >= totalItems ? totalItems : currentItemsCount;
    };

})(app.CustomGrid = {});

'use strict'

var app = app || {};

(function (navigatorutils) {
    navigatorutils.navigate = function (sourcePosition, destinationPosition, app) {
        launchnavigator.navigate([destinationPosition.latitude, destinationPosition.longitude], {
            start: [sourcePosition.latitude, sourcePosition.longitude],
            app: app,
            transportMode:launchnavigator.TRANSPORT_MODE.DRIVING,
            launchMode: launchnavigator.LAUNCH_MODE.MAPS
        });
    };

    function getAndroidDafaultApp(platform) {
        var dfd = jQuery.Deferred();

        launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, function (isAvailable) {
            if (isAvailable) {
                dfd.resolve(launchnavigator.APP.GOOGLE_MAPS);
            }
            else {
                launchnavigator.isAppAvailable(launchnavigator.APP.GEO, function (isAvailable) {
                    if (isAvailable) {
                        dfd.resolve(launchnavigator.APP.GEO);
                    }
                    else {
                        dfd.resolve('GOOGLE_WEB_BROWSER');
                    }
                });
            }
        });

        return dfd.promise();
    };

    function getIOSDafaultApp(platform) {
        var dfd = jQuery.Deferred();

        launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, function (isAvailable) {
            if (isAvailable) {
                dfd.resolve(launchnavigator.APP.GOOGLE_MAPS);
            }
            else {
                launchnavigator.isAppAvailable(launchnavigator.APP.APPLE_MAPS, function (isAvailable) {
                    if (isAvailable) {
                        dfd.resolve(launchnavigator.APP.APPLE_MAPS);
                    }
                    else {
                        dfd.resolve('GOOGLE_WEB_BROWSER');
                    }
                });
            }
        });

        return dfd.promise();
    };

})(app.NavigatorUtils = {});


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

'use strict'

var app = app || {};

(function (utils) {

    utils.appVariables = {
        lastLocation: null,
        currentLocation: null,
        isLocationServicesEnabled: false,
        lastLocationDate: null
    };

    utils.setNonCachedImageFileName = function (imageFileName) {
        var currentDate = new Date();
        var h = currentDate.getHours();
        var m = currentDate.getMinutes();
        var s = currentDate.getSeconds();

        return imageFileName + '?imagedate=' + h + ':' + m + ':' + s;
    };

    utils.indexOf = function (array, itemValue, propertyValue) {
        var itemIndex = -1;

        if (!array) {
            return itemIndex;
        }

        for (var i = 0; i < array.length; i++) {
            var arrayItem = array[i];

            if (propertyValue) {
                var properties = propertyValue.split('.');
                for (var j = 0; j < properties.length; j++) {
                    arrayItem = arrayItem[properties[j]];
                }
            }

            if (arrayItem == itemValue) {
                itemIndex = i;
                return itemIndex;
            }
        }

        return itemIndex;
    };

    utils.clearArray = function (array) {

        if (!array || !array.length) {
            return;
        }

        var arrayLength = array.length;

        for (var i = 0; i < arrayLength; i++) {
            array.pop();
        }
    }

    utils.calculateAmountExclVat = function (amountInclVat, vatRate) {
        if (!amountInclVat || !vatRate || isNaN(amountInclVat) || isNaN(vatRate)) {
            return 0;
        }

        var vatRateDecimal = parseFloat(vatRate).round(2) / 100;
        var amountInclVatDecimal = parseFloat(amountInclVat).round(2);

        return parseFloat(amountInclVatDecimal - vatRateDecimal * amountInclVatDecimal).round(2);
    };

    utils.calculateAmountInclVat = function (amountExclVat, vatRate) {
        if (!amountExclVat || !vatRate || isNaN(amountExclVat) || isNaN(vatRate)) {
            return 0;
        }

        var vatRateDecimal = parseFloat(vatRate).round(2) / 100;
        var amountExclVatDecimal = parseFloat(amountExclVat).round(2);

        return parseFloat(vatRateDecimal * amountExclVatDecimal + amountExclVatDecimal).round(2);
    };

    utils.calculateAmountInclVat = function (amountExclVat, vatRate) {
        if (!amountExclVat || !vatRate || isNaN(amountExclVat) || isNaN(vatRate)) {
            return 0;
        }

        var vatRateDecimal = parseFloat(vatRate).round(2) / 100;
        var amountExclVatDecimal = parseFloat(amountExclVat).round(2);

        return parseFloat(vatRateDecimal * amountExclVatDecimal + amountExclVatDecimal).round(2);
    };

    utils.isDateLesser = function (value, compareToValue) {
        if (value == '' || compareToValue == '') {
            return true;
        }

        var compareToDate = new Date(getYear(compareToValue), getMonth(compareToValue), getDay(compareToValue), getHours(compareToValue), getMinutes(compareToValue), getSeconds(compareToValue));
        var valueDate = new Date(getYear(value), getMonth(value), getDay(value), getHours(value), getMinutes(value), getSeconds(value));

        return valueDate < compareToDate;
    };

    utils.isDateLesserOrEqual = function (value, compareToValue) {
        if (value == '' || compareToValue == '') {
            return true;
        }

        var compareToDate = new Date(getYear(compareToValue), getMonth(compareToValue), getDay(compareToValue), getHours(compareToValue), getMinutes(compareToValue), getSeconds(compareToValue));
        var valueDate = new Date(getYear(value), getMonth(value), getDay(value), getHours(value), getMinutes(value), getSeconds(value));

        return valueDate <= compareToDate;
    };

    utils.isDateGreaterThanToday = function (value) {
        if (value == '') {
            return true;
        }

        var compareToDate = new Date();
        var valueDate = new Date(getYear(value), getMonth(value), getDay(value), getHours(value), getMinutes(value), getSeconds(value));

        compareToDate.setHours(0, 0, 0, 0)

        return valueDate >= compareToDate;
    };

    utils.isDateLesserThanToday = function (value) {
        if (value == '') {
            return true;
        }

        var compareToDate = new Date();
        var valueDate = new Date(getYear(value), getMonth(value), getDay(value), getHours(value), getMinutes(value), getSeconds(value));

        return valueDate <= compareToDate;
    };

    utils.createYearRange = function () {
        var currentDate = new Date();

        var currentYear = currentDate.getFullYear();
        var years = [];

        years.push(currentYear);

        for (var i = 1; i < 10; i++) {
            years.push(currentYear - i);
        }

        return years;
    };

    Number.prototype.round = function (places) {
        return +(Math.round(this + "e+" + places) + "e-" + places);
    };

    utils.stringToDate = function (dateText) {
        if (!dateText) {
            return '';
        }

        if (dateText instanceof Date) {
            return dateText;
        }

        return new Date(getYear(dateText), getMonth(dateText), getDay(dateText));
    };

    utils.share = function () {
        var options = {
            message: 'share this', // not supported on some apps (Facebook, Instagram)
            subject: 'the subject', // fi. for email
            files: ['', ''], // an array of filenames either locally or remotely
            url: 'https://www.website.com/foo/#bar?a=b',
            chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
        }

        window.plugins.socialsharing.shareWithOptions(options, onShareSuccess, onShareError);
    };

    function onShareSuccess(result) {
        console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
        console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        utils.displayModal('Success!', 'Sharing comleted successfully.');
    };

    function onShareError(msg) {
        utils.displayModal('Error!', 'Error occured while trying to share the information . Please try again later.');
    };

    utils.getCurrentLocation = function(successFunction) {
        if (!utils.appVariables.isLocationServicesEnabled) {
            return;
        }

        navigator.geolocation.getCurrentPosition(function (position) {
            locationSuccess(position);
            successFunction();
        }, locationError, { maximumAge: 3000, timeout: 30000, enableHighAccuracy: true });
    };

    function locationSuccess(position) {
        utils.appVariables = {
            lastLocation: position.coords,
            currentLocation: position.coords,
            lastLocationDate: new Date()
        };
    };

    function locationError(error) {
        utils.appVariables = {
            currentLocation: null
        };

        utils.displayModal('Error!', 'Error retrieving location, please ensure that gps location is enabled. Please try again later.');
    };

    utils.displayModal = function (options) {
        $('#error-modal-title').text('');
        $('#error-modal-content').text('');

        if (options.header) {
            $('#error-modal-title').text(options.header);
        }

        if (options.message) {
            $('#error-modal-content').text(options.message);
        }

        $('#error-modal').modal('show');
    };


    function getYear(dateText) {
        var year = dateText.split('/')[2].split(' ')[0];
        return year;
    }

    function getMonth(dateText) {
        var month = dateText.split('/')[1] - 1;
        return month;
    }

    function getDay(dateText) {
        var day = dateText.split('/')[0];
        return day;
    }

    function getHours(dateText) {
        if (dateText.split('/').length > 2 && dateText.split('/')[2].split(' ').length > 1) {
            var hours = dateText.split('/')[2].split(' ')[1].split(':')[0];
            return hours;
        }

        return '0';
    }

    function getMinutes(dateText) {
        if (dateText.split('/').length > 2 && dateText.split('/')[2].split(' ').length > 1) {
            var minutes = dateText.split('/')[2].split(' ')[1].split(':')[1];
            return minutes;
        }

        return '0';
    }

    function getSeconds(dateText) {
        if (dateText.split('/').length > 2 && dateText.split('/')[2].split(' ').length > 1) {
            var seconds = dateText.split('/')[2].split(' ')[1].split(':')[2];
            return seconds;
        }

        return '0';
    }

})(app.Utils = {});


'use strict'

var app = app || {};

(function (routesmanager) {
    routesmanager.initialise = function (stateProvider) {
        stateProvider
          .state('home', {
              url: "/home",
              templateUrl: "app/components/home/views/homeView.html",
              controller: 'homeController'
          })
          .state('aboutus', {
              url: "/aboutus",
              templateUrl: "app/components/aboutus/aboutUsView.html",
              controller: 'appController'
          })
          .state('main', {
              url: "/main",
              templateUrl: "app/components/main/mainView.html",
              controller: 'mainController',
          })
          .state('salons', {
              url: "/salons",
              templateUrl: "app/components/salons/salonsView.html",
              controller: 'salonsController'
          })
          .state('services', {
              url: "/services",
              templateUrl: "app/components/services/servicesView.html",
              controller: 'servicesController'
          })
          .state('contactus', {
              url: "/contactus",
              templateUrl: "app/components/contactus/contactusView.html",
              controller: 'contactusController'
          })
          .state('beautytips', {
              url: "/beautytips",
              templateUrl: "app/components/beautytips/beautyTipsView.html",
              controller: 'beautyTipsController'
          })
          .state('registersalon', {
              url: "/registersalon",
              templateUrl: "app/components/registersalon/registerSalonView.html",
              controller: 'registerSalonController'
          })
          .state('salon', {
              url: "/salon/:salonId",
              templateUrl: "app/components/salon/salonView.html",
              controller: 'salonController'
          })
          .state('promotionproducts', {
              url: "/promotionproducts",
              templateUrl: "app/components/promotionproducts/promotionProductsView.html",
              controller: 'promotionProductsController'
          })
        .state('salondirection', {
            url: "/salondirection/:salonId",
            templateUrl: "app/components/salondirection/salonDirectionView.html",
            controller: 'salonDirectionController'
        })
        .state('shareapp', {
            url: "/shareapp",
            templateUrl: "app/components/shareapp/shareAppView.html",
            controller: 'shareAppController'
        })
        .state('technicalreport', {
            url: "/technicalreport",
            templateUrl: "app/components/technicalreport/technicalReportView.html",
            controller: 'technicalReportController'
        })
        .state('salonlocationfinder', {
            url: "/salonlocationfinder",
            templateUrl: "app/components/salonlocationfinder/salonLocationFinderView.html",
            controller: 'salonLocationFinderController'
        })
        .state('userregistration', {
            url: "/userregistration",
            templateUrl: "app/components/userregistration/userRegistrationView.html",
            controller: 'userRegisterSalonController'
        });
    };

})(app.RoutesManager = {});


(function () {
    'use strict';

    angular.module('app', ['ui.router', 'ngAnimate', 'ngSanitize', 'ngCookies', 'ngResource', 'ui.bootstrap', 'toastr', 'geolocation', 'uiGmapgoogle-maps', 'infinite-scroll']);

})();


(function () {
    'use strict';

    angular.module('app').config(appConfig);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', '$compileProvider'];

    function appConfig($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider) {
        $httpProvider.interceptors.push('appHttpInterceptorFactory');
        $httpProvider.defaults.useXDomain = true;
        $compileProvider.debugInfoEnabled(false);
        configRoutes($stateProvider, $urlRouterProvider);
    };

    function configRoutes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/main");
        app.RoutesManager.initialise($stateProvider);
    };

})();

(function () {
    'use strict';

    angular.module('app').run(['appFactory', '$rootScope', '$interval', 'utilsFactory', function (appFactory, $rootScope, $interval, utilsFactory) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            appFactory.ManageUrlRedirects(event, fromState, toState);
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
        });

        $rootScope.isLoading = true;
        $rootScope.loadingMessage = 'Switching on location services.';

        utilsFactory.switchOnGPSLocationServices().then(function (response) {

            if (!appFactory.isLocationServicesEnabled) {

                $rootScope.isLoading = false;
                $rootScope.loadingMessage = '';
                return;
            }

            $rootScope.loadingMessage = 'Retrieving current location.';

            utilsFactory.getCurrentLocation().then(function (data) {
                $rootScope.loadingMessage = 'Retrieving current location full address.';

                utilsFactory.getCurrentLocationAddress(appFactory.location).then(function (data) {
                    $rootScope.isLoading = false;
                    $rootScope.loadingMessage = '';
                });
            });
        });

        var locationInterval = $interval(function () {
            $rootScope.loadingMessage = 'Retrieving current location.';

            utilsFactory.getCurrentLocation().then(function (data) {
                $rootScope.loadingMessage = 'Retrieving current location full address.';

                utilsFactory.getCurrentLocationAddress(appFactory.location).then(function (data) {
                    $rootScope.isLoading = false;
                    $rootScope.loadingMessage = '';
                });
            });
        }, 300000);

    }]);
})();
'use strict';

var menus = {
    Company: {
        MenuItems: [
            { DisplayName: 'Company', path: 'company', module: 'Company', QueryParameters: ['companyId'] },
            { DisplayName: 'Employees', path: 'employees', module: 'Employees', QueryParameters: ['companyId'] },
            //{ DisplayName: 'Company Set Up', path: 'companysetup', module: 'Company', QueryParameters: ['companyId'] },
            { DisplayName: 'Users', path: 'companyusers', module: 'Company', QueryParameters: ['companyId'] }
        ]
    },
    Organisation: {
        MenuItems: [
            { DisplayName: 'Organisation', path: 'organisation', module: 'Organisation', QueryParameters: ['organisationId'] },
            { DisplayName: 'Users', path: 'organisationusers', module: 'Organisation Users', QueryParameters: ['organisationId'] }
        ]
    },
    SarsConfigurations: {
        MenuItems: [
            { DisplayName: 'Tax Tables', module: 'Tax Tables', path: 'taxtables' },
            { DisplayName: 'Allowances', module: 'Allowances', path: 'allowances' },
            { DisplayName: 'Pension Rules', module: 'Pension Rules', path: 'pensionrules' },
            { DisplayName: 'RAF Rules', module: 'RAF Rules', path: 'rafrules' },
            { DisplayName: 'Medical Aid Credits', module: 'Medical Aid Credits', path: 'medicalaidcredits' }
        ]
    }
};
var anonymousStates = { 'login': true, 'forgotpassword': true, 'resetpassword': true, 'changepassword': true };

//angular.module('app').constant('ServerBaseUrl', 'http://essentials4women.co.za/');
//angular.module('app').constant('ServerBaseUrl', 'https://sqswomenessentailapiqa.azurewebsites.net/');
angular.module('app').constant('ServerBaseUrl', 'http://localhost:64707/');
angular.module('app').constant('ServerApiBaseUrl', 'http://localhost:64707/api/');
//angular.module('app').constant('ServerApiBaseUrl', 'https://sqswomenessentailapiqa.azurewebsites.net/api/');
///angular.module('app').constant('ServerApiBaseUrl', 'http://essentials4women.co.za/api/');
angular.module('app').constant('SubMenuItems', menus);
angular.module('app').constant('AnonymousStates', anonymousStates);
(function () {

    'use strict';

    angular.module('app').controller('appController', AppController);

    AppController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'appFactory', 'notificationFactory', 'SubMenuItems', 'AnonymousStates'];

    function AppController($scope, $rootScope, $state, $stateParams, appFactory, notificationFactory, SubMenuItems, AnonymousStates) {
        var viewModel = $scope;

        viewModel.appFactory = appFactory;
        viewModel.viewProfile = viewprofile;
        viewModel.changePassword = changepassword;
        viewModel.editOrganisation = editorganisation;
        viewModel.goToMenuItem = goToMenuItem;
        viewModel.goToHome = goToHome;
        viewModel.subMenuItems = [];
        viewModel.currentNavItem = '';

        $scope.$on('server-error-occurred', function (event, data) {
            data.controller = errorController;
            notificationFactory.open(data);
        });

        $scope.$on('state-changed', function (event, data) {
            viewModel.currentNavItem = '';
            viewModel.subMenuItems = !viewModel.appFactory.User || !viewModel.appFactory.User.AccessModules ? [] : app.RoutesManager.getMenuItems(viewModel.appFactory.User.AccessModules, SubMenuItems, data.name);

            if (viewModel.subMenuItems && viewModel.subMenuItems.length > 0) {
                viewModel.currentNavItem = viewModel.subMenuItems[0].DisplayName;
            }
        });

        function viewprofile(e) {
            e.preventDefault();

            $state.go('userprofile', { userProfileId: appFactory.User.Id });
        };

        function changepassword(e) {
            e.preventDefault();

            $state.go('changepassword');
        };

        function editorganisation() {
            $state.go('organisation', { organisationId: appFactory.User.OrganisationId });
        };

        function goToMenuItem(menuItem) {
            var queryStrings = {};

            viewModel.currentNavItem = menuItem.DisplayName;

            if (menuItem.QueryParameters && menuItem.QueryParameters.length > 0) {
                for (var i = 0; i < menuItem.QueryParameters.length > 0; i++) {
                    queryStrings[menuItem.QueryParameters[i]] = $stateParams[menuItem.QueryParameters[i]];
                }
            }

            $state.go(menuItem.path, queryStrings);
        };

        function goToHome(e) {
            e.preventDefault();

            if ($state.current.sessionState && $state.current.sessionState.home) {
                $state.go($state.current.sessionState.home);
            }

            //if (AnonymousStates[$state.current.name] && !appFactory.User) {
            //    $state.go('login');
            //    return;
            //}

            //var landingRoute = app.RoutesManager.getLandingRoute(appFactory.User.AccessModules, $state.get());

            //$state.go(landingRoute.name);
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').directive('accessControl', accessControlDirective);

    accessControlDirective.$inject = ['$state', 'appFactory'];

    function accessControlDirective($state, appFactory) {
        var directive = {
            restrict: 'A',
            link: linkFunction,
            scope: {
                module: '@'
            }
        };

        function linkFunction(scope, element, attributes) {
            appFactory.Initialise();

            if (appFactory.User && appFactory.User.AccessModules && app.RoutesManager.canModuleAccessRoute(appFactory.User.AccessModules, scope.module)) {
                $(element).show();
                return;
            }

            $(element).hide();
        };

        return directive;
    };

})();
(function () {

    'use strict';

    angular.module('app').directive('appGrid', appGrid);

    appGrid.$inject = ['$rootScope'];

    function appGrid($rootScope) {
        var directive = {
            restrict: 'A',
            link: linkFunction,
            scope: {
                appGrid: '=',
                gridOptions: '=appGridOptions'
            }
        };

        function linkFunction(scope, element, attributes) {
            var gridName = attributes.appGrid ? attributes.appGrid : 'appGrid';

            scope.appGrid = app.CustomGrid;
            scope.appGrid.setOptions(scope.gridOptions);

            $rootScope.$broadcast('app-grid-rendered', { name: gridName, grid: scope.appGrid });
        };

        return directive;
    };

})();
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
(function () {

    'use strict';

    angular.module('app').directive('convertToNumber', convertToNumber);

    function convertToNumber() {
        var directive = {
            restrict: 'A',
            require: 'ngModel',
            link: linkFunction
        };

        function linkFunction(scope, element, attributes, ngModel) {
            ngModel.$parsers.push(function (val) {
                return parseInt(val, 10);
            });
            ngModel.$formatters.push(function (val) {
                if (!val) {
                    return '';
                }

                return '' + val;
            });
        };

        return directive;
    };


    angular.module('app').directive('convertToDate', convertToDate);

    convertToDate.$inject = ['utilsFactory'];

    function convertToDate(utilsFactory) {
        var directive = {
            restrict: 'A',
            require: 'ngModel',
            link: linkFunction
        };

        function linkFunction(scope, element, attributes, ngModel) {
            ngModel.$parsers.push(function (val) {
                return utilsFactory.stringToDate(val);
            });

            ngModel.$formatters.push(function (val) {

                if (val instanceof Date) {
                    return val;
                }

                return utilsFactory.stringToDate(val);
            });
        };

        return directive;
    };

    angular.module('app').directive('fileUploadInput', fileUploadInput);

    fileUploadInput.$inject = ['$rootScope'];

    function fileUploadInput($rootScope) {
        var directive = {
            restrict: 'A',
            require: 'ngModel',
            link: linkFunction
        };

        function linkFunction(scope, element, attributes, ngModel) {
            scope.$watch(attributes.fileUploadInput, function (oldValue, newValue) {
                if (oldValue != newValue) {
                    $rootScope.$broadcast('file-uploaded', $(element));
                }
            });

        };

        return directive;
    };

})();


(function () {

    'use strict';

    angular.module('app').directive('googlePlacesInput', googlePlacesInputDirective);

    googlePlacesInputDirective.$inject = ['$rootScope'];

    function googlePlacesInputDirective($rootScope) {
        var directive = {
            restrict: 'A',
            link: linkFunction,
            scope: {

            }
        };

        function linkFunction(scope, element, attributes) {
            var autocomplete = new google.maps.places.Autocomplete(element[0], { types: ['geocode'] });

            autocomplete.addListener('place_changed', fillInAddress);

            function fillInAddress() {
                var place = autocomplete.getPlace();

                $rootScope.$broadcast('google-map-place-updated', place);
            }
        };

        return directive;
    };

})();
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
errorController.$inject = ['$scope', '$rootScope', '$uibModalInstance'];

function errorController($scope, $rootScope, $uibModalInstance) {
    $rootScope.isLoading = false;

    $scope.closeDialog = function () {
        $uibModalInstance.dismiss();
    };
};
(function () {

    'use strict';

    angular.module('app').factory('appFactory', AppFactory);

    AppFactory.$inject = ['$state'];

    function AppFactory($state) {
        var user, userDisplayName, token;

        var factory = {
            ManageUrlRedirects: manageUrlRedirects,
            location: null,
            locationAddress: null,
            isLocationServicesEnabled: false,
            Initialise: initialise,
            User: {}
        };

        return factory;

        function initialise() {
            if (localStorage["user"] === null || localStorage["user"] === undefined) {
                factory.User = null;
                return;
            }

            factory.User = JSON.parse(localStorage["user"]);
        }

        function manageUrlRedirects(event, fromState, toState) {

            if (toState.name != 'userregistration' && (localStorage["user"] === null || localStorage["user"] === undefined)) {
                event.preventDefault();
                $state.go('userregistration');
                return;
            }

        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('appHttpInterceptorFactory', appHttpInterceptorFactory);

    appHttpInterceptorFactory.$inject = ['$location', '$rootScope', '$q', 'errorFactory'];

    function appHttpInterceptorFactory($location, $rootScope, $q, errorFactory) {
        var factory = {
            request: request,
            requestError: requestError,
            response: response,
            responseError: responseError
        };

        return factory;

        function request(config) {
            return config;
        };

        function requestError(rejection) {
            return $q.reject(rejection);
        };

        function response(response) {            
            return response;
        };

        function responseError(rejection) {
            errorFactory.handleHttpServerError(rejection);

            $rootScope.$broadcast('action-complete');

            return $q.reject(rejection);
        };
    };

})();

(function () {

    'use strict';

    angular.module('app').factory('appRatingApiFactory', appRatingApiFactory);

    appRatingApiFactory.$inject = ['$http', '$rootScope', '$q', '$upload', 'ServerApiBaseUrl'];

    function appRatingApiFactory($http, $rootScope, $q, $upload, ServerApiBaseUrl) {
        var factory = {
            addAppRating: addAppRating
        };

        return factory;

        function addAppRating(appRating) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/AppRating/AddAppRating',
                data: appRating
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ AppRating: data.Item });
            });

            return deferred.promise;
        };


    };

})();
(function () {

    'use strict';

    angular.module('app').factory('companyApiFactory', companyApiFactory);

    companyApiFactory.$inject = ['$http', '$rootScope', '$q', 'ServerApiBaseUrl'];

    function companyApiFactory($http, $rootScope, $q, ServerApiBaseUrl) {
        var factory = {
            getCompanies: getCompanies,
            getCompany: getCompany,
            addCompanyRating: addCompanyRating,
            addCompanyFeedback: addCompanyFeedback,
            getCompanyFeedbacks: getCompanyFeedbacks,
            addCompanyRequest: addCompanyRequest,
            getBeautytips: getBeautytips
        }

        return factory;

        function getCompanies(searchFilter) {
            var deferred = $q.defer();
            
            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Company/GetAppCompanies',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Companies: data.Items, TotalCompanies: data.TotalItems });
            });

            return deferred.promise;
        };

        function getCompany(companyId, deviceId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Company/FetchCompany/?companyId=' + companyId + '&deviceId=' + deviceId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Company: data.Item });
            });

            return deferred.promise;
        };

        function addCompanyRating(model) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/CompanyRating/AddCompanyRating',
                data: model
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ CompanyRating: data.Item });
            });

            return deferred.promise;
        };

        function addCompanyFeedback(model) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/CompanyFeedback/AddCompanyFeedback',
                data: model
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ CompanyFeedBack: data.Item });
            });

            return deferred.promise;
        };

        function getCompanyFeedbacks(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/CompanyFeedback/GetCompanyFeebacks',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ CompanyFeedbacks: data.Items, TotalCompanyFeedbacks: data.TotalItems });
            });

            return deferred.promise;
        };

        function addCompanyRequest(companyRequest) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/CompanyRequest/AddCompanyRequest',
                data: companyRequest
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ CompanyRequest: data.Item });
            });

            return deferred.promise;
        };

        function getBeautytips(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/BeautyTip/GetBeautyTips',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ BeautyTips: data.Items, TotalBeautyTips: data.TotalItems });
            });

            return deferred.promise;
        }
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('dashboardApiFactory', dashboardApiFactory);

    dashboardApiFactory.$inject = ['$http', '$rootScope', '$q', 'ServerApiBaseUrl'];

    function dashboardApiFactory($http, $rootScope, $q, ServerApiBaseUrl) {
        var factory = {
            getData: getData
        };

        return factory;

        function getData() {
            var deferred = $q.defer();

            $http(
            {
                method: 'GET',
                url: ServerApiBaseUrl + 'Dashboard/GetData'
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Dashboard: data });
            });

            return deferred.promise;
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('errorFactory', errorFactory);

    errorFactory.$inject = ['$rootScope'];

    function errorFactory($rootScope) {
        var errors = {
            0: 'Internal Error',
            1: 'Invalid Request',
            400: 'Bad Request',
            401: 'User is not authorized to use this resource',
            403: 'User is forbidden from accessing the resource',
            405: 'Method Not Allowed',
            407: 'Proxy Authentication Required',
            408: 'Request Timeout'
        };

        var factory = {
            handleHttpServerError: handleHttpServerError
        };

        return factory;

        function handleHttpServerError(httpResponse) {
            var errorCode = httpResponse.status;
            var newScope = $rootScope.$new();

            newScope.model = {
                'ErrorCode': errorCode,
                'ErrorHeader': getErrorTitle(errorCode),
                'ErrorDetails': getErrorDetail(errorCode, httpResponse),
            };

            $rootScope.$broadcast('server-error-occurred', {
                templateUrl: 'errortemplate.html',
                scope: newScope,
                size: 'sm'
            });

        };

        function getErrorTitle(errorCode) {
            if (errorCode <= 0 || errorCode >= 500) {
                return errors[0];
            }

            if (errors[errorCode]) {
                return errors[errorCode];
            }

            if (errorCode >= 400) {
                return errors[1];
            }
        };

        function getErrorDetail(errorCode, httpResponse) {
            if (errorCode <= 0) {
                return 'You are not online. Please check your connectivity and try again';
            }

            if (httpResponse.data && httpResponse.data.Message) {
                switch (errorCode) {
                    case 405:
                        var errorMessage = httpResponse.config.url + ' does not support method ' + httpResponse.config.method;
                        return errorMessage;
                    default:
                        return httpResponse.data.Message;
                }
            }

            return httpResponse.statusText;
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('lookupApiFactory', lookupApiFactory);

    lookupApiFactory.$inject = ['$http', '$q', 'ServerApiBaseUrl'];

    function lookupApiFactory($http, $q, ServerApiBaseUrl) {
        var factory = {
            getCompanyTypes: getCompanyTypes,
            getSubCategories: getSubCategories,
            getContactDetails: getContactDetails,
            saveDeviceDetails: saveDeviceDetails,
            logGoToCompany: logGoToCompany
        };

        return factory;

        function getCompanyTypes(searchFilter) {
            return getResultSet(searchFilter, ServerApiBaseUrl + 'Lookup/GetCompanTypes');
        };

        function getSubCategories(searchFilter) {
            return getResultSet(searchFilter, ServerApiBaseUrl + 'Lookup/GetSubCategories');
        };

        function getResultSet(searchFilter, url) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: url,
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            });

            return deferred.promise;
        };

        function getContactDetails() {
            var deferred = $q.defer();

            $http(
            {
                method: 'GET',
                url: ServerApiBaseUrl + 'Lookup/GetContactDetails'
            })
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            });

            return deferred.promise;
        };

        function saveDeviceDetails(model) {
            var deferred = $q.defer();

            $http(
            {
                method: 'Post',
                url: ServerApiBaseUrl + 'Lookup/SaveDeviceDetails',
                data: model
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ DeviceDetail: data.Item });
            });

            return deferred.promise;
        };


        function logGoToCompany(companyId, deviceId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'Post',
                url: ServerApiBaseUrl + 'Lookup/LogGoToCompany?companyId=' + companyId + '&deviceId=' + deviceId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve();
            });

            return deferred.promise;
        };

    };

})();
(function () {

    'use strict';

    angular.module('app').factory('notificationFactory', notificationFactory);

    notificationFactory.$inject = ['$uibModal'];

    function notificationFactory($uibModal) {
        var factory = {
            open: open
        };

        return factory;

        function open(options) {
            if (!options || !options.templateUrl || !options.controller || !options.scope) {
                return;
            }

            var animation = options.animation ? options.animation : false;
            var size = options.size ? options.size : 'lg';

            var modalInstance = $uibModal.open({
                templateUrl: options.templateUrl,
                controller: options.controller,
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                fullscreen: false,
                backdrop: 'static',
                escapeToClose: false,
                scope: options.scope,
                size: size
            });

            return modalInstance;
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('productApiFactory', productApiFactory);

    productApiFactory.$inject = ['$http', '$rootScope', '$q', 'ServerApiBaseUrl'];

    function productApiFactory($http, $rootScope, $q, ServerApiBaseUrl) {
        var factory = {
            getProducts: getProducts,
            getPromotionProducts: getPromotionProducts,
            getProduct: getProduct
        };

        return factory;

        function getProducts(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Product/GetAppProducts',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Products: data.Items, TotalProducts: data.TotalItems });
            });

            return deferred.promise;
        };

        function getProduct(productId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Product/FetchProduct/?productId=' + productId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Product: data.Item });
            });

            return deferred.promise;
        };

        function getPromotionProducts(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'PromotionProduct/GetAppPromotionProducts',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ PromotionProducts: data.Items, TotalPromotionProducts: data.TotalItems });
            });

            return deferred.promise;
        }
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('utilsFactory', utilsFactory);

    utilsFactory.$inject = ['$http', '$q', 'appFactory'];

    function utilsFactory($http, $q, appFactory) {
        var factory = {
            stringToDate: stringToDate,
            getCurrentLocation: getCurrentLocation,
            getCurrentLocationAddress: getCurrentLocationAddress,
            switchOnGPSLocationServices: switchOnGPSLocationServices
        };

        return factory;

        function switchOnGPSLocationServices() {
            var deferred = $q.defer();

            if (!window.device) {
                navigator.permissions && navigator.permissions.query({ name: 'geolocation' }).then(function (PermissionStatus) {
                    if (PermissionStatus.state == 'granted') {
                        appFactory.isLocationServicesEnabled = true;
                        //allowed
                    } else {
                        appFactory.isLocationServicesEnabled = false;
                        //denied
                    }
                    deferred.resolve();
                })
                return deferred.promise;
            }

            var deferred = $q.defer();

            cordova.plugins.diagnostic.isLocationAvailable(function (available) {
                if (!available) {
                    cordova.plugins.locationAccuracy.request(function () {
                        appFactory.isLocationServicesEnabled = true;
                        deferred.resolve();
                    }, function () {
                        appFactory.isLocationServicesEnabled = false;
                        deferred.resolve();
                    }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
                }
                else {
                    appFactory.isLocationServicesEnabled = true;
                    deferred.resolve();
                }
            }, function (error) {
                appFactory.isLocationServicesEnabled = false;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function getCurrentLocation() {
            var deferred = $q.defer();

            navigator.geolocation.getCurrentPosition(function (data) {
                appFactory.location = data.coords;
                deferred.resolve({ Position: data.coords });
            }, function () {
                getCurrentLocationUsingGoogleMaps(deferred).then(function (response) {
                    appFactory.location = response.Position;
                    deferred.resolve({ Position: response.Position });
                }, function () {
                    appFactory.location = null;
                    deferred.reject({
                        'ErrorCode': 408,
                        'ErrorHeader': 'Error retrieving location',
                        'ErrorDetails': 'Error retrieving location, please ensure that gps location is enabled.'
                    });
                });
            }, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });

            return deferred.promise;
        };

        function getCurrentLocationUsingGoogleMaps() {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB7Dp0M7lBi97YoSYlpgt_7IDCMeXEZBiQ"
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Position: { latitude: data.location.lat, longitude: data.location.lng } });
            });

            return deferred.promise;
        };

        function getCurrentLocationAddress(position) {
            var deferred = $q.defer();

            $http(
            {
                method: 'GET',
                url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.latitude + "," + position.longitude + "&key=AIzaSyAXNExX0Fa99nRDq8xAZv93oiL8MI-b-Ew",
            })
            .success(function (data, status, headers, config) {
                appFactory.locationAddress = data.results[0].formatted_address;
                deferred.resolve({ address: data.results[0].formatted_address });
            }, function () {
                appFactory.locationAddress = null;
                deferred.reject({
                    'ErrorCode': 408,
                    'ErrorHeader': 'Error retrieving location',
                    'ErrorDetails': 'Error retrieving location, please ensure that gps location is enabled.'
                });
            });

            return deferred.promise;
        };

        //function onRequestSuccess(success) {
        //    appFactory.isLocationServicesEnabled = true;
        //};

        //function onRequestFailure(error) {
        //    if (error) {
        //        if (error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
        //            if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
        //                cordova.plugins.diagnostic.switchToLocationSettings();
        //                appFactory.isLocationServicesEnabled = true;
        //                loadGoogleMapsApi();
        //            }
        //            else {
        //                appFactory.isLocationServicesEnabled = false;
        //                loadGoogleMapsApi();
        //            }
        //        }
        //    }
        //};

        function stringToDate(dateText) {
            if (!dateText) {
                return '';
            }

            if (dateText instanceof Date) {
                return dateText;
            }

            return new Date(getYear(dateText), getMonth(dateText), getDay(dateText));
        };

        function getYear(dateText) {
            var year = dateText.split('/')[2].split(' ')[0];
            return year;
        };

        function getMonth(dateText) {
            var month = dateText.split('/')[1];

            if (month > 0) {
                month = month - 1;
            }
            return month;
        };

        function getDay(dateText) {
            var day = dateText.split('/')[0];
            return day;
        };

        function getHours(dateText) {
            if (dateText.split('/')[2].split(' ').length == 1) {
                return 2;
            }

            var hours = dateText.split('/')[2].split(' ')[1].split(':')[0];
            return hours;
        };

        function getMinutes(dateText) {
            if (dateText.split('/')[2].split(' ').length == 1) {
                return 0;
            }
            var minutes = dateText.split('/')[2].split(' ')[1].split(':')[1];
            return minutes;
        };

        function getSeconds(dateText) {
            if (dateText.split('/')[2].split(' ').length == 1) {
                return 0;
            }
            var seconds = dateText.split('/')[2].split(' ')[1].split(':')[2];
            return seconds;
        };

        function getAddress(addressItems) {

        }
    };

})();
(function () {

    'use strict';

    angular.module('app').filter('percentageFilter', PercentageFilter);

    function PercentageFilter() {
        var filter = percentageFormat;

        return filter;

        function percentageFormat(x) {
            if (isNaN(x)) {
                return x;
            }

            var number = parseFloat(x);

            return (number * 100).toFixed(2);
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').controller('beautyTipsController', beautyTipsController);

    beautyTipsController.$inject = ['$scope', '$rootScope', '$state', 'beautyTipsFactory'];

    function beautyTipsController($scope, $rootScope, $state, beautyTipsFactory) {
        var viewModel = $scope

        viewModel.beautyTipsFactory = beautyTipsFactory;
        viewModel.SearchFilter = {
            StatusCode: 'ACTIVE',
            PageData: {
                Take: 30,
                Skip: 0,
                SortColumn: 'CreateDate',
                SortOrder: 2
            }
        };
        viewModel.searchBeautyTips = searchBeautyTips;

        $rootScope.isLoading = true;
        $rootScope.loadingMessage = 'Loading Services ...';

        viewModel.beautyTipsFactory.initialise(viewModel.SearchFilter).then(function (data) {
            $rootScope.isLoading = false;
        })
        
        function searchBeautyTips() {
            viewModel.beautyTipsFactory.searchBeautyTips(viewModel.SearchFilter)
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('beautyTipsFactory', beautyTipsFactory);

    beautyTipsFactory.$inject = ['$q', '$rootScope', 'companyApiFactory', 'lookupApiFactory'];

    function beautyTipsFactory($q, $rootScope, companyApiFactory, lookupApiFactory) {
        var factory = {
            initialise: initialise,
            searchBeautyTips: searchBeautyTips,
            services: [],
            beautyTips: []
        };

        return factory;

        function initialise(searchFilter) {
            var deferred = $q.defer();
            var promises = {
                companyPromise: companyApiFactory.getBeautytips(searchFilter),
                subCategoriesPromise: lookupApiFactory.getSubCategories({ PageData: { IncludeAllData: true } })
            };

            factory.product = {};

            $q.all(promises).then(function (data) {
                factory.beautyTips = data.companyPromise.BeautyTips;
                factory.services = data.subCategoriesPromise.Items;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function searchBeautyTips(searchFilter) {
            var deferred = $q.defer();

            companyApiFactory.getBeautytips(searchFilter).then(function (data) {
                factory.beautyTips = data.BeautyTips;
                deferred.resolve();
            });

            return deferred.promise;
        };

    };

})();
(function () {

    'use strict';

    angular.module('app').controller('contactusController', contactusController);

    contactusController.$inject = ['$scope', '$state', 'lookupApiFactory'];

    function contactusController($scope, $state, lookupApiFactory) {
        var viewModel = $scope

        viewModel.model = {};

        lookupApiFactory.getContactDetails().then(function (data) {
            viewModel.model = data;
        });

        viewModel.share = function () {
            app.Utils.share();
        };

    };

})();
(function () {

    'use strict';

    angular.module('app').controller('headerController', headerController);

    headerController.$inject = ['$scope', 'notificationFactory', 'appFactory'];

    function headerController($scope, notificationFactory, appFactory) {
        var viewModel = $scope;

        viewModel.viewProfile = viewprofile;
        viewModel.changePassword = changepassword;
        viewModel.editOrganisation = editorganisation;
        viewModel.logout = logout;

        $scope.$on('server-error-occurred', function (event, data) {
            data.controller = errorController;
            notificationFactory.open(data);
        });


        function viewprofile() {

        }

        function changepassword() {

        }

        function editorganisation() {

        }

        function logout() {
            appFactory.LogOut();

        };

    };

})();
(function () {

    'use strict';

    angular.module('app').controller('homeController', HomeController);

    HomeController.$inject = ['$scope', '$state', '$rootScope', 'lookupApiFactory'];

    function HomeController($scope, $state, $rootScope, lookupApiFactory) {
        var viewModel = $scope

        viewModel.goToMain = goToMain;

        //$rootScope.isLoading = true;
      
        if (window.device && !window.device.isVirtual) {

            var model = {
                DeviceId: window.device.uuid,
                DeviceName: window.device.model,
                DevicePlatform: window.device.platform,
                DeviceSerialNumber: window.device.serial
            }

            lookupApiFactory.saveDeviceDetails(model).then(function (data) {
                $rootScope.isLoading = false;
            });
        }
        else {
            $rootScope.isLoading = false;
        }

        function goToMain() {
            $state.go('main');
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').controller('mainController', mainController);

    mainController.$inject = ['$scope', '$state', 'salonsFactory'];

    function mainController($scope, $state, salonsFactory) {
        var viewModel = $scope

        viewModel.goToSalons = goToSalons;
        viewModel.goToPromotions = goToPromotions;
        viewModel.SearchFilter = {};
        viewModel.searchSalons = searchSalons;

        function goToSalons(e) {
            e.preventDefault();

            salonsFactory.searchFilter = {};

            $state.go('salons');
        };

        function goToPromotions(e) {
            e.preventDefault();

            $state.go('promotionproducts');
        };

        function searchSalons() {
            salonsFactory.searchFilter = {
                SearchText: viewModel.SearchFilter.SearchText
            };

            $state.go('salons');
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').controller('promotionProductsController', promotionProductsController);

    promotionProductsController.$inject = ['$scope', '$state', '$rootScope', 'productApiFactory', 'salonsFactory', 'geolocation', 'lookupApiFactory', 'companyApiFactory', 'notificationFactory'];

    function promotionProductsController($scope, $state, $rootScope, productApiFactory, salonsFactory, geolocation, lookupApiFactory, companyApiFactory, notificationFactory) {
        var viewModel = $scope

        viewModel.goToSalonDirection = goToSalonDirection;
        viewModel.subCategories = [];
        viewModel.promotions = [];
        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: salonsFactory.searchFilter.SearchText,
            SubCategoryId: salonsFactory.searchFilter.SubCategoryId
        };

        $rootScope.isLoading = true;
        $rootScope.loadingMessage = 'Loading Promotions, please wait ...';

        navigator.geolocation.getCurrentPosition(function (position) {
            viewModel.SearchFilter.Latitude = position.coords.latitude;
            viewModel.SearchFilter.Longitude = position.coords.longitude;
            lookupApiFactory.getSubCategories({ PageData: { IncludeAllData: true } }).then(function (response) {
                viewModel.subCategories = response.Items;

                productApiFactory.getPromotionProducts(viewModel.SearchFilter).then(function (response) {
                    viewModel.promotions = response.PromotionProducts
                    $rootScope.isLoading = false;
                });
            });
        }, locationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });

        function goToSalonDirection(salonId) {
            if (!window.device) {
                return $state.go('salondirection', { salonId: salonId });
            }

            var platform = device.platform.toLowerCase();

            launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, function (isAvailable) {
                if (isAvailable) {
                    navigate(launchnavigator.APP.GOOGLE_MAPS, salonId);
                }
                else if (platform == "android") {
                    launchnavigator.isAppAvailable(launchnavigator.APP.GEO, function (isAppAvailable) {
                        if (isAppAvailable) {
                            navigate(launchnavigator.APP.GEO, salonId);
                        }
                        else {
                            return $state.go('salondirection', { salonId: salonId });
                        }
                    });
                }
                else if (platform == "ios") {
                    launchnavigator.isAppAvailable(launchnavigator.APP.APPLE_MAPS, function (isAppAvailable) {
                        if (isAppAvailable) {
                            navigate(launchnavigator.APP.APPLE_MAPS, salonId);
                        }
                        else {
                            return $state.go('salondirection', { salonId: salonId });
                        }
                    });
                }
            });
        };

        function navigate(navigatorApp, salonId) {
            $rootScope.isLoading = true;
            $rootScope.loadingMessage = 'Navigating, please wait ...';

            navigator.geolocation.getCurrentPosition(function (position) {
                companyApiFactory.getCompany(salonId).then(function (data) {
                    app.NavigatorUtils.navigate(position.coords, { latitude: data.Company.PhysicalAddressLatitude, longitude: data.Company.PhysicalAddressLongitude }, navigatorApp);
                    $rootScope.isLoading = false;
                });
            }, locationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });
        };

        function locationError(error) {
            var newScope = $rootScope.$new();

            newScope.model = {
                'ErrorCode': 408,
                'ErrorHeader': 'Error retrieving location',
                'ErrorDetails': 'Error retrieving location, please ensure that gps location is enabled.'
            };

            notificationFactory.open({
                templateUrl: 'errortemplate.html',
                scope: newScope,
                size: 'sm',
                controller: errorController
            });
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').controller('registerSalonController', RegisterSalonController);

    RegisterSalonController.$inject = ['$scope', '$rootScope', '$state', 'companyApiFactory'];

    function RegisterSalonController($scope, $rootScope, $state, companyApiFactory) {
        var viewModel = $scope;

        viewModel.model = {};
        viewModel.register = register;
        viewModel.cancel = cancel;
        viewModel.isRegistrationSucceful = false;

        function register() {
            if (!viewModel.frmRegister.$valid) {
                $rootScope.$broadcast('action-complete', true);
                return;
            }

            companyApiFactory.addCompanyRequest(viewModel.model).then(function (data) {
                viewModel.model = {};
                viewModel.isRegistrationSucceful = true;
            });
        };

        function cancel() {
            $state.go('main');
        };

    };

})();
(function () {

    'use strict';

    angular.module('app').controller('salonController', salonController);

    salonController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'salonFactory', 'notificationFactory', 'companyApiFactory', 'appFactory', 'lookupApiFactory'];

    function salonController($scope, $rootScope, $state, $stateParams, salonFactory, notificationFactory, companyApiFactory, appFactory, lookupApiFactory) {
        var viewModel = $scope;
        var salonId = $stateParams.salonId

        appFactory.Initialise();

        viewModel.salonFactory = salonFactory;
        viewModel.goToSalonDirections = goToSalonDirections;
        viewModel.goToSalons = goToSalons;
        viewModel.viewProducts = viewProducts;
        viewModel.products = [];
        viewModel.categoryName = '';
        viewModel.subCategoryName = '';
        viewModel.backToSubCategories = backToSubCategories;
        viewModel.isLoading = true;
        viewModel.loadingMessage = 'Loading salon details ...';
        viewModel.setRating = setRating;
        viewModel.viewFeedbackHistory = viewFeedbackHistory;
        viewModel.giveFeedback = giveFeedback;

        $scope.rate = 2;

        $scope.hoveringOver = function (value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / 5);
        };

        viewModel.salonFactory.initialise(salonId, appFactory.User.DeviceId).then(function () {
            $rootScope.isLoading = true;
            $rootScope.loadingMessage = 'Navigating, please wait ...';

            $rootScope.isLoading = false;
            $rootScope.loadingMessage = '';
            //navigator.geolocation.getCurrentPosition(function (position) {
            var salonPosition = { lat: Number(viewModel.salonFactory.salon.PhysicalAddressLatitude), lng: Number(viewModel.salonFactory.salon.PhysicalAddressLongitude) }
            var map = new google.maps.Map(document.getElementById('map'), {
                center: salonPosition,
                zoom: 8
            });
            var marker = new google.maps.Marker({
                position: salonPosition,
                map: map
            });
            //}, locationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });
        });

        function goToSalons(e) {
            e.preventDefault();

            $state.go('salons');
        };

        function goToSalonDirections() {
            lookupApiFactory.logGoToCompany(salonId, appFactory.User.DeviceId);

            if (!window.device) {
                return $state.go('salondirection', { salonId: salonId });
            }

            var platform = device.platform.toLowerCase();

            launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, function (isAvailable) {
                if (isAvailable) {
                    navigate(launchnavigator.APP.GOOGLE_MAPS);
                }
                else if (platform == "android") {
                    launchnavigator.isAppAvailable(launchnavigator.APP.GEO, function (isAppAvailable) {
                        if (isAppAvailable) {
                            navigate(launchnavigator.APP.GEO);
                        }
                        else {
                            return $state.go('salondirection', { salonId: salonId });
                        }
                    });
                }
                else if (platform == "ios") {
                    launchnavigator.isAppAvailable(launchnavigator.APP.APPLE_MAPS, function (isAppAvailable) {
                        if (isAppAvailable) {
                            navigate(launchnavigator.APP.APPLE_MAPS);
                        }
                        else {
                            return $state.go('salondirection', { salonId: salonId });
                        }
                    });
                }
            });
        };

        function navigate(navigatorApp) {
            $rootScope.isLoading = true;
            $rootScope.loadingMessage = 'Navigating, please wait ...';

            navigator.geolocation.getCurrentPosition(function (position) {
                app.NavigatorUtils.navigate(position.coords, { latitude: viewModel.salonFactory.salon.PhysicalAddressLatitude, longitude: viewModel.salonFactory.salon.PhysicalAddressLongitude }, navigatorApp);
                $rootScope.isLoading = false;
            }, locationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });
        };

        function viewProducts(e, categoryName, subCategoryName, products) {
            e.preventDefault();

            viewModel.products = products;
            viewModel.categoryName = categoryName;
            viewModel.subCategoryName = subCategoryName;
        };

        function backToSubCategories() {
            viewModel.products = [];
            viewModel.categoryName = '';
            viewModel.subCategoryName = '';
        };

        function locationError(error) {
            var newScope = $rootScope.$new();

            newScope.model = {
                'ErrorCode': 408,
                'ErrorHeader': 'Error retrieving location',
                'ErrorDetails': 'Error retrieving location, please ensure that gps location is enabled. ' + 'Error Code: ' + error.code + 'Error Message: ' + error.message
            };

            notificationFactory.open({
                templateUrl: 'errortemplate.html',
                scope: newScope,
                size: 'sm',
                controller: errorController
            });
        };

        function setRating(rating) {
            companyApiFactory.addCompanyRating({ CompanyId: salonId, Rating: rating }).then(function (response) {

            });
        };

        function viewFeedbackHistory(e) {
            e.preventDefault();

            var newScope = $rootScope.$new();
            newScope.CompanyId = salonId;

            notificationFactory.open({
                templateUrl: 'salon-feedback-history-template.html',
                scope: newScope,
                size: 'sm',
                controller: salonFeedbackHistoryController
            });
        }

        function giveFeedback() {
            var newScope = $rootScope.$new();

            newScope.model = { CompanyId: salonId };

            notificationFactory.open({
                templateUrl: 'salon-feedback-template.html',
                scope: newScope,
                size: 'sm',
                controller: salonFeedbackController
            });
        }

    };

    salonFeedbackHistoryController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'companyApiFactory', 'salonFactory'];

    function salonFeedbackHistoryController($scope, $rootScope, $uibModalInstance, companyApiFactory, salonFactory) {
        var viewModel = $scope;

        viewModel.feedbacks = [];

        var searchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: '',
            CompanyId: viewModel.CompanyId
        };

        viewModel.closeDialog = closeDialog;

        companyApiFactory.getCompanyFeedbacks(searchFilter).then(function (response) {
            viewModel.feedbacks = response.CompanyFeedbacks;
        });

        function closeDialog() {
            $uibModalInstance.dismiss();
        };

    };

    salonFeedbackController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'companyApiFactory', 'salonFactory'];

    function salonFeedbackController($scope, $rootScope, $uibModalInstance, companyApiFactory, salonFactory) {
        var viewModel = $scope;

        viewModel.closeDialog = closeDialog;
        viewModel.addFeedback = addFeedback;

        function closeDialog() {
            $uibModalInstance.dismiss();
        };

        function addFeedback() {
            if (!viewModel.model.Feedback) {
                return;
            }

            companyApiFactory.addCompanyFeedback(viewModel.model).then(function (response) {
                salonFactory.salon.FeedbackCount = salonFactory.salon.FeedbackCount + 1;
                $uibModalInstance.dismiss();
            });
        }
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('salonFactory', salonFactory);

    salonFactory.$inject = ['$q', '$rootScope', 'companyApiFactory', 'productApiFactory'];

    function salonFactory($q, $rootScope, companyApiFactory, productApiFactory) {
        var factory = {
            initialise: initialise,
            salon: {},
            products: []
        };

        return factory;

        function initialise(salonId, deviceId) {
            var deferred = $q.defer();

            var promises = {
                companyPromise: companyApiFactory.getCompany(salonId, deviceId),
                productsPromise: searchProducts(salonId)
            }

            $q.all(promises).then(function (data) {
                factory.salon = data.companyPromise.Company;
                deferred.resolve();
            });

            return deferred.promise;
        };
        
        function searchProducts(salonId) {
            var deferred = $q.defer();

            var searchFilter = {
                PageData: {
                    Take: 30,
                    Skip: 0
                },
                SearchText: '',
                CompanyId: salonId,
                IsCompanySearch: true
            };

            productApiFactory.getProducts(searchFilter).then(function (data) {
                var categoryGroupedProducts = _.groupBy(data.Products, function (product) { return product.CategoryName; });
                _.each(_.keys(categoryGroupedProducts), function (key) {
                    categoryGroupedProducts[key] = _.groupBy(categoryGroupedProducts[key], function (product) { return product.SubCategoryName; });
                });
                factory.products = categoryGroupedProducts;
                deferred.resolve();
            });

            return deferred.promise;
        };

    };

})();
(function () {

    'use strict';

    angular.module('app').controller('salonDirectionController', salonDirectionController);

    salonDirectionController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'salonDirectionFactory', 'notificationFactory'];

    function salonDirectionController($scope, $rootScope, $state, $stateParams, salonDirectionFactory, notificationFactory) {
        var viewModel = $scope;
        var salonId = $stateParams.salonId;

        $scope.map = {
            control: {},
            center: {
                latitude: -26.1706755,
                longitude: 28.0483971
            },
            zoom: 14
        };

        $rootScope.isLoading = true;
        viewModel.ViewType = 'Map';
        viewModel.salonDirectionFactory = salonDirectionFactory;
        viewModel.goToSalons = goToSalons;
        viewModel.showList = false;

        navigator.geolocation.getCurrentPosition(locationSuccess, locationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });

        function locationSuccess(position) {
            $scope.map.center = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };

            viewModel.showList = false;
            viewModel.salonDirectionFactory.initialise(salonId).then(function () {              
                var directionsDisplay = new google.maps.DirectionsRenderer();
                var directionsService = new google.maps.DirectionsService();
                var geocoder = new google.maps.Geocoder();

                var directions = {
                    origin: {
                        lat: viewModel.map.center.latitude,
                        lng: viewModel.map.center.longitude
                    },
                    destination: {
                        lat: Number(viewModel.salonDirectionFactory.salon.PhysicalAddressLatitude),
                        lng: Number(viewModel.salonDirectionFactory.salon.PhysicalAddressLongitude)
                    },
                };

                var request = {
                    origin: directions.origin,
                    destination: directions.destination,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        directionsDisplay.setMap($scope.map.control.getGMap());
                        directionsDisplay.setPanel(document.getElementById('directionsList'));
                        viewModel.showList = true;
                        $rootScope.isLoading = false;
                    } else {
                        var newScope = $rootScope.$new();

                        newScope.model = {
                            'ErrorCode': 408,
                            'ErrorHeader': 'Error retrieving route',
                            'ErrorDetails': 'Error retrieving route, please ensure that gps location is enabled.'
                        };

                        notificationFactory.open({
                            templateUrl: 'errortemplate.html',
                            scope: newScope,
                            size: 'sm',
                            controller: errorController
                        });
                        $rootScope.isLoading = false;
                    }
                });
            });
        };

        function locationError(error) {
            var newScope = $rootScope.$new();

            newScope.model = {
                'ErrorCode': 408,
                'ErrorHeader': 'Error retrieving location',
                'ErrorDetails': 'Error retrieving location, please ensure that gps location is enabled. ' + 'Error Code: ' + error.code + 'Error Message: ' + error.message
            };

            notificationFactory.open({
                templateUrl: 'errortemplate.html',
                scope: newScope,
                size: 'sm',
                controller: errorController
            });
        };

        function goToSalons(e) {
            e.preventDefault();

            $state.go('salons');
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('salonDirectionFactory', salonDirectionFactory);

    salonDirectionFactory.$inject = ['$q', '$rootScope', 'companyApiFactory'];

    function salonDirectionFactory($q, $rootScope, companyApiFactory) {
        var factory = {
            initialise: initialise,
            salon: {}
        };

        return factory;

        function initialise(salonId) {
            var deferred = $q.defer();

            companyApiFactory.getCompany(salonId).then(function (data) {
                factory.salon = data.Company;
                deferred.resolve();
            });

            return deferred.promise;
        };

    };

})();
(function () {

    'use strict';

    angular.module('app').controller('salonLocationFinderController', SalonLocationFinderController);

    SalonLocationFinderController.$inject = ['$scope', '$state', '$rootScope'];

    function SalonLocationFinderController($scope, $state, $rootScope) {
        var viewModel = $scope;
        
        viewModel.$on('google-map-place-updated', function (event, data) {
            console.log(data);
        });

    };

})();
(function () {

    'use strict';

    angular.module('app').controller('salonsController', SalonsController);

    SalonsController.$inject = ['$scope', '$rootScope', '$state', 'salonsFactory', 'salonDirectionFactory', 'lookupApiFactory', 'notificationFactory', 'appFactory'];

    function SalonsController($scope, $rootScope, $state, salonsFactory, salonDirectionFactory, lookupApiFactory, notificationFactory, appFactory) {
        var viewModel = $scope;
        var page = 1;

        appFactory.Initialise();

        $rootScope.isLoading = false;
        viewModel.isBusy = true;
        viewModel.salonsFactory = salonsFactory;
        viewModel.salonsFactory.isScrollDisabled = true;
        viewModel.searchSalons = searchSalons;
        viewModel.goToSalon = goToSalon;
        viewModel.goToMain = goToMain;
        viewModel.goToSalonDirection = goToSalonDirection;
        viewModel.subCategories = [];
        viewModel.nextPage = nextPage;

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: salonsFactory.searchFilter.SearchText,
            SubCategoryId: salonsFactory.searchFilter.SubCategoryId,
            IsLocationSearch: true,
            DeviceId: appFactory.User.DeviceId
        };

        initialise();

        function initialise() {
            $rootScope.isLoading = true;
            page = 0;
            viewModel.salonsFactory.salons = [];
            viewModel.SearchFilter.Latitude = appFactory.location.latitude;
            viewModel.SearchFilter.Longitude = appFactory.location.longitude;

            nextPage();

            lookupApiFactory.getSubCategories({ PageData: { IncludeAllData: true } }).then(function (data) {
                $rootScope.isLoading = false;
                viewModel.subCategories = data.Items;
            }, function () {
                $rootScope.isLoading = false;
            });
        };

        function searchSalons(isClear) {
            viewModel.isBusy = true;
            $rootScope.isLoading = true;
            $rootScope.Message = 'Loading salons ..';

            if (isClear) {
                viewModel.salonsFactory.salons = [];
            };
            viewModel.salonsFactory.searchSalons(viewModel.SearchFilter).then(function (response) {
                viewModel.isBusy = false;
                $rootScope.isLoading = false;
                $rootScope.Message = '';
                console.log(viewModel.isBusy);
            }, function () {
                viewModel.isBusy = false;
                $rootScope.isLoading = false;
                $rootScope.Message = '';
            });
        }

        function goToMain(e) {
            e.preventDefault();

            $state.go('main');
        };

        function goToSalon(salon) {
            $state.go('salon', { salonId: salon.Id });
        };

        function goToSalonDirection(salon) {
            lookupApiFactory.logGoToCompany(salon.Id, appFactory.User.DeviceId);

            if (!window.device) {
                salonDirectionFactory.salon = salon;

                return $state.go('salondirection', { salonId: salon.Id });
            }

            var platform = device.platform.toLowerCase();

            launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, function (isAvailable) {
                if (isAvailable) {
                    navigate(launchnavigator.APP.GOOGLE_MAPS, salon);
                }
                else if (platform == "android") {
                    launchnavigator.isAppAvailable(launchnavigator.APP.GEO, function (isAppAvailable) {
                        if (isAppAvailable) {
                            navigate(launchnavigator.APP.GEO, salon);
                        }
                        else {
                            salonDirectionFactory.salon = salon;

                            return $state.go('salondirection', { salonId: salon.Id });
                        }
                    });
                }
                else if (platform == "ios") {
                    launchnavigator.isAppAvailable(launchnavigator.APP.APPLE_MAPS, function (isAppAvailable) {
                        if (isAppAvailable) {
                            navigate(launchnavigator.APP.APPLE_MAPS, salon);
                        }
                        else {
                            salonDirectionFactory.salon = salon;

                            return $state.go('salondirection', { salonId: salon.Id });
                        }
                    });
                }
            });
        };

        function navigate(navigatorApp, salon) {
            navigator.geolocation.getCurrentPosition(function (position) {
                app.NavigatorUtils.navigate(position.coords, { latitude: salon.PhysicalAddressLatitude, longitude: salon.PhysicalAddressLongitude }, navigatorApp);
            }, locationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });
        };

        function locationSuccess(position) {
            viewModel.SearchFilter.Latitude = appFactory.location.coords.latitude;
            viewModel.SearchFilter.Longitude = appFactory.location.coords.longitude;

            nextPage();
            lookupApiFactory.getSubCategories({ PageData: { IncludeAllData: true } }).then(function (data) {
                $rootScope.isLoading = false;
                viewModel.subCategories = data.Items;
            }, function () {
                $rootScope.isLoading = false;
            });
        };

        function locationError(error) {
            var newScope = $rootScope.$new();

            newScope.model = {
                'ErrorCode': 408,
                'ErrorHeader': 'Error retrieving location',
                'ErrorDetails': 'Error retrieving location, please ensure that gps location is enabled. ' + 'Error Code: ' + error.code + 'Error Message: ' + error.message
            };

            notificationFactory.open({
                templateUrl: 'errortemplate.html',
                scope: newScope,
                size: 'sm',
                controller: errorController
            });
        };

        function nextPage() {
            page = page + 1;
            viewModel.SearchFilter.PageData.Skip = viewModel.SearchFilter.PageData.Take * (page - 1);
            searchSalons();
        };

    };

})();
(function () {

    'use strict';

    angular.module('app').factory('salonsFactory', salonsFactory);

    salonsFactory.$inject = ['$q', '$rootScope', 'companyApiFactory'];

    function salonsFactory($q, $rootScope, companyApiFactory) {
        var factory = {
            searchSalons: searchSalons,
            searchFilter: {},
            salons: [],
            isScrollDisabled: false
        };

        return factory;

        function searchSalons(searchFilter) {
            var deferred = $q.defer();

            companyApiFactory.getCompanies(searchFilter).then(function (data) {
                for (var i = 0; i < data.Companies.length; i++) {
                    factory.salons.push(data.Companies[i]);
                }

                factory.isScrollDisabled = factory.salons.length >= data.TotalCompanies;
                deferred.resolve();
            });

            return deferred.promise;
        };

    };

})();
(function () {

    'use strict';

    angular.module('app').controller('servicesController', servicesController);

    servicesController.$inject = ['$scope', '$rootScope', '$state', 'lookupApiFactory', 'salonsFactory'];

    function servicesController($scope, $rootScope, $state, lookupApiFactory, salonsFactory) {
        var viewModel = $scope

        viewModel.subCategories = [];
        viewModel.SearchFilter = {};
        viewModel.searchSalons = searchSalons;
        viewModel.searchServiceSalons = searchServiceSalons;

        $rootScope.isLoading = true;
        $rootScope.loadingMessage = 'Loading Services ...';

        lookupApiFactory.getSubCategories({ PageData: { IncludeAllData: true } }).then(function (data) {
            viewModel.subCategories = data.Items;
            $rootScope.isLoading = false;
        });

        function searchSalons() {
            salonsFactory.searchFilter = {
                SearchText: viewModel.SearchFilter.SearchText,
            };

            $state.go('salons');
        };

        function searchServiceSalons(e, subCategoryId) {
            e.preventDefault();

            salonsFactory.searchFilter = {
                SearchText: viewModel.SearchFilter.SearchText,
                SubCategoryId: subCategoryId
            };

            $state.go('salons');
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').controller('shareAppController', shareAppController);

    shareAppController.$inject = ['$scope', '$state'];

    function shareAppController($scope, $state) {
        var viewModel = $scope

    };

})();
(function () {

    'use strict';

    angular.module('app').controller('technicalReportController', technicalReportController);

    technicalReportController.$inject = ['$scope', '$state'];

    function technicalReportController($scope, $state) {
        var viewModel = $scope

    };

})();
(function () {

    'use strict';

    angular.module('app').controller('userRegisterSalonController', UserRegisterSalonController);

    UserRegisterSalonController.$inject = ['$scope', '$rootScope', '$state', 'lookupApiFactory'];

    function UserRegisterSalonController($scope, $rootScope, $state, lookupApiFactory) {
        var viewModel = $scope;

        viewModel.model = {
            DeviceId: 'WebBrowser',
            DeviceName: 'WebBrowser'
        };

        viewModel.register = register;

        //var model = {
        //    DeviceId: 'WebBrowser',
        //    DeviceName: 'WebBrowser'
        //}

        if (window.device && !window.device.isVirtual) {
            viewModel.model = {
                DeviceId: window.device.uuid,
                DeviceName: window.device.model,
                DevicePlatform: window.device.platform,
                DeviceSerialNumber: window.device.serial
            }
        }

        function register() {
            if (!viewModel.frmRegisterUser.$valid) {
                $rootScope.$broadcast('action-complete', true);
                return;
            }

            lookupApiFactory.saveDeviceDetails(viewModel.model).then(function (data) {
                localStorage.setItem('user', JSON.stringify(viewModel.model));
                $state.go('main');
            });
        };

    };

})();