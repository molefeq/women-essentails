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

    Date.prototype.toTimeDisplayString = function () {
        var hours = ('00' + this.getHours()).slice(-2);
        var minutes = ('00' + this.getMinutes()).slice(-2);

        return hours + ':' + minutes;
    };

    utils.timeToDateTime = function (timeText) {
        var currentDate = new Date().setHours(0, 0, 0, 0);

        if (!timeText) {
            return currentDate;
        }

        var hours = Number(timeText.split(':')[0]);
        var minutes = Number(timeText.split(':')[1]);

        currentDate = new Date().setHours(hours, minutes, 0, 0);

        return currentDate;
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
          .state('landing', {
              url: "/",
              templateUrl: "app/components/landing/landingView.html",
              controller: 'appController',
              sessionState: {
                  skip: true
              }
          })
          .state('aboutus', {
              url: "/aboutus",
              templateUrl: "app/components/aboutus/aboutUsView.html",
              controller: 'appController',
              sessionState: {
                  skip: true
              }
          })
          .state('contactus', {
              url: "/contactus",
              templateUrl: "app/components/contactus/contactUsView.html",
              controller: 'contactUsController',
              sessionState: {
                  skip: true
              }
          })
          .state('searchsalons', {
              url: "/searchsalons",
              templateUrl: "app/components/searchsalons/searchSalonsView.html",
              controller: 'searchSalonsController',
              sessionState: {
                  skip: true
              }
          })
          .state('searchsalon', {
              url: "/searchsalon/:salonId",
              templateUrl: "app/components/searchsalon/searchSalonView.html",
              controller: 'searchSalonController',
              sessionState: {
                  skip: true
              }
          })
          .state('searchsalondirections', {
              url: "/searchsalondirections/:salonId",
              templateUrl: "app/components/searchsalondirections/searchSalonDirectionsView.html",
              controller: 'searchSalonDirectionsController',
              sessionState: {
                  skip: true
              }
          })
          .state('login', {
              url: "/login",
              templateUrl: "app/components/login/loginView.html",
              controller: 'loginController',
              sessionState: {
                  skip: true
              }
          })
          .state('forgotpassword', {
              url: "/forgotpassword",
              templateUrl: "app/components/forgotpassword/forgotPasswordView.html",
              controller: 'forgotPasswordController',
              sessionState: {
                  skip: true,
                  home: 'login'
              }
          })
          .state('register', {
              url: "/register",
              templateUrl: "app/components/register/registerView.html",
              controller: 'registerController',
              sessionState: {
                  skip: true,
                  home: 'login'
              }
          })
          .state('resetpassword', {
              url: "/resetpassword",
              templateUrl: "app/components/forgotpassword/resetPasswordView.html",
              controller: 'resetPasswordController',
              sessionState: {
                  skip: true,
                  home: 'login'
              }
          })
          .state('changepassword', {
              url: "/changepassword",
              templateUrl: "app/components/changepassword/changePasswordView.html",
              controller: 'changePasswordController',
              sessionState: {
                  skip: true,
                  home: 'login'
              }
          })
          .state('home', {
              url: "/home",
              templateUrl: "app/components/home/views/homeView.html",
              controller: 'homeController',
              sessionState: {
                  modules: ['Home'],
                  moduleOrder: 1
              }
          })
          .state('salons', {
              url: "/salons",
              templateUrl: "app/components/salons/salonsView.html",
              controller: 'salonsController',
              sessionState: {
                  home: 'home',
                  moduleOrder: 2,
                  modules: ['Companies']
              }
          })
          .state('products', {
              url: "/products/:salonId",
              templateUrl: "app/components/products/productsView.html",
              controller: 'productsController',
              sessionState: {
                  home: 'home',
                  moduleOrder: 3,
                  modules: ['Products']
              }
          })
          .state('promotionproducts', {
              url: "/promotionproducts/:productId",
              templateUrl: "app/components/promotionproducts/promotionProductsView.html",
              controller: 'promotionProductsController',
              sessionState: {
                  home: 'home',
                  moduleOrder: 4,
                  modules: ['PromotionProducts']
              }
          })
        .state('companyusers', {
            url: "/companyusers/:companyId",
            templateUrl: "app/components/companyusers/companyUsersView.html",
            controller: 'companyUsersController',
            sessionState: {
                home: 'home',
                moduleOrder: 3,
                modules: ['CompanyUsers']
            }
        })
        .state('beautytips', {
            url: "/beautytips",
            templateUrl: "app/components/beautytips/beautyTipsView.html",
            controller: 'beautyTipsController',
            sessionState: {
                home: 'home'
            }
        })
        .state('servicesadmin', {
            url: "/servicesadmin",
            templateUrl: "app/components/subcategory/subCategoryView.html",
            controller: 'subCategoryController',
            sessionState: {
                home: 'home'
            }
        })
        .state('salonrequests', {
            url: "/salonrequests",
            templateUrl: "app/components/companyrequests/companyRequestsView.html",
            controller: 'companyRequestsController',
            sessionState: {
                home: 'home',
                moduleOrder: 3,
                modules:['CompanyRequests']
            }
        })
        .state('specials', {
            url: "/specials",
            templateUrl: "app/components/searchpromotionproducts/searchPromotionProductsView.html",
            controller: 'searchPromotionProductsController',
            sessionState: {
                home: 'home'
            }
        })
        .state('searchbeautytips', {
            url: "/searchbeautytips",
            templateUrl: "app/components/searchbeautytips/searchBeautyTipsView.html",
            controller: 'searchBeautyTipsController',
            sessionState: {
                home: 'home'
            }
        });
    };

    routesmanager.getLandingRoute = function (usermodules, routes) {
        var sortedRoutes = _.sortBy(routes, function (o) { return !o.sessionState || !o.sessionState.moduleOrder ? 1000 : o.sessionState.moduleOrder; });
        var landingRoute = null;
        var returnRoute = null;


        _.find(sortedRoutes, function (route) {
            landingRoute = _.find(usermodules, function (usermodule) { return !route.sessionState || !route.sessionState.modules ? false : _.indexOf(route.sessionState.modules, usermodule.ModuleName) >= 0; });

            if (landingRoute != null) {
                returnRoute = route;
            }

            return landingRoute != null;
        });

        return returnRoute;
    };

    routesmanager.canRouteAccessModule = function (usermodules, route) {
        if (!usermodules || usermodules.length == 0 || !route.sessionState || !route.sessionState.modules) {
            return true;
        }

        var matchedmodules = _.find(usermodules, function (usermodule) {
            return _.indexOf(route.sessionState.modules, usermodule.ModuleName) >= 0;
        });

        return matchedmodules !== null && matchedmodules !== undefined;
    };

    routesmanager.canModuleAccessRoute = function (usermodules, module) {
        if (!usermodules || usermodules.length == 0 || !module) {
            return true;
        }

        var matchedmodules = _.find(usermodules, function (usermodule) {
            return usermodule.ModuleName.toLowerCase() == module.toLowerCase();
        });

        return matchedmodules !== null && matchedmodules !== undefined;
    };

    routesmanager.getMenuItems = function (usermodules, menus, path) {
        var menuItems = [];
        var menuKeys = _.keys(menus);

        for (var i = 0; i < menuKeys.length; i++) {
            var canItemBeFound = _.find(menus[menuKeys[i]].MenuItems, function (item) {
                return item.path == path;
            });

            if (!canItemBeFound) {
                continue;
            }

            _.each(menus[menuKeys[i]].MenuItems, function (menuItem) {

                if (routesmanager.canModuleAccessRoute(usermodules, menuItem.module)) {
                    menuItems.push(menuItem);
                }
            });
        };

        return menuItems;
    };

})(app.RoutesManager = {});


(function () {
    'use strict';

    angular.module('app', ['ui.router', 'ngSanitize', 'ngCookies', 'ngResource', 'angularFileUpload', 'ui.bootstrap', 'ncy-angular-breadcrumb', 'toastr', 'geolocation', 'uiGmapgoogle-maps']);

})();


(function () {
    'use strict';

    angular.module('app').config(appConfig);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', '$compileProvider'];

    function appConfig($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider) {
        $httpProvider.interceptors.push('appHttpInterceptorFactory');
        $httpProvider.defaults.useXDomain = true;
        //$compileProvider.debugInfoEnabled(false);

        configRoutes($stateProvider, $urlRouterProvider);
    };

    function configRoutes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        app.RoutesManager.initialise($stateProvider);
    };

})();

(function () {
    'use strict';

    angular.module('app').run(['appFactory', '$rootScope', function (appFactory, $rootScope) {
        appFactory.Initialise();
        
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            appFactory.ManageUrlRedirects(event, fromState, toState);

            $rootScope.$broadcast('state-changed', toState);
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
            $rootScope.$broadcast('state-menu-changed', toState);
        });
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

var anonymousStates =
    {
        'login': true,
        'forgotpassword': true,
        'resetpassword': true,
        'changepassword': true,
        'landing': true,
        'aboutus': true,
        'contactus': true,
        'searchsalons': true,
        'searchsalon': true,
        'searchsalondirections': true,
        'register': true,
        'specials': true,
        'searchbeautytips': true
    };

angular.module('app').constant('ServerBaseUrl', 'http://www.essentials4women.co.za/');
//angular.module('app').constant('ServerBaseUrl', 'https://sqswomenessentailapiqa.azurewebsites.net/');
//angular.module('app').constant('ServerBaseUrl', 'http://localhost:64707/');
//angular.module('app').constant('ServerApiBaseUrl', 'http://localhost:64707/api/');
//angular.module('app').constant('ServerApiBaseUrl', 'https://sqswomenessentailapiqa.azurewebsites.net/api/');
angular.module('app').constant('ServerApiBaseUrl', 'http://www.essentials4women.co.za/api/');
angular.module('app').constant('SubMenuItems', menus);
angular.module('app').constant('AnonymousStates', anonymousStates);
(function () {

    'use strict';

    angular.module('app').controller('appController', AppController);

    AppController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'appFactory', 'notificationFactory', 'SubMenuItems', 'AnonymousStates', 'lookupApiFactory', 'searchSalonsFactory'];

    function AppController($scope, $rootScope, $state, $stateParams, appFactory, notificationFactory, SubMenuItems, AnonymousStates, lookupApiFactory, searchSalonsFactory) {
        var viewModel = $scope;

        viewModel.appFactory = appFactory;
        viewModel.viewProfile = viewprofile;
        viewModel.changePassword = changepassword;
        viewModel.editOrganisation = editorganisation;
        viewModel.goToMenuItem = goToMenuItem;
        viewModel.goToHome = goToHome;
        viewModel.goToLogin = goToLogin;
        viewModel.searchSalons = searchSalons;
        viewModel.subMenuItems = [];
        viewModel.currentNavItem = '';
        viewModel.SearchText = '';
        viewModel.contactUsModel = {};
        viewModel.send = send;
        viewModel.services = [];
        viewModel.serviceSearchSalons = serviceSearchSalons;

        initialise();
        viewModel.appFactory.Initialise();

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

        function goToLogin(e) {
            e.preventDefault();

            $state.go('login');
        };

        function searchSalons(SearchText) {
            searchSalonsFactory.SearchText = SearchText;
            searchSalonsFactory.SubCategoryId = viewModel.SubCategoryId;

            if ($state.current.name != 'searchsalons') {
                return $state.go('searchsalons');
            }

            $state.go($state.current, null, { reload: true });
        };


        function serviceSearchSalons(subCategoryId, e) {
            e.preventDefault();
            searchSalonsFactory.SearchText = viewModel.SearchText;
            searchSalonsFactory.SubCategoryId = subCategoryId;

            if ($state.current.name != 'searchsalons') {
                return $state.go('searchsalons');
            }

            $state.go($state.current, null, { reload: true });
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

        function send() {

        };

        function initialise() {
            lookupApiFactory.getSubCategories({ PageData: { IncludeAllData: true } }).then(function (data) {
                viewModel.services = data.Items;
            });
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
errorController.$inject = ['$scope', '$uibModalInstance'];

function errorController($scope, $uibModalInstance) {
    $scope.closeDialog = function () {
        $uibModalInstance.dismiss();
    };
};
(function () {

    'use strict';

    angular.module('app').factory('accountApiFactory', accountApiFactory);

    accountApiFactory.$inject = ['$http', '$q', 'ServerApiBaseUrl'];

    function accountApiFactory($http, $q, ServerApiBaseUrl) {
        var factory = {
            getUsers: getUsers,
            getUser: getUser,
            addUser: addUser,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return factory;

        function getUsers(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Account/GetUsers',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Users: data.Items, TotalUsers: data.TotalItems });
            });

            return deferred.promise;
        };

        function getUser(userId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Account/FetchUser/?userId=' + userId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ User: data.Item });
            });

            return deferred.promise;
        };

        function addUser(user) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Account/AddUser',
                data: user
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ User: data.Item });
            });

            return deferred.promise;
        };

        function updateUser(user) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Account/UpdateUser',
                data: user
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ User: data.Item });
            });

            return deferred.promise;
        };

        function deleteUser(user) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Account/DeleteUser',
                data: user
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ User: data.Item });
            });

            return deferred.promise;
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('appFactory', AppFactory);

    AppFactory.$inject = ['$http', '$q', '$state', '$rootScope', 'ServerApiBaseUrl', 'AnonymousStates', 'notificationFactory'];

    function AppFactory($http, $q, $state, $rootScope, ServerApiBaseUrl, AnonymousStates, notificationFactory) {
        var user, userDisplayName, token;

        var factory = {
            User: null,
            Organisation: null,
            Company: null,
            TokenKey: null,
            IsUserLogged: false,
            UserDisplayName: null,
            Login: login,
            LogOut: logout,
            ViewOrganisation: viewOrganisation,
            SetOrganisation: setOrganisation,
            Initialise: initialise,
            ManageUrlRedirects: manageUrlRedirects
        };

        return factory;

        function login(userModel, tokenKey) {
            if (!userModel || !tokenKey) {
                return;
            }

            localStorage.setItem('TokenKey', tokenKey);
            localStorage.setItem('UserModel', JSON.stringify(userModel));

            initialise();
        };

        function initialise() {
            setUser();
            setToken();
            setIsUserLoggedIn();
            setUserDisplayName();
            setOrganisation();
        }

        function setUser() {

            if (localStorage["UserModel"] === null || localStorage["UserModel"] === undefined) {
                factory.User = null;
                return;
            }

            factory.User = JSON.parse(localStorage["UserModel"]);
            factory.User.CreateDate = new Date(factory.User.CreateDate);
        };

        function setToken() {

            if (localStorage["TokenKey"] === null || localStorage["TokenKey"] === undefined) {
                factory.TokenKey = null;
                return;
            }

            factory.TokenKey = localStorage["TokenKey"];
        };

        function setIsUserLoggedIn() {
            setUser();
            setToken();

            factory.IsUserLogged = factory.User != null && factory.TokenKey != null;
        };

        function setUserDisplayName() {
            setUser();

            if (factory.User == null) {
                factory.UserDisplayName = null;
                return;
            }

            factory.UserDisplayName = factory.User.FirstName + ' ' + factory.User.LastName;
        };

        function viewOrganisation(organisation) {
            if (organisation === null || organisation === undefined) {
                sessionStorage["Organisation"] = null;
                return;
            }

            sessionStorage.setItem('Organisation', JSON.stringify(organisation));
        };

        function setOrganisation() {
            if (sessionStorage["Organisation"] === null || sessionStorage["Organisation"] === undefined) {
                factory.Organisation = null;
                return;
            }

            factory.Organisation = JSON.parse(sessionStorage["Organisation"]);;
        };

        function logout(e) {
            if (e) {
                e.preventDefault;
            }

            var deferred = $q.defer();

            $http(
                {
                    method: 'Post',
                    url: ServerApiBaseUrl + '/Account/LogOut'
                })
                .success(function (data, status, headers, config) {
                    localStorage.clear();
                    sessionStorage.clear();

                    factory.TokenKey = null;
                    factory.Organisation = null;
                    factory.Company = null;
                    factory.IsUserLogged = false;
                    factory.User = null;
                    factory.UserDisplayName = null;

                    $state.go('login');

                    deferred.resolve();
                });

            return deferred.promise;
        };

        function manageUrlRedirects(event, fromState, toState) {
            setIsUserLoggedIn();

            if (!AnonymousStates[toState.name] && !factory.IsUserLogged) {
                event.preventDefault();

                logout();
                $state.go('login');
                return;
            }
            else if (AnonymousStates[toState.name] && factory.IsUserLogged && toState.name !== 'changepassword') {
                clearSessionVariables();
                return;
            }
            else if (AnonymousStates[toState.name] && toState.name !== 'changepassword') {
                manageSessionVariables(fromState, toState)
            }
            else if (!AnonymousStates[toState.name], app.RoutesManager.canRouteAccessModule(factory.User.AccessModules, toState)) {
                manageSessionVariables(fromState, toState)
            }
            else if (!AnonymousStates[toState.name], app.RoutesManager.canRouteAccessModule(factory.User.AccessModules, toState)) {
                manageSessionVariables(fromState, toState)
            }
            else if (!AnonymousStates[toState.name], !app.RoutesManager.canRouteAccessModule(factory.User.AccessModules, toState)) {
                event.preventDefault();

                errorFactory.handleHttpServerError({
                    status: 401,
                    data: {
                        Message: 'You do not have enough permessions to access this view.'
                    }
                });
            }
        };

        function manageSessionVariables(fromState, toState) {
            if (toState.name != 'searchsalons') {
                // $rootScope.SearchSalonText = '';
            }

            if (toState.name == 'login') {
                clearSessionVariables();
                return;
            }

            if (!toState.sessionState || toState.sessionState.skip) {
                sessionStorage.clear();
                return;
            }

            if (toState.sessionState && !toState.sessionState.organisation) {
                sessionStorage.removeItem('Organisation');
                return;
            }
        };

        function clearSessionVariables() {
            localStorage.clear();
            sessionStorage.clear();

            factory.TokenKey = null;
            factory.Organisation = null;
            factory.Company = null;
            factory.IsUserLogged = false;
            factory.User = null;
            factory.UserDisplayName = null;
        }
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
            var tokenKey = localStorage.getItem('TokenKey');

            if (tokenKey) {
                config.headers.Authorization = 'Bearer ' + tokenKey;
            }

            return config;
        };

        function requestError(rejection) {
            return $q.reject(rejection);
        };

        function response(response) {
            var model = getModel(response);

            $rootScope.$broadcast('action-complete');

            if (model && model.HasErrors) {
                $rootScope.$broadcast('server-validation-error-occurred', model.ErrorMessages);
                return $q.reject(response);
            }
            else {
                $rootScope.$broadcast('server-validation-successfull', model.ErrorMessages);
            }

            return response;
        };

        function responseError(rejection) {
            errorFactory.handleHttpServerError(rejection);

            $rootScope.isLoading = false;
            $rootScope.$broadcast('action-complete');

            return $q.reject(rejection);
        };

        function getModel(response) {
            var model = response.data;

            if ($location.path() == '/login' && response.data.UserModel) {
                model = JSON.parse(response.data.UserModel);
            }

            return model;
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

    angular.module('app').factory('beautyTipApiFactory', beautyTipApiFactory);

    beautyTipApiFactory.$inject = ['$http', '$rootScope', '$q', '$upload', 'ServerApiBaseUrl'];

    function beautyTipApiFactory($http, $rootScope, $q, $upload, ServerApiBaseUrl) {
        var factory = {
            getBeautyTips: getBeautyTips,
            getBeautyTip: getBeautyTip,
            addBeautyTip: addBeautyTip,
            updateBeautyTip: updateBeautyTip,
            deleteBeautyTip: deleteBeautyTip,
            activateBeautyTip: activateBeautyTip
        };

        return factory;
        
        function getBeautyTips(searchFilter) {
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
        };
        
        function getBeautyTip(beautyTipId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/BeautyTip/FetchBeautyTip/?beautyTipId=' + beautyTipId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ BeautyTip: data.Item });
            });

            return deferred.promise;
        };

        function addBeautyTip(beautyTip) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/BeautyTip/AddBeautyTip',
                data: beautyTip
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ BeautyTip: data.Item });
            });

            return deferred.promise;
        };

        function updateBeautyTip(beautyTip) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/BeautyTip/UpdateBeautyTip',
                data: beautyTip
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ BeautyTip: data.Item });
            });

            return deferred.promise;
        };

        function deleteBeautyTip(beautyTip) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/BeautyTip/DeleteBeautyTip',
                data: beautyTip
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ BeautyTip: data.Item });
            });

            return deferred.promise;
        };

        function activateBeautyTip(beautyTip) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/BeautyTip/ActivateBeautyTip',
                data: beautyTip
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ BeautyTip: data.Item });
            });

            return deferred.promise;
        };
        
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('companyApiFactory', companyApiFactory);

    companyApiFactory.$inject = ['$http', '$rootScope', '$q', '$upload', 'ServerApiBaseUrl'];

    function companyApiFactory($http, $rootScope, $q, $upload, ServerApiBaseUrl) {
        var factory = {
            getCompanies: getCompanies,
            getAppCompanies: getAppCompanies,
            getCompany: getCompany,
            addCompany: addCompany,
            updateCompany: updateCompany,
            deleteCompany: deleteCompany,
            saveCompanyImage: saveCompanyImage,
            saveCompanyLogo: saveCompanyLogo,
            getCompanyData: getCompanyData,
            addCompanyRequest: addCompanyRequest,
            updateCompanyStatus: updateCompanyStatus
        };

        return factory;

        function getCompanyData(companyTypeCode) {
            var deferred = $q.defer();

            $http(
            {
                method: 'GET',
                url: ServerApiBaseUrl + '/Company/GetCompanyData/?companyTypeCode=' + companyTypeCode
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ CompanyData: data });
            });

            return deferred.promise;
        };

        function getCompanies(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Company/GetCompanies',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Companies: data.Items, TotalCompanies: data.TotalItems });
            });

            return deferred.promise;
        };

        function getAppCompanies(searchFilter) {
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

        function getCompany(companyId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Company/FetchCompany/?companyId=' + companyId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Company: data.Item });
            });

            return deferred.promise;
        };

        function addCompany(company) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Company/AddCompany',
                data: company
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Company: data.Item });
            });

            return deferred.promise;
        };

        function updateCompany(company) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Company/UpdateCompany',
                data: company
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Company: data.Item });
            });

            return deferred.promise;
        };

        function deleteCompany(company) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Company/DeleteCompany',
                data: company
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Company: data.Item });
            });

            return deferred.promise;
        };

        function saveCompanyImage(file, inProgressFunction) {
            var deferred = $q.defer();

            $upload.upload({
                url: ServerApiBaseUrl + 'Company/SaveImage',
                method: "POST",
                file: file
            }).progress(function (event) {
                inProgressFunction(event);
            }).success(function (data, status, headers, config) {
                deferred.resolve({ CompanyImage: data });
            });

            return deferred.promise;
        };

        function addCompanyRequest(companyRequest) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Company/AddCompanyRequest',
                data: companyRequest
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ CompanyRequest: data.Item });
            });

            return deferred.promise;
        };

        function updateCompanyStatus(model) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Company/UpdateCompanyStatus',
                data: model
            })
            .success(function (data, status, headers, config) {
                deferred.resolve();
            }).error(function () {
                deferred.reject();
            });

            return deferred.promise;
        };

        function saveCompanyLogo(file, inProgressFunction) {
            var deferred = $q.defer();

            $upload.upload({
                url: ServerApiBaseUrl + 'Company/SaveLogo',
                method: "POST",
                file: file
            }).progress(function (event) {
                inProgressFunction(event);
            }).success(function (data, status, headers, config) {
                deferred.resolve({ CompanyImage: data });
            });

            return deferred.promise;
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('companyRequestApiFactory', companyRequestApiFactory);

    companyRequestApiFactory.$inject = ['$http', '$rootScope', '$q', '$upload', 'ServerApiBaseUrl'];

    function companyRequestApiFactory($http, $rootScope, $q, $upload, ServerApiBaseUrl) {
        var factory = {
            getCompanyRequests: getCompanyRequests,
            addCompanyRequest: addCompanyRequest,
            updateCompanyRequest: updateCompanyRequest
        };

        return factory;

        function getCompanyRequests(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/CompanyRequest/GetCompanyRequests',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ CompanyRequests: data.Items, TotalCompanyRequests: data.TotalItems });
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

        function updateCompanyRequest(companyRequest) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/CompanyRequest/UpdateCompanyRequest',
                data: companyRequest
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ CompanyRequest: data.Item });
            });

            return deferred.promise;
        };
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
            getCategories: getCategories,
            getSubCategories: getSubCategories,
            sendMessage: sendMessage,
            getContactDetails: getContactDetails,
            getLookupFields: getLookupFields
        };

        return factory;

        function getCompanyTypes(searchFilter) {
            return getResultSet(searchFilter, ServerApiBaseUrl + 'Lookup/GetCompanTypes');
        };

        function getCategories(searchFilter) {
            return getResultSet(searchFilter, ServerApiBaseUrl + 'Lookup/GetCategories');
        };

        function getSubCategories(searchFilter) {
            return getResultSet(searchFilter, ServerApiBaseUrl + 'Lookup/GetSubCategories');
        };

        function getLookupFields(fieldName) {
            var deferred = $q.defer();

            $http(
            {
                method: 'GET',
                url: ServerApiBaseUrl + 'Lookup/GetLookupFields?fieldName=' + fieldName
            })
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }

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

        function sendMessage(model) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Lookup/SendMessage',
                data: model
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

    };

})();
(function () {

    'use strict';

    angular.module('app').factory('moduleApiFactory', moduleApiFactory);

    moduleApiFactory.$inject = ['$http', '$q', 'ServerApiBaseUrl'];

    function moduleApiFactory($http, $q, ServerApiBaseUrl) {
        var factory = {
            getAllModules: getAllModules
        };

        return factory;

        function getAllModules(searchText) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Module/GetModules/',
                data: { SearchText: searchText, PageData: { IncludeAllData: true, SortOrder: 1 } }
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Modules: data.Items, TotalModules: data.TotalItems });
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

    angular.module('app').factory('organisationApiFactory', organisationApiFactory);

    organisationApiFactory.$inject = ['$http', '$q', '$upload', 'ServerApiBaseUrl'];

    function organisationApiFactory($http, $q, $upload, ServerApiBaseUrl) {
        var factory = {
            getOrganisations: getOrganisations,
            getOrganisation: getOrganisation,
            addOrganisation: addOrganisation,
            updateOrganisation: updateOrganisation,
            saveOrganisationLogo: saveOrganisationLogo
        };

        return factory;

        function getOrganisations(searchText) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Organisation/GetOrganisations',
                data: { SearchText: searchText, PageData: { IncludeAllData: true } }
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Organisations: data.Items, TotalOrganisations: data.TotalItems });
            });

            return deferred.promise;
        };

        function getOrganisation(organisationId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Organisation/FetchOrganisation/?organisationId=' + organisationId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ organisation: data.Item });
            });

            return deferred.promise;
        };

        function addOrganisation(organisation) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Organisation/AddOrganisation',
                data: organisation
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ organisation: data.Item });
            });

            return deferred.promise;
        };

        function updateOrganisation(organisation) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Organisation/UpdateOrganisation',
                data: organisation
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ organisation: data.Item });
            });

            return deferred.promise;
        };

        function saveOrganisationLogo(file, inProgressFunction) {
            var deferred = $q.defer();

            $upload.upload({
                url: ServerApiBaseUrl + '/Organisation/SaveImage',
                method: "POST",
                file: file
            }).progress(function (event) {
                inProgressFunction(event);
            }).success(function (data, status, headers, config) {
                deferred.resolve({ PolicyImage: data });
            });

            return deferred.promise;
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('productApiFactory', productApiFactory);

    productApiFactory.$inject = ['$http', '$rootScope', '$q', '$upload', 'ServerApiBaseUrl'];

    function productApiFactory($http, $rootScope, $q, $upload, ServerApiBaseUrl) {
        var factory = {
            getProducts: getProducts,
            getAppProducts: getAppProducts,
            getProduct: getProduct,
            addProduct: addProduct,
            updateProduct: updateProduct,
            deleteProduct: deleteProduct,
            saveProductLogo: saveProductLogo
        };

        return factory;

        function getProducts(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Product/GetProducts',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Products: data.Items, TotalProducts: data.TotalItems });
            });

            return deferred.promise;
        };

        function getAppProducts(searchFilter) {
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
                url: ServerApiBaseUrl + '/Product/FetchProduct/?productId=' + productId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Product: data.Item });
            });

            return deferred.promise;
        };

        function addProduct(product) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Product/AddProduct',
                data: product
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Product: data.Item });
            });

            return deferred.promise;
        };

        function updateProduct(product) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Product/UpdateProduct',
                data: product
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Product: data.Item });
            });

            return deferred.promise;
        };

        function deleteProduct(product) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Product/DeleteProduct',
                data: product
            })
            .success(function (data, status, headers, config) {
                deferred.resolve();
            });

            return deferred.promise;
        };

        function saveProductLogo(file, inProgressFunction) {
            var deferred = $q.defer();

            $upload.upload({
                url: ServerApiBaseUrl + '/Product/SaveImage',
                method: "POST",
                file: file
            }).progress(function (event) {
                inProgressFunction(event);
            }).success(function (data, status, headers, config) {
                deferred.resolve({ ProductImage: data });
            });

            return deferred.promise;
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('promotionProductApiFactory', promotionProductApiFactory);

    promotionProductApiFactory.$inject = ['$http', '$rootScope', '$q', '$upload', 'ServerApiBaseUrl'];

    function promotionProductApiFactory($http, $rootScope, $q, $upload, ServerApiBaseUrl) {
        var factory = {
            getPromotionProducts: getPromotionProducts,
            getAppPromotionProducts: getAppPromotionProducts,
            getPromotionProduct: getPromotionProduct,
            addPromotionProduct: addPromotionProduct,
            updatePromotionProduct: updatePromotionProduct,
            deletePromotionProduct: deletePromotionProduct,
            savePromotionProductLogo: savePromotionProductLogo
        };

        return factory;

        function getPromotionProducts(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/PromotionProduct/GetPromotionProducts',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ PromotionProducts: data.Items, TotalPromotionProducts: data.TotalItems });
            });

            return deferred.promise;
        };

        function getAppPromotionProducts(searchFilter) {
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
        };

        function getPromotionProduct(promotionProductId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/PromotionProduct/FetchPromotionProduct/?promotionProductId=' + promotionProductId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ PromotionProduct: data.Item });
            });

            return deferred.promise;
        };

        function addPromotionProduct(promotionProduct) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/PromotionProduct/AddPromotionProduct',
                data: promotionProduct
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ PromotionProduct: data.Item });
            });

            return deferred.promise;
        };

        function updatePromotionProduct(promotionProduct) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/PromotionProduct/UpdatePromotionProduct',
                data: promotionProduct
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ PromotionProduct: data.Item });
            });

            return deferred.promise;
        };

        function deletePromotionProduct(promotionProduct) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/PromotionProduct/DeletePromotionProduct',
                data: promotionProduct
            })
            .success(function (data, status, headers, config) {
                deferred.resolve();
            });

            return deferred.promise;
        };

        function savePromotionProductLogo(file, inProgressFunction) {
            var deferred = $q.defer();

            $upload.upload({
                url: ServerApiBaseUrl + '/PromotionProduct/SaveImage',
                method: "POST",
                file: file
            }).progress(function (event) {
                inProgressFunction(event);
            }).success(function (data, status, headers, config) {
                deferred.resolve({ PromotionProductImage: data });
            });

            return deferred.promise;
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('roleApiFactory', roleApiFactory);

    roleApiFactory.$inject = ['$http', '$q', 'ServerApiBaseUrl'];

    function roleApiFactory($http, $q, ServerApiBaseUrl) {
        var factory = {
            getAllRoles: getAllRoles,
            searchRoles: searchRoles,
            getRole: getRole,
            addRole: addRole,
            updateRole: updateRole,
            deleteRole: deleteRole
        };

        return factory;

        function getAllRoles(searchText) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Role/GetRoles/',
                data: { SearchText: searchText, PageData: { IncludeAllData: true, SortOrder: 1 } }
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Roles: data.Items, TotalRoles: data.TotalItems });
            });

            return deferred.promise;
        };

        function searchRoles(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Role/GetRoles/',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Roles: data.Items, TotalRoles: data.TotalItems });
            });

            return deferred.promise;
        };

        function getRole(roleId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Role/FetchRole/?roleId=' + roleId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Role: data.Item });
            });

            return deferred.promise;
        };

        function addRole(role) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Role/AddRole',
                data: role
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Role: data.Item });
            });

            return deferred.promise;
        };

        function updateRole(role) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Role/UpdateRole',
                data: role
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Role: data.Item });
            });

            return deferred.promise;
        };

        function deleteRole(role) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Role/DeleteRole',
                data: role
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

    angular.module('app').factory('subCategoryApiFactory', subCategoryApiFactory);

    subCategoryApiFactory.$inject = ['$http', '$rootScope', '$q', '$upload', 'ServerApiBaseUrl'];

    function subCategoryApiFactory($http, $rootScope, $q, $upload, ServerApiBaseUrl) {
        var factory = {
            getSubCategories: getSubCategories,
            getSubCategory: getSubCategory,
            addSubCategory: addSubCategory,
            updateSubCategory: updateSubCategory,
            deleteSubCategory: deleteSubCategory
        };

        return factory;

        function getSubCategories(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/SubCategory/GetSubCategories',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ SubCategories: data.Items, TotalSubCategories: data.TotalItems });
            });

            return deferred.promise;
        };

        function getSubCategory(subCategoryId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/SubCategory/FetchSubCategory/?subCategoryId=' + subCategoryId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ SubCategory: data.Item });
            });

            return deferred.promise;
        };

        function addSubCategory(subCategory) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/SubCategory/AddSubCategory',
                data: subCategory
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ SubCategory: data.Item });
            });

            return deferred.promise;
        };

        function updateSubCategory(subCategory) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/SubCategory/UpdateSubCategory',
                data: subCategory
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ SubCategory: data.Item });
            });

            return deferred.promise;
        };

        function deleteSubCategory(subCategory) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/SubCategory/DeleteSubCategory',
                data: subCategory
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ SubCategory: data.Item });
            });

            return deferred.promise;
        };

    };

})();
(function () {

    'use strict';

    angular.module('app').factory('utilsFactory', utilsFactory);


    utilsFactory.$inject = ['$http', '$q'];

    function utilsFactory($http, $q) {
        var factory = {
            stringToDate: stringToDate,
            getCurrentLocation: getCurrentLocation
        };

        return factory;

        function getCurrentLocation() {
            var deferred = $q.defer();

            navigator.geolocation.getCurrentPosition(function (data) {
                deferred.resolve({ Position: data.coords });
            }, function () {
                getCurrentLocationUsingGoogleMaps(deferred).then(function (response) {
                    deferred.resolve({ Position: response.Position });
                }, function () {
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

    angular.module('app').controller('beautyTipsController', BeautyTipsController);

    BeautyTipsController.$inject = ['$scope', '$rootScope', '$state', 'notificationFactory', 'beautyTipsFactory', 'appFactory'];

    function BeautyTipsController($scope, $rootScope, $state, notificationFactory, beautyTipsFactory, appFactory) {
        var viewModel = $scope;

        viewModel.beautyTipsFactory = beautyTipsFactory;
        viewModel.addBeuatyTip = addBeuatyTip;
        viewModel.editBeuatyTip = editBeuatyTip;
        viewModel.deleteBeuatyTip = deleteBeuatyTip;
        viewModel.searchBeuatyTips = searchBeuatyTips;
        viewModel.activateBeuatyTip = activateBeuatyTip;

        appFactory.Initialise();

        var companyId = appFactory.User.CompanyId;
        viewModel.isCompanyUser = appFactory.User.CompanyId != null;

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: ''
        };

        viewModel.beautyTipsGridOptions = {
            Paging: {
                PageIndex: 1,
                PageSize: 5
            },
            PageSizes: [30, 40, 60, 90, 100],
            Read: function (options) {
                var that = this;

                $rootScope.isLoading = true;
                $rootScope.loadingMessage = 'Loading data, please wait ...';

                viewModel.SearchFilter.PageData.Take = options.take;
                viewModel.SearchFilter.PageData.Skip = options.skip;

                viewModel.beautyTipsFactory.searchBeuatyTips(viewModel.SearchFilter).then(function (response) {
                    viewModel.beautyTipsGrid.SetDataSource(response.BeautyTips, response.TotalBeautyTips);
                    $rootScope.isLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            viewModel.beautyTipsFactory.initialise().then(function () {
                viewModel.beautyTipsGrid.SetPage(null, 1);
            });
        });

        viewModel.$on('beuaty-tip-updated', function (event, data) {
            viewModel.beautyTipsGrid.SetPage(null, viewModel.beautyTipsGrid.Paging.PageIndex);
        });

        function searchBeuatyTips() {
            viewModel.beautyTipsGrid.SetPage(null, 1);
        };

        function addBeuatyTip() {
            var newScope = $rootScope.$new();
            newScope.actionType = 'CREATE';
            viewModel.beautyTipsFactory.beuatyTip = {};

            notificationFactory.open({
                templateUrl: 'beuatytiptemplate.html',
                scope: newScope,
                size: 'lg',
                controller: beuatyTipModalController
            });
        };

        function editBeuatyTip(beuatyTip) {
            viewModel.beautyTipsFactory.edit(beuatyTip.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'UPDATE';

                notificationFactory.open({
                    templateUrl: 'beuatytiptemplate.html',
                    scope: newScope,
                    size: 'lg',
                    controller: beuatyTipModalController
                });
            });
        };

        function deleteBeuatyTip(beuatyTip) {
            viewModel.beautyTipsFactory.edit(beuatyTip.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'DELETE';

                notificationFactory.open({
                    templateUrl: 'beuatytiptemplate.html',
                    scope: newScope,
                    size: 'sm',
                    controller: beuatyTipModalController
                });
            });
        }

        function activateBeuatyTip(beuatyTip) {
            viewModel.beautyTipsFactory.beuatyTip = beuatyTip;
            viewModel.beautyTipsFactory.actvate(beuatyTip).then(function (response) {
                viewModel.beautyTipsGrid.SetPage(null, 1);
            });
        }
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('beautyTipsFactory', beautyTipsFactory);

    beautyTipsFactory.$inject = ['$q', '$rootScope', 'beautyTipApiFactory', 'lookupApiFactory'];

    function beautyTipsFactory($q, $rootScope, beautyTipApiFactory, lookupApiFactory) {
        var factory = {
            initialise: initialise,
            searchBeuatyTips: searchBeuatyTips,
            categories: [],
            subCategories: [],
            beuatyTip: {},
            edit: edit,
            add: add,
            update: update,
            deleteBeuatyTip: deleteBeuatyTip,
            getSubCategories: getSubCategories,
            actvate: actvate
        };

        return factory;

        function initialise() {
            var deferred = $q.defer();

            lookupApiFactory.getCategories({ PageData: { IncludeAllData: true } }).then(function (response) {
                factory.categories = response.Items;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function searchBeuatyTips(searchFilter) {
            var deferred = $q.defer();

            beautyTipApiFactory.getBeautyTips(searchFilter).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        };

        function edit(beautyTipId) {
            var deferred = $q.defer();

            beautyTipApiFactory.getBeautyTip(beautyTipId).then(function (data) {
                factory.beuatyTip = data.BeautyTip;

                if (factory.beuatyTip.CategoryId) {
                    factory.getSubCategories(factory.beuatyTip.CategoryId).then(function () {
                        deferred.resolve();
                    });
                }
                else {
                    deferred.resolve();
                }
            });

            return deferred.promise;
        };

        function add() {
            var deferred = $q.defer();

            beautyTipApiFactory.addBeautyTip(factory.beuatyTip).then(function (data) {
                factory.beuatyTip = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function update() {
            var deferred = $q.defer();

            beautyTipApiFactory.updateBeautyTip(factory.beuatyTip).then(function (data) {
                factory.beuatyTip = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function deleteBeuatyTip() {
            var deferred = $q.defer();

            beautyTipApiFactory.deleteBeautyTip(factory.beuatyTip).then(function (data) {
                factory.beuatyTip = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function actvate() {
            var deferred = $q.defer();

            beautyTipApiFactory.activateBeautyTip(factory.beuatyTip).then(function (data) {
                factory.beuatyTip = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function getSubCategories(categoryId) {
            var deferred = $q.defer();

            lookupApiFactory.getSubCategories({ CategoryId: categoryId, PageData: { IncludeAllData: true } }).then(function (response) {
                factory.subCategories = response.Items;
                deferred.resolve();
            });

            return deferred.promise;
        };
    };

})();
beuatyTipModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'beautyTipsFactory'];

function beuatyTipModalController($scope, $rootScope, $uibModalInstance, beautyTipsFactory) {
    var viewModel = $scope;

    viewModel.IsDeleteUser = viewModel.actionType == 'DELETE';
    viewModel.Title = viewModel.actionType == 'DELETE' ? 'Delete Beuaty Tip' : viewModel.actionType == 'CREATE' ? 'Add New Beuaty Tip' : 'Edit Beuaty Tip';
    viewModel.cancel = cancel;
    viewModel.save = save;
    viewModel.beautyTipsFactory = beautyTipsFactory;
    viewModel.categoryChange = categoryChange;

    function cancel() {
        $uibModalInstance.dismiss();
    };
    
    function save() {
        if (!viewModel.frmBeautyTip.$valid) {
            $rootScope.$broadcast('action-complete', true);
            return;
        }

        if (viewModel.actionType == 'CREATE') {
            viewModel.beautyTipsFactory.add().then(function (data) {
                $rootScope.$broadcast('beuaty-tip-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'UPDATE') {
            viewModel.beautyTipsFactory.update().then(function (data) {
                $rootScope.$broadcast('beuaty-tip-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'DELETE') {
            viewModel.beautyTipsFactory.deleteBeuatyTip().then(function (data) {
                $rootScope.$broadcast('beuaty-tip-updated', true);
                $uibModalInstance.dismiss();
            });
        }
    };

    function categoryChange() {
        viewModel.beautyTipsFactory.getSubCategories(viewModel.beautyTipsFactory.beuatyTip.CategoryId);
    };
};


(function () {

    'use strict';

    angular.module('app').controller('changePasswordController', ChangePasswordController);

    ChangePasswordController.$inject = ['$scope', '$rootScope', '$state', '$location', 'changePasswordFactory', 'appFactory'];

    function ChangePasswordController($scope, $rootScope, $state, $location, changePasswordFactory, appFactory) {
        var viewModel = $scope;

        appFactory.Initialise();

        viewModel.changepassword = changepassword;
        viewModel.model = { Username: appFactory.User.UserName };

        function changepassword() {
            if (!viewModel.frmChangePassword.$valid) {
                $rootScope.$broadcast('action-complete', true);
                return;
            }

            changePasswordFactory.changePassword(viewModel.model).then(function (response) {
                $state.go(response.redirectState);
            });
        };

    };

})();
(function () {

    'use strict';

    angular.module('app').factory('changePasswordFactory', changePasswordFactory);

    changePasswordFactory.$inject = ['$http', '$q', '$state', 'ServerApiBaseUrl', 'appFactory'];

    function changePasswordFactory($http, $q, $state, ServerApiBaseUrl, appFactory) {
        var factory = {
            changePassword: changePassword
        };

        return factory;

        function changePassword(model) {
            var deferred = $q.defer();

            $http(
            {
                method: 'Post',
                url: ServerApiBaseUrl + '/Account/ChangePassword/',
                data: model
            })
            .success(function (data, status, headers, config) {
                if (data.HasErrors) {
                    deferred.reject();
                    return;
                }

                appFactory.Login(data.Item, data.access_token);

                var landingRoute = app.RoutesManager.getLandingRoute(appFactory.User.AccessModules, $state.get());

                deferred.resolve({ redirectState: landingRoute.name });
            });

            return deferred.promise;
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').controller('companyRequestsController', companyRequestsController);

    companyRequestsController.$inject = ['$scope', '$rootScope', '$state', 'notificationFactory', 'salonsFactory', 'companyRequestApiFactory'];

    function companyRequestsController($scope, $rootScope, $state, notificationFactory, salonsFactory, companyRequestApiFactory) {
        var viewModel = $scope;

        viewModel.completeRequest = completeRequest;
        viewModel.declineRequest = declineRequest;
        viewModel.search = search;
        viewModel.goHome = goHome;
        viewModel.request = {};

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: ''
        };

        viewModel.requestsGridOptions = {
            Paging: {
                PageIndex: 1,
                PageSize: 5
            },
            PageSizes: [30, 40, 60, 90, 100],
            Read: function (options) {
                var that = this;

                $rootScope.isLoading = true;
                $rootScope.loadingMessage = 'Loading data, please wait ...';

                viewModel.SearchFilter.PageData.Take = options.take;
                viewModel.SearchFilter.PageData.Skip = options.skip;

                companyRequestApiFactory.getCompanyRequests(viewModel.SearchFilter).then(function (response) {
                    viewModel.requestsGrid.SetDataSource(response.CompanyRequests, response.TotalCompanyRequests);
                    $rootScope.isLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            salonsFactory.initialise().then(function () {
                viewModel.requestsGrid.SetPage(null, 1);
            });
        });

        viewModel.$on('salon-updated', function (event, data) {
            $rootScope.isLoading = true;
            viewModel.request.StatusCode = 'COMPLETED';

            companyRequestApiFactory.updateCompanyRequest(request).then(function (response) {
                $rootScope.isLoading = false;
                viewModel.request = {};
                search();
            });
        });

        function search() {
            viewModel.requestsGrid.SetPage(null, 1);
        };

        function completeRequest(request) {
            var newScope = $rootScope.$new();

            newScope.actionType = 'CREATE';
            viewModel.request = request;

            salonsFactory.salon = {
                CompanyTypeId: salonsFactory.companyTypeId,
                FirstName: request.FirstName,
                LastName: request.LastName,
                EmailAddress: request.EmailAddress
            };

            notificationFactory.open({
                templateUrl: 'salontemplate.html',
                scope: newScope,
                size: 'lg',
                controller: salonModalController
            });
        };

        function declineRequest(request) {
            $rootScope.isLoading = true;
            request.StatusCode = 'DECLINED';

            companyRequestApiFactory.updateCompanyRequest(request).then(function (response) {
                $rootScope.isLoading = false;
                viewModel.request = {};
                search();
            });
        };

        function goHome(e) {
            e.preventDefault();

            $state.go('home');
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').controller('companyUsersController', companyUsersController);

    companyUsersController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'notificationFactory', 'companyUsersFactory', 'appFactory'];

    function companyUsersController($scope, $rootScope, $state, $stateParams, notificationFactory, companyUsersFactory, appFactory) {
        var viewModel = $scope;

        appFactory.Initialise();

        var companyId = $stateParams.companyId ? $stateParams.companyId : appFactory.User.CompanyId;

        viewModel.companyUsersFactory = companyUsersFactory;
        viewModel.searchCompanyUsers = searchCompanyUsers;
        viewModel.addUser = addUser;
        viewModel.editUser = editUser;
        viewModel.deleteUser = deleteUser;
        viewModel.goHome = goHome;
        viewModel.goToSalons = goToSalons;

        viewModel.SearchFilter = {
            PageData: {
                Take: 20,
                Skip: 0
            },
            SearchText: '',
            CompanyId: companyId
        };

        viewModel.companyUsersGridOptions = {
            Paging: {
                PageIndex: 1,
                PageSize: 20
            },
            PageSizes: [20, 40, 60, 90, 100],
            Read: function (options) {
                var that = this;

                $rootScope.isLoading = true;
                $rootScope.loadingMessage = 'Loading data, please wait ...';

                viewModel.SearchFilter.PageData.Take = options.take;
                viewModel.SearchFilter.PageData.Skip = options.skip;

                viewModel.companyUsersFactory.getUsers(viewModel.SearchFilter).then(function (response) {
                    viewModel.companyUsersGrid.SetDataSource(viewModel.companyUsersFactory.users, viewModel.companyUsersFactory.totalUsers);
                    $rootScope.isLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            viewModel.companyUsersFactory.initialise(companyId).then(function () {
                viewModel.companyUsersGrid.SetPage(null, 1);
            });
        });

        viewModel.$on('user-updated', function (event, data) {
            viewModel.companyUsersGrid.SetPage(null, viewModel.companyUsersGrid.Paging.PageIndex);
        });

        function searchCompanyUsers() {
            viewModel.companyUsersGrid.SetPage(null, 1);
        };

        function addUser() {
            var newScope = $rootScope.$new();

            newScope.actionType = 'CREATE';
            viewModel.companyUsersFactory.user = { CompanyId: companyId, RoleId: viewModel.companyUsersFactory.role.Id };

            notificationFactory.open({
                templateUrl: 'companyusertemplate.html',
                scope: newScope,
                size: 'xs',
                controller: companyUserModalController
            });
        };

        function editUser(user) {

            viewModel.companyUsersFactory.editUser(user.Id).then(function (response) {
                var newScope = $rootScope.$new();

                newScope.actionType = 'UPDATE';

                notificationFactory.open({
                    templateUrl: 'companyusertemplate.html',
                    scope: newScope,
                    size: 'xs',
                    controller: companyUserModalController
                });
            });
        };

        function deleteUser(user) {
            viewModel.companyUsersFactory.editUser(user.Id).then(function (response) {
                var newScope = $rootScope.$new();

                newScope.actionType = 'DELETE';
                newScope.model = user;

                notificationFactory.open({
                    templateUrl: 'companyusertemplate.html',
                    scope: newScope,
                    size: 'xs',
                    controller: companyUserModalController
                });
            });
        };

        function goHome(e) {
            e.preventDefault();

            $state.go('home');
        };

        function goToSalons(e) {
            e.preventDefault();

            $state.go('salons');
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('companyUsersFactory', companyUsersFactory);

    companyUsersFactory.$inject = ['$q', 'companyApiFactory', 'accountApiFactory', 'roleApiFactory'];

    function companyUsersFactory($q, companyApiFactory, accountApiFactory, roleApiFactory) {

        var factory = {
            initialise: initialise,
            salon: {},
            role: {},
            getUsers: getUsers,
            user: {},
            editUser: editUser,
            addUser: addUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
        };

        return factory;

        function initialise(companyId) {
            var deferred = $q.defer();
            var promises = {
                RolesPromise: roleApiFactory.getAllRoles(''),
                CompanyPrmoise: companyApiFactory.getCompany(companyId)
            };

            $q.all(promises).then(function (values) {
                for (var i = 0; i < values.RolesPromise.Roles.length; i++) {
                    if (values.RolesPromise.Roles[i].Code == 'ADM') {
                        factory.role = values.RolesPromise.Roles[i];
                        break;
                    }
                }

                factory.salon = values.CompanyPrmoise.Company;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function getUsers(searchFilter) {
            var deferred = $q.defer();

            accountApiFactory.getUsers(searchFilter).then(function (response) {
                factory.users = response.Users;
                factory.totalUsers = response.TotalUsers;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function editUser(userId) {
            var deferred = $q.defer();

            accountApiFactory.getUser(userId).then(function (data) {
                factory.user = data.User
                deferred.resolve();
            });

            return deferred.promise;
        };

        function addUser() {
            var deferred = $q.defer();

            accountApiFactory.addUser(factory.user).then(function (response) {
                factory.user = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function updateUser() {
            var deferred = $q.defer();

            accountApiFactory.updateUser(factory.user).then(function (response) {
                factory.user = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function deleteUser() {
            var deferred = $q.defer();

            accountApiFactory.deleteUser(factory.user).then(function (response) {
                factory.user = {};
                deferred.resolve();
            });

            return deferred.promise;
        };
    };

})();
'use strict';

companyUserModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'companyUsersFactory'];

function companyUserModalController($scope, $rootScope, $uibModalInstance, companyUsersFactory) {
    var viewModel = $scope;

    viewModel.IsDeleteUser = viewModel.actionType == 'DELETE';
    viewModel.IsNew = viewModel.actionType == 'CREATE';
    viewModel.Title = viewModel.IsNew ? 'Add New User' : viewModel.IsDeleteUser ? 'Delete User' : 'Edit User';
    viewModel.save = save;
    viewModel.cancel = cancel;
    viewModel.companyUsersFactory = companyUsersFactory;

    function cancel() {
        $rootScope.$broadcast('user-cancel');
        $uibModalInstance.dismiss();
    };

    function save() {

        if (!viewModel.frmCompanyUser.$valid) {
            $rootScope.$broadcast('action-complete', true);
            return;
        }

        if (viewModel.actionType == 'CREATE') {
            companyUsersFactory.addUser().then(function (data) {
                $rootScope.$broadcast('user-updated');
                $uibModalInstance.dismiss();
            });
        }

        if (viewModel.actionType == 'UPDATE') {
            companyUsersFactory.updateUser().then(function (data) {
                $rootScope.$broadcast('user-updated');
                $uibModalInstance.dismiss();
            });
        }
        if (viewModel.actionType == 'DELETE') {
            companyUsersFactory.deleteUser().then(function (data) {
                $rootScope.$broadcast('user-updated');
                $uibModalInstance.dismiss();
            });
        }
    };

};

(function () {

    'use strict';

    angular.module('app').controller('contactUsController', contactUsController);

    contactUsController.$inject = ['$scope', '$rootScope', '$state', 'lookupApiFactory'];

    function contactUsController($scope, $rootScope, $state, lookupApiFactory) {
        var viewModel = $scope;

        viewModel.isMessageSent = false;
        viewModel.model = {};
        viewModel.contactUsModel = {};
        viewModel.sendMessage = sendMessage;


        lookupApiFactory.getContactDetails().then(function (data) {
            viewModel.model = data;
        });

        function sendMessage() {
            if (!viewModel.frmContactUs.$valid) {
                $rootScope.$broadcast('action-complete', true);
                return;
            }
            lookupApiFactory.sendMessage(viewModel.contactUsModel).then(function (data) {
                viewModel.isMessageSent = true;
            });
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

    angular.module('app').controller('forgotPasswordController', ForgotPasswordController);

    ForgotPasswordController.$inject = ['$scope', '$rootScope', '$state', 'forgotPasswordFactory'];

    function ForgotPasswordController($scope, $rootScope, $state, forgotPasswordFactory) {
        var viewModel = $scope;

        viewModel.isPasswordResetSuccessFull = false;
        viewModel.forgotpassword = forgotpassword;

        function forgotpassword() {
            if (!viewModel.frmForgotPassword.$valid) {
                $rootScope.$broadcast('action-complete', true);
                return;
            }

            forgotPasswordFactory.forgotPassword(viewModel.Username).then(function (response) {
                viewModel.isPasswordResetSuccessFull = true;
            });
        };

    };

})();
(function () {

    'use strict';

    angular.module('app').factory('forgotPasswordFactory', ForgotPasswordFactory);

    ForgotPasswordFactory.$inject = ['$http', '$q', 'ServerApiBaseUrl'];

    function ForgotPasswordFactory($http, $q, ServerApiBaseUrl) {
        var factory = {
            forgotPassword: forgotPassword,
            passwordReset: passwordReset
        };

        return factory;

        function forgotPassword(username) {
            var deferred = $q.defer();

            $http(
            {
                method: 'Post',
                url: ServerApiBaseUrl + 'Account/ForgotPassword/?username=' + username
            })
            .success(function (data, status, headers, config) {

                if (data.HasErrors) {
                    deferred.reject();
                    return;
                }

                deferred.resolve();
            });

            return deferred.promise;
        };

        function passwordReset(model) {
            var deferred = $q.defer();

            $http(
            {
                method: 'Post',
                url: ServerApiBaseUrl + 'Account/ResetPassword/',
                data: model
            })
            .success(function (data, status, headers, config) {

                if (data.HasErrors) {
                    deferred.reject();
                    return;
                }

                deferred.resolve();
            });

            return deferred.promise;
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').controller('resetPasswordController', ResetPasswordController);

    ResetPasswordController.$inject = ['$scope', '$rootScope', '$state', '$location', 'forgotPasswordFactory'];

    function ResetPasswordController($scope, $rootScope, $state, $location, forgotPasswordFactory) {
        var qParams = $location.search();

        //if (!qParams.key) {
        //    return $location.path('/');
        //}

        var viewModel = $scope;

        viewModel.isPasswordResetSuccessFull = false;
        viewModel.resetpassword = resetpassword;
        viewModel.goToLogin = gotologin;
        viewModel.model = { ForgotPasswordKey: qParams.key };

        function resetpassword() {
            if (!viewModel.frmForgotPassword.$valid) {
                $rootScope.$broadcast('action-complete', true);
                return;
            }

            forgotPasswordFactory.passwordReset(viewModel.model).then(function (response) {
                viewModel.isPasswordResetSuccessFull = true;
            });
        };

        function gotologin(e) {
            e.preventDefault();

            return $location.path('/login');
        }

    };

})();
(function () {

    'use strict';

    angular.module('app').controller('homeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope', '$state', 'appFactory', 'dashboardApiFactory'];

    function HomeController($scope, $rootScope, $state, appFactory, dashboardApiFactory) {
        var viewModel = $scope;

        viewModel.model = {};
        viewModel.goToSalons = goToSalons;
        viewModel.goToProducts = goToProducts;
        viewModel.goToUsers = goToUsers;
        viewModel.goToRequests = goToRequests;

        initialise();

        function goToSalons(e) {
            e.preventDefault();

            $state.go('salons');
        };

        function initialise() {
            $rootScope.isLoading = true;
            $rootScope.loadingMessage = 'Loading data, please wait ...';

            dashboardApiFactory.getData().then(function (data) {
                viewModel.model = data.Dashboard;
                $rootScope.isLoading = false;
            });
        }
        function goToProducts(salon) {
            $state.go('products', { salonId: salon.Id });
        };

        function goToUsers(salon) {
            $state.go('companyusers', { companyId: salon.Id });
        };
        function goToRequests(e) {
            e.preventDefault();

            $state.go('salonrequests');
        };
    };

})();

(function () {

    'use strict';

    angular.module('app').controller('loginController', LoginController);

    LoginController.$inject = ['$scope', '$rootScope', '$state', 'loginFactory'];

    function LoginController($scope, $rootScope, $state, loginFactory) {
        var viewModel = $scope;

        viewModel.model = {};
        viewModel.forgotPassword = forgotpassword;
        viewModel.login = login;
        viewModel.externalProviderLogin = externalProviderLogin;

        function forgotpassword() {
            $state.path('root.resetpassword');
        };

        function login() {
            if (!viewModel.frmLogin.$valid) {
                $rootScope.$broadcast('action-complete', true);
                return;
            }

            loginFactory.login(viewModel.model.Username, viewModel.model.Password).then(function (response) {
                $state.go(response.redirectState);
            });
        };

        function externalProviderLogin(e, provider) {
            e.preventDefault();

            loginFactory.loginauthExternalProvider(provider, $scope);
        };

        $scope.authCompletedCB = function (fragment) {

            $scope.$apply(function () {

                if (fragment.haslocalaccount == 'False') {

                    authService.logOut();

                    authService.externalAuthData = {
                        provider: fragment.provider,
                        userName: fragment.external_user_name,
                        externalAccessToken: fragment.external_access_token
                    };

                    $location.path('/associate');

                }
                else {
                    //Obtain access token and redirect to orders
                    var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                    loginFactory.obtainAccessToken(externalData).then(function (response) {

                        $location.path('/orders');

                    },
                 function (err) {
                     $scope.message = err.error_description;
                 });
                }

            });
        }
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('loginFactory', loginFactory);

    loginFactory.$inject = ['$http', '$q', '$state', 'ServerBaseUrl', 'appFactory', 'errorFactory'];

    function loginFactory($http, $q, $state, ServerBaseUrl, appFactory, errorFactory) {
        var factory = {
            login: login,
            loginauthExternalProvider: authExternalProvider,
            obtainAccessToken: obtainAccessToken
        };

        return factory;

        function login(username, password) {
            var deferred = $q.defer();
            var data = "grant_type=password&username=" + username + "&password=" + password;

            $http(
            {
                method: 'Post',
                url: ServerBaseUrl + 'Account/Login',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            })
            .success(function (data, status, headers, config) {
                var response = JSON.parse(data.UserModel);

                if (!response || response.HasErrors) {
                    deferred.reject();
                    return;
                }

                appFactory.Login(response.Item, data.access_token);

                if (response.Item.IsFirstTimeLoggedInd) {
                    deferred.resolve({ redirectState: 'changepassword' });
                    return;
                }

                if (appFactory.User.AccessModules == null || appFactory.User.AccessModules.length == 0) {
                    errorFactory.handleHttpServerError({
                        status: 403,
                        data: {
                            Message: 'You do not have enough permessions to access this view.'
                        }
                    });
                    deferred.reject();
                    return;
                }

                var landingRoute = app.RoutesManager.getLandingRoute(appFactory.User.AccessModules, $state.get());

                deferred.resolve({ redirectState: landingRoute.name });
            });

            return deferred.promise;
        };

        function authExternalProvider(provider, scope) {
            var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

            var externalProviderUrl = ServerBaseUrl + "api/Account/ExternalLogin?provider=" + provider
                                                                        + "&response_type=token&client_id=ngAuthApp"
                                                                        + "&redirect_uri=" + redirectUri;
            window.$windowScope = scope;

            var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
        };


        function obtainAccessToken(externalData) {

            var deferred = $q.defer();

            $http.get(ServerBaseUrl + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {


                deferred.resolve(response);

            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;

        };
    };

})();
(function () {

    'use strict';

    angular.module('app').controller('organisationsController', OrganisationsController);

    OrganisationsController.$inject = ['$scope', '$rootScope', '$state', 'notificationFactory', 'organisationsFactory', 'appFactory'];

    function OrganisationsController($scope, $rootScope, $state, notificationFactory, organisationsFactory, appFactory) {
        var viewModel = $scope;

        viewModel.organisationsFactory = organisationsFactory;
        viewModel.addOrganisation = addOrganisation;
        viewModel.editOrganisation = editOrganisation;
        viewModel.viewOrganisation = viewOrganisation;

        viewModel.searchText = '';

        initialise();

        function addOrganisation() {
            var newScope = $rootScope.$new();
            viewModel.organisationsFactory.organisation = {};

            newScope.actionType = 'CREATE';

            notificationFactory.open({
                templateUrl: 'organisationtemplate.html',
                scope: newScope,
                controller: organisationModalController
            });
        };

        function editOrganisation(organisation, e) {
            e.preventDefault();

            sessionStorage.setItem("Organisation", JSON.stringify(organisation));

            $state.go('organisation', { organisationId: organisation.Id });
        };

        function viewOrganisation(organisation, e) {
            e.preventDefault();
            
            appFactory.ViewOrganisation(organisation);
            $state.go('companies');
        };

        function initialise() {
            viewModel.organisationsFactory.searchOrganisations(viewModel.searchText).then(function (response) {

            });
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('organisationsFactory', organisationsFactory);

    organisationsFactory.$inject = ['$q', 'organisationApiFactory'];

    function organisationsFactory($q, organisationApiFactory) {
        var factory = {
            searchOrganisations: searchOrganisations,
            organisations: [],
            organisation: {},
            clearAll: clearAll,
            add: add,
            uploadOrganisationImage: uploadOrganisationImage
        };

        return factory;

        function searchOrganisations(searchText) {
            var deferred = $q.defer();

            organisationApiFactory.getOrganisations(searchText).then(function (data) {
                factory.organisations = data.Organisations;
                factory.organisation = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function clearAll() {
            factory.organisations = data;
            factory.organisation = {};
        };

        function add() {
            var deferred = $q.defer();

            organisationApiFactory.addOrganisation(factory.organisation).then(function (data) {
                factory.organisations.push(data.organisation);
                factory.organisation = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function uploadOrganisationImage(file) {
            var deferred = $q.defer();

            organisationApiFactory.saveOrganisationLogo(file, inProgressFunction).then(function (data) {
                factory.organisation.LogoFileName = data.PolicyImage.ImageFileName;
                factory.organisation.LogoFileNamePath = data.PolicyImage.ImageFileNamePath;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function inProgressFunction(event) {
            var progressPercentage = parseInt(100.0 * event.loaded / event.total);
            console.log('progress: ' + progressPercentage + '% ' + event.config.file.name);
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').controller('organisationController', OrganisationController);

    OrganisationController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'notificationFactory', 'organisationFactory', 'toastr', 'toastrConfig', 'appFactory', '$breadcrumb'];

    function OrganisationController($scope, $rootScope, $state, $stateParams, notificationFactory, organisationFactory, toastr, toastrConfig, appFactory, $breadcrumb) {
        var viewModel = $scope;
        var organisationId = $stateParams.organisationId;

        appFactory.Initialise();

        if (!organisationId) {
            //$rootScope.DoesPageHaveBreadcrumb = false;
            $state.$current.self.ncyBreadcrumb.parent = 'companies';
            organisationId = appFactory.User.OrganisationId;
        }

        viewModel.uploadImage = uploadImage;
        viewModel.organisationFactory = organisationFactory;
        viewModel.saveOrganisation = saveOrganisation;
        viewModel.setPostalSameAsPhysicalAddress = setPostalSameAsPhysicalAddress;
        toastrConfig.positionClass = 'toast-bottom-right';

        viewModel.organisationFactory.getOrganisation(organisationId);

        function uploadImage(files) {
            var isInvalidFileFound = false;

            $scope.imageuploading = true;

            if (!files || files.length == 0) {
                $scope.imageuploading = false;
                return;
            }

            angular.forEach(files, function (file, key) {
                if (file.type.indexOf('image') < 0) {
                    isInvalidFileFound = true;
                    return;
                }
            });

            if (isInvalidFileFound) {
                alert('Only image files can be uploaded for an organisation logo');
                $scope.imageuploading = false;
                return;
            }

            viewModel.organisationFactory.uploadOrganisationImage(files[0]).then(function (data) {
                $scope.imageuploading = false;
            });
        };

        function saveOrganisation() {
            if (!viewModel.frmOrganisation.$valid) {
                $rootScope.$broadcast('action-complete', true);
                return;
            }

            viewModel.organisationFactory.saveOrganisation().then(function (data) {
                toastr.success('Organisation save was successful.', 'Save');
            });
        };

        function setPostalSameAsPhysicalAddress() {
            if (!viewModel.postalSameAsPhysicalAddress) {
                return;
            }

            viewModel.organisationFactory.organisation.PostalAddressLine1 = viewModel.organisationFactory.organisation.PhysicalAddressLine1;
            viewModel.organisationFactory.organisation.PostalAddressLine2 = viewModel.organisationFactory.organisation.PhysicalAddressLine2;
            viewModel.organisationFactory.organisation.PostalAddressSuburb = viewModel.organisationFactory.organisation.PhysicalAddressSuburb;
            viewModel.organisationFactory.organisation.PostalAddressCity = viewModel.organisationFactory.organisation.PhysicalAddressCity;
            viewModel.organisationFactory.organisation.PostalAddressPostalCode = viewModel.organisationFactory.organisation.PhysicalAddressPostalCode;
        };

    };

})();
(function () {

    'use strict';

    angular.module('app').factory('organisationFactory', organisationFactory);

    organisationFactory.$inject = ['$q', 'organisationApiFactory'];

    function organisationFactory($q, organisationApiFactory) {

        var factory = {
            getOrganisation: getOrganisation,
            organisation: {},
            saveOrganisation: saveOrganisation,
            uploadOrganisationImage: uploadOrganisationImage
        };

        return factory;

        function getOrganisation(organisationId) {
            var deferred = $q.defer();

            organisationApiFactory.getOrganisation(organisationId).then(function (data) {
                factory.organisation = data.organisation;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function saveOrganisation() {
            var deferred = $q.defer();

            organisationApiFactory.updateOrganisation(factory.organisation).then(function (data) {
                factory.organisation = data.organisation;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function uploadOrganisationImage(file) {
            var deferred = $q.defer();

            organisationApiFactory.saveOrganisationLogo(file, inProgressFunction).then(function (data) {
                factory.organisation.LogoFileName = data.PolicyImage.ImageFileName;
                factory.organisation.LogoFileNamePath = data.PolicyImage.ImageFileNamePath;
                deferred.resolve();
            });

            return deferred.promise;
        };
        
        function inProgressFunction(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        };
    };

})();

function organisationModalController($scope, $rootScope, $uibModalInstance, organisationsFactory) {
    var viewModel = $scope;

    viewModel.Title = viewModel.actionType == 'CREATE' ? 'Add New Organisation' : 'Edit Organisation';
    viewModel.save = save;
    viewModel.cancel = cancel;
    viewModel.uploadImage = uploadImage;
    viewModel.organisationsFactory = organisationsFactory;
    viewModel.setPostalSameAsPhysicalAddress = setPostalSameAsPhysicalAddress;
    viewModel.postalSameAsPhysicalAddress = false;

    function cancel() {
        $uibModalInstance.dismiss();
    };

    function uploadImage(files) {
        var isInvalidFileFound = false;

        $scope.imageuploading = true;

        if (!files || files.length == 0) {
            $scope.imageuploading = false;
            return;
        }

        angular.forEach(files, function (file, key) {
            if (file.type.indexOf('image') < 0) {
                isInvalidFileFound = true;
                return;
            }
        });

        if (isInvalidFileFound) {
            alert('Only image files can be uploaded for an organisation logo');
            $scope.imageuploading = false;
            return;
        }

        organisationsFactory.uploadOrganisationImage(files[0]).then(function (data) {
            $scope.imageuploading = false;
        });
    };

    function save() {
        if (!viewModel.frmOrganisation.$valid) {
            $rootScope.$broadcast('action-complete', true);
            return;
        }

        if (viewModel.actionType == 'CREATE') {
            organisationsFactory.add().then(function (data) {
                $uibModalInstance.close();
            });
        }

    };

    function setPostalSameAsPhysicalAddress() {
        if (!viewModel.postalSameAsPhysicalAddress) {
            return;
        }

        viewModel.organisationsFactory.organisation.PostalAddressLine1 = viewModel.organisationsFactory.organisation.PhysicalAddressLine1;
        viewModel.organisationsFactory.organisation.PostalAddressLine2 = viewModel.organisationsFactory.organisation.PhysicalAddressLine2;
        viewModel.organisationsFactory.organisation.PostalAddressSuburb = viewModel.organisationsFactory.organisation.PhysicalAddressSuburb;
        viewModel.organisationsFactory.organisation.PostalAddressCity = viewModel.organisationsFactory.organisation.PhysicalAddressCity;
        viewModel.organisationsFactory.organisation.PostalAddressPostalCode = viewModel.organisationsFactory.organisation.PhysicalAddressPostalCode;
    };

};
(function () {

    'use strict';

    angular.module('app').controller('organisationUserController', organisationUserController);

    organisationUserController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'notificationFactory', 'organisationUserFactory'];

    function organisationUserController($scope, $rootScope, $state, $stateParams, notificationFactory, organisationUserFactory) {
        var viewModel = $scope;
        var organisationId = $stateParams.organisationId;

        viewModel.organisationUserFactory = organisationUserFactory;

        viewModel.organisationUserFactory.initialise();

        if (!viewModel.organisationUserFactory.organisation ||
           !viewModel.organisationUserFactory.organisation.Id ||
           viewModel.organisationUserFactory.organisation.Id != Number(organisationId)) {
            $state.go('organisations');
            return;
        }

        viewModel.searchOrganisationUsers = searchOrganisationUsers;
        viewModel.addUser = addUser;
        viewModel.editUser = editUser;
        viewModel.deleteUser = deleteUser;

        viewModel.SearchFilter = {
            PageData: {
                Take: 20,
                Skip: 0
            },
            SearchText: '',
            OrganisationId: organisationId
        };

        viewModel.organisationUsersGridOptions = {
            Paging: {
                PageIndex: 1,
                PageSize: 20
            },
            PageSizes: [20, 40, 60, 90, 100],
            Read: function (options) {
                var that = this;

                $rootScope.isLoading = true;
                $rootScope.loadingMessage = 'Loading data, please wait ...';

                viewModel.SearchFilter.PageData.Take = options.take;
                viewModel.SearchFilter.PageData.Skip = options.skip;

                viewModel.organisationUserFactory.getUsers(viewModel.SearchFilter).then(function (response) {
                    viewModel.organisationUsersGrid.SetDataSource(viewModel.organisationUserFactory.users, viewModel.organisationUserFactory.totalUsers);
                    $rootScope.isLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            viewModel.organisationUsersGrid = data.grid;

            viewModel.organisationUserFactory.getRoles().then(function () {
                viewModel.organisationUsersGrid.SetPage(null, 1);
            });
        });

        viewModel.$on('user-updated', function (event, data) {
            viewModel.organisationUsersGrid.SetPage(null, viewModel.organisationUsersGrid.Paging.PageIndex);
        });

        function searchOrganisationUsers() {
            viewModel.organisationUsersGrid.SetPage(null, 1);
        };

        function addUser() {
            var newScope = $rootScope.$new();

            newScope.actionType = 'CREATE';
            newScope.roles = viewModel.organisationUserFactory.userRoles;
            newScope.model = { OrganisationId: organisationId };

            notificationFactory.open({
                templateUrl: 'organisationusertemplate.html',
                scope: newScope,
                size: 'xs',
                controller: organisationUserModalController
            });
        };

        function editUser(user) {
            var newScope = $rootScope.$new();

            newScope.actionType = 'UPDATE';
            newScope.roles = viewModel.organisationUserFactory.userRoles;
            newScope.model = user;

            notificationFactory.open({
                templateUrl: 'organisationusertemplate.html',
                scope: newScope,
                size: 'xs',
                controller: organisationUserModalController
            });
        };

        function deleteUser(user) {
            var newScope = $rootScope.$new();

            newScope.actionType = 'DELETE';
            newScope.model = user;

            notificationFactory.open({
                templateUrl: 'organisationusertemplate.html',
                scope: newScope,
                size: 'xs',
                controller: organisationUserModalController
            });
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('organisationUserFactory', organisationUserFactory);

    organisationUserFactory.$inject = ['$q', 'accountApiFactory', 'roleApiFactory'];

    function organisationUserFactory($q, accountApiFactory, roleApiFactory) {

        var factory = {
            initialise: initialise,
            organisation: {},
            users: [],
            totalUsers: 0,
            userRoles: [],
            getUsers: getUsers,
            getRoles: getRoles,
            addUser: addUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
        };

        return factory;

        function initialise() {

            if (sessionStorage["Organisation"] === null || sessionStorage["Organisation"] === undefined) {
                return;
            }

            factory.organisation = JSON.parse(sessionStorage["Organisation"]);
        };
    
        function getUsers(searchFilter) {
            var deferred = $q.defer();

            accountApiFactory.getUsers(searchFilter).then(function (response) {
                factory.users = response.Users;
                factory.totalUsers = response.TotalUsers;
                deferred.resolve();
            });

            return deferred.promise;
        }

        function addUser(user) {
            var deferred = $q.defer();

            accountApiFactory.addUser(user).then(function (response) {
                deferred.resolve();
            });

            return deferred.promise;
        };

        function updateUser(user) {
            var deferred = $q.defer();

            accountApiFactory.updateUser(user).then(function (response) {
                deferred.resolve();
            });

            return deferred.promise;
        };

        function deleteUser(user) {
            var deferred = $q.defer();

            accountApiFactory.deleteUser(user).then(function (response) {
                deferred.resolve();
            });

            return deferred.promise;
        };

        function getRoles() {
            var deferred = $q.defer();

            roleApiFactory.getAllRoles('').then(function (data) {
                factory.userRoles = data.Roles;
                deferred.resolve();
            });

            return deferred.promise;
        };
    };

})();
'use strict';

organisationUserModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'organisationUserFactory'];

function organisationUserModalController($scope, $rootScope, $uibModalInstance, organisationUserFactory) {
    var viewModel = $scope;

    viewModel.IsDeleteUser = viewModel.actionType == 'DELETE';
    viewModel.IsNew = viewModel.actionType == 'CREATE';
    viewModel.Title = viewModel.IsNew ? 'Add New User' : viewModel.IsDeleteUser ? 'Delete User' : 'Edit User';
    viewModel.save = save;
    viewModel.deleteUser = deleteUser;
    viewModel.cancel = cancel;

    function cancel() {
        $rootScope.$broadcast('user-cancel');
        $uibModalInstance.dismiss();
    };

    function save() {

        if (!viewModel.frmOrganisationUser.$valid) {
            $rootScope.$broadcast('action-complete', true);
            return;
        }

        if (viewModel.actionType == 'CREATE') {
            organisationUserFactory.addUser(viewModel.model).then(function (data) {
                $rootScope.$broadcast('user-updated');
                $uibModalInstance.dismiss();
            });
        }

        if (viewModel.actionType == 'UPDATE') {
            organisationUserFactory.updateUser(viewModel.model).then(function (data) {
                $rootScope.$broadcast('user-updated');
                $uibModalInstance.dismiss();
            });
        }
    };

    function deleteUser() {
        organisationUserFactory.deleteUser(viewModel.model).then(function (data) {
            $rootScope.$broadcast('user-updated');
            $uibModalInstance.dismiss();
        });
    };
};

(function () {

    'use strict';

    angular.module('app').controller('companyController', CompanyController);

    CompanyController.$inject = ['$scope', '$uibModalInstance', '$state', 'items'];

    function CompanyController($scope, $uibModalInstance, $state, items) {
        var viewModel = $scope;

        viewModel.items = items;
        viewModel.selected = {
            item: viewModel.items[0]
        };
        viewModel.ok = ok
        viewModel.cancel = cancel;

        function ok() {
            $uibModalInstance.close($scope.selected.item);
        };

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').controller('productsController', productsController);

    productsController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'notificationFactory', 'productsFactory', 'appFactory'];

    function productsController($scope, $rootScope, $state, $stateParams, notificationFactory, productsFactory, appFactory) {
        var viewModel = $scope;

        appFactory.Initialise();

        var companyId = $stateParams.salonId ? $stateParams.salonId : appFactory.User.CompanyId;

        viewModel.productsFactory = productsFactory;
        viewModel.addProduct = addProduct;
        viewModel.editProduct = editProduct;
        viewModel.deleteProduct = deleteProduct;
        viewModel.searchProducts = searchProducts;
        viewModel.goHome = goHome;
        viewModel.goToSalons = goToSalons;
        viewModel.goToPromotions = goToPromotions;

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: '',
            CompanyId: {}
        };

        viewModel.productsGridOptions = {
            Paging: {
                PageIndex: 1,
                PageSize: 30
            },
            PageSizes: [30, 40, 60, 90, 100],
            Read: function (options) {
                var that = this;

                $rootScope.isLoading = true;
                $rootScope.loadingMessage = 'Loading data, please wait ...';

                viewModel.SearchFilter.PageData.Take = options.take;
                viewModel.SearchFilter.PageData.Skip = options.skip;

                viewModel.productsFactory.searchProducts(viewModel.SearchFilter).then(function (response) {
                    viewModel.productsGrid.SetDataSource(response.Products, response.TotalProducts);
                    $rootScope.isLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            viewModel.productsFactory.initialise(companyId).then(function () {
                viewModel.SearchFilter.CompanyId = viewModel.productsFactory.salon.Id;
                viewModel.productsGrid.SetPage(null, 1);
            });
        });

        viewModel.$on('product-updated', function (event, data) {
            viewModel.productsGrid.SetPage(null, viewModel.productsGrid.Paging.PageIndex);
        });

        function searchProducts() {
            viewModel.productsGrid.SetPage(null, 1);
        };

        function addProduct() {
            var newScope = $rootScope.$new();
            newScope.actionType = 'CREATE';
            viewModel.productsFactory.product = { CompanyId: productsFactory.salon.Id };

            notificationFactory.open({
                templateUrl: 'producttemplate.html',
                scope: newScope,
                size: 'md',
                controller: productModalController
            });
        };

        function editProduct(product) {
            viewModel.productsFactory.edit(product.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'UPDATE';

                notificationFactory.open({
                    templateUrl: 'producttemplate.html',
                    scope: newScope,
                    size: 'md',
                    controller: productModalController
                });
            });
        };

        function deleteProduct(product) {
            viewModel.productsFactory.edit(product.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'DELETE';

                notificationFactory.open({
                    templateUrl: 'producttemplate.html',
                    scope: newScope,
                    size: 'sm',
                    controller: productModalController
                });
            });
        };

        function goHome(e) {
            e.preventDefault();

            $state.go('home');
        };

        function goToSalons(e) {
            e.preventDefault();

            $state.go('salons');
        };

        function goToPromotions(product) {
            $state.go('promotionproducts', { productId: product.Id });
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('productsFactory', productsFactory);

    productsFactory.$inject = ['$q', '$rootScope', 'companyApiFactory', 'productApiFactory', 'lookupApiFactory'];

    function productsFactory($q, $rootScope, companyApiFactory, productApiFactory, lookupApiFactory) {
        var factory = {
            initialise: initialise,
            searchProducts: searchProducts,
            salon: {},
            product: {},
            categories: [],
            subCategories: [],
            edit: edit,
            add: add,
            update: update,
            deleteProduct: deleteProduct,
            getSubCategories: getSubCategories,
            uploadLogo: uploadLogo
        };

        return factory;

        function initialise(companyId) {
            var deferred = $q.defer();
            var promises = {
                companyPromise: companyApiFactory.getCompany(companyId),
                categoriesPromise: lookupApiFactory.getCategories({ PageData: { IncludeAllData: true } })
            };

            factory.product = {};

            $q.all(promises).then(function (data) {
                factory.salon = data.companyPromise.Company;
                factory.categories = data.categoriesPromise.Items;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function searchProducts(searchFilter) {
            var deferred = $q.defer();

            productApiFactory.getProducts(searchFilter).then(function (data) {
                deferred.resolve({ Products: data.Products, TotalProducts: data.TotalProducts });
            });

            return deferred.promise;
        };

        function edit(productId) {
            var deferred = $q.defer();

            productApiFactory.getProduct(productId).then(function (data) {
                factory.product = data.Product;

                if (factory.product.CategoryId) {
                    factory.getSubCategories(factory.product.CategoryId).then(function () {
                        deferred.resolve();
                    });
                }
                else {
                    deferred.resolve();
                }
            });

            return deferred.promise;
        };

        function add() {
            var deferred = $q.defer();

            productApiFactory.addProduct(factory.product).then(function (data) {
                factory.product = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function update() {
            var deferred = $q.defer();

            productApiFactory.updateProduct(factory.product).then(function (data) {
                factory.product = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function deleteProduct() {
            var deferred = $q.defer();

            productApiFactory.deleteProduct(factory.product).then(function (data) {
                factory.product = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function uploadLogo(file) {
            var deferred = $q.defer();

            productApiFactory.saveProductLogo(file, inProgressFunction).then(function (data) {
                factory.product.Logo = data.ProductImage.ImageFileName;
                factory.product.RelativeFileName = data.ProductImage.ImageFileNamePath;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function getSubCategories(categoryId) {
            var deferred = $q.defer();

            lookupApiFactory.getSubCategories({ CategoryId: categoryId, PageData: { IncludeAllData: true } }).then(function (response) {
                factory.subCategories = response.Items;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function inProgressFunction(event) {
            var progressPercentage = parseInt(100.0 * event.loaded / event.total);
            console.log('progress: ' + progressPercentage + '% ' + event.config.file.name);
        };
    };

})();
productModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'productsFactory'];

function productModalController($scope, $rootScope, $uibModalInstance, productsFactory) {
    var viewModel = $scope;

    viewModel.IsDeleteUser = viewModel.actionType == 'DELETE';
    viewModel.Title = viewModel.actionType == 'DELETE' ? 'Delete Product' : viewModel.actionType == 'CREATE' ? 'Add New Product' : 'Edit Product';
    viewModel.cancel = cancel;
    viewModel.save = save;
    viewModel.uploadImage = uploadImage;
    viewModel.productsFactory = productsFactory;
    viewModel.categoryChange = categoryChange;

    function cancel() {
        $uibModalInstance.dismiss();
    };

    function uploadImage(files) {
        var isInvalidFileFound = false;

        viewModel.imageuploading = true;

        if (!files || files.length == 0) {
            viewModel.imageuploading = false;
            return;
        }

        angular.forEach(files, function (file, key) {
            if (file.type.indexOf('image') < 0) {
                isInvalidFileFound = true;
                return;
            }
        });

        if (isInvalidFileFound) {
            alert('Only image files can be uploaded for an company logo');
            $scope.imageuploading = false;
            return;
        }

        viewModel.productsFactory.uploadLogo(files[0]).then(function (data) {
            viewModel.imageuploading = false;
        });
    };

    function save() {
        if (!viewModel.frmProduct.$valid) {
            $rootScope.$broadcast('action-complete', true);
            return;
        }

        if (viewModel.actionType == 'CREATE') {
            viewModel.productsFactory.add().then(function (data) {
                $rootScope.$broadcast('product-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'UPDATE') {
            viewModel.productsFactory.update().then(function (data) {
                $rootScope.$broadcast('product-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'DELETE') {
            viewModel.productsFactory.deleteProduct().then(function (data) {
                $rootScope.$broadcast('product-updated', true);
                $uibModalInstance.dismiss();
            });
        }
    };

    function categoryChange() {
        viewModel.productsFactory.getSubCategories(viewModel.productsFactory.product.CategoryId);
    };
};


(function () {

    'use strict';

    angular.module('app').controller('promotionProductsController', promotionProductsController);

    promotionProductsController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'notificationFactory', 'promotionProductsFactory'];

    function promotionProductsController($scope, $rootScope, $state, $stateParams, notificationFactory, promotionProductsFactory) {
        var viewModel = $scope;
        var productId = $stateParams.productId;

        viewModel.promotionProductsFactory = promotionProductsFactory;
        viewModel.addPromotionProduct = addPromotionProduct;
        viewModel.editPromotionProduct = editPromotionProduct;
        viewModel.deletePromotionProduct = deletePromotionProduct;
        viewModel.searchPromotionProducts = searchPromotionProducts;
        viewModel.goHome = goHome;
        viewModel.goToSalons = goToSalons;
        viewModel.goToProducts = goToProducts;

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: '',
            ProductId: {}
        };

        viewModel.promotionProductsGridOptions = {
            Paging: {
                PageIndex: 1,
                PageSize: 5
            },
            PageSizes: [30, 40, 60, 90, 100],
            Read: function (options) {
                var that = this;

                $rootScope.isLoading = true;
                $rootScope.loadingMessage = 'Loading data, please wait ...';

                viewModel.SearchFilter.PageData.Take = options.take;
                viewModel.SearchFilter.PageData.Skip = options.skip;

                viewModel.promotionProductsFactory.searchPromotionProducts(viewModel.SearchFilter).then(function (response) {
                    viewModel.promotionProductsGrid.SetDataSource(response.PromotionProducts, response.TotalPromotionProducts);
                    $rootScope.isLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            viewModel.promotionProductsFactory.initialise(productId).then(function () {
                viewModel.SearchFilter.ProductId = viewModel.promotionProductsFactory.product.Id;
                viewModel.promotionProductsGrid.SetPage(null, 1);
            });
        });

        viewModel.$on('promotion-product-updated', function (event, data) {
            viewModel.promotionProductsGrid.SetPage(null, viewModel.promotionProductsGrid.Paging.PageIndex);
        });

        function searchPromotionProducts() {
            viewModel.promotionProductsGrid.SetPage(null, 1);
        };

        function addPromotionProduct() {
            var newScope = $rootScope.$new();
            newScope.actionType = 'CREATE';
            viewModel.promotionProductsFactory.promotionProduct = { ProductId: promotionProductsFactory.product.Id };

            notificationFactory.open({
                templateUrl: 'promotionproducttemplate.html',
                scope: newScope,
                size: 'lg',
                controller: promotionProductModalController
            });
        };

        function editPromotionProduct(promotionProduct) {
            viewModel.promotionProductsFactory.edit(promotionProduct.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'UPDATE';

                notificationFactory.open({
                    templateUrl: 'promotionproducttemplate.html',
                    scope: newScope,
                    size: 'lg',
                    controller: promotionProductModalController
                });
            });
        };

        function deletePromotionProduct(promotionProduct) {
            viewModel.promotionProductsFactory.edit(promotionProduct.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'DELETE';

                notificationFactory.open({
                    templateUrl: 'promotionproducttemplate.html',
                    scope: newScope,
                    size: 'sm',
                    controller: promotionProductModalController
                });
            });
        }

        function goHome(e) {
            e.preventDefault();

            $state.go('home');
        };

        function goToProducts(e) {
            e.preventDefault();

            $state.go('products', { salonId: viewModel.promotionProductsFactory.product.CompanyId });
        };

        function goToSalons(e) {
            e.preventDefault();

            $state.go('salons');
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('promotionProductsFactory', promotionProductsFactory);

    promotionProductsFactory.$inject = ['$q', '$rootScope', 'productApiFactory', 'promotionProductApiFactory'];

    function promotionProductsFactory($q, $rootScope, productApiFactory, promotionProductApiFactory) {
        var factory = {
            initialise: initialise,
            searchPromotionProducts: searchPromotionProducts,
            product: {},
            promotionProduct: {},
            edit: edit,
            add: add,
            update: update,
            deletePromotionProduct: deletePromotionProduct,
            uploadLogo: uploadLogo
        };

        return factory;

        function initialise(productId) {
            var deferred = $q.defer();

            factory.product = {};
            factory.promotionProduct = {};

            productApiFactory.getProduct(productId).then(function (data) {
                factory.product = data.Product
                deferred.resolve();
            });

            return deferred.promise;
        };

        function searchPromotionProducts(searchFilter) {
            var deferred = $q.defer();

            promotionProductApiFactory.getPromotionProducts(searchFilter).then(function (data) {
                deferred.resolve({ PromotionProducts: data.PromotionProducts, TotalPromotionProducts: data.TotalPromotionProducts });
            });

            return deferred.promise;
        };

        function edit(promotionProductId) {
            var deferred = $q.defer();

            promotionProductApiFactory.getPromotionProduct(promotionProductId).then(function (data) {
                factory.promotionProduct = data.PromotionProduct
                deferred.resolve();
            });

            return deferred.promise;
        };

        function add() {
            var deferred = $q.defer();

            promotionProductApiFactory.addPromotionProduct(factory.promotionProduct).then(function (data) {
                factory.promotionProduct = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function update() {
            var deferred = $q.defer();

            promotionProductApiFactory.updatePromotionProduct(factory.promotionProduct).then(function (data) {
                factory.promotionProductApiFactory = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function deletePromotionProduct() {
            var deferred = $q.defer();

            promotionProductApiFactory.deletePromotionProduct(factory.promotionProduct).then(function (data) {
                factory.promotionProduct = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function uploadLogo(file) {
            var deferred = $q.defer();

            promotionProductApiFactory.savePromotionProductLogo(file, inProgressFunction).then(function (data) {
                factory.promotionProduct.Logo = data.PromotionProductImage.ImageFileName;
                factory.promotionProduct.RelativeFileName = data.PromotionProductImage.ImageFileNamePath;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function inProgressFunction(event) {
            var progressPercentage = parseInt(100.0 * event.loaded / event.total);
            console.log('progress: ' + progressPercentage + '% ' + event.config.file.name);
        };
    };

})();
promotionProductModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'promotionProductsFactory'];

function promotionProductModalController($scope, $rootScope, $uibModalInstance, promotionProductsFactory) {
    var viewModel = $scope;

    viewModel.IsDeletePromotion = viewModel.actionType == 'DELETE';
    viewModel.Title = viewModel.actionType == 'DELETE' ? 'Delete Promotion' : viewModel.actionType == 'CREATE' ? 'Add New Promotion' : 'Edit Promotion';
    viewModel.cancel = cancel;
    viewModel.save = save;
    viewModel.uploadImage = uploadImage;
    viewModel.promotionProductsFactory = promotionProductsFactory;
    viewModel.openCalendar = openCalendar;

    viewModel.dateOptions = {
        dateDisabled: false,
        formatYear: 'yyyy',
        maxDate: new Date(2099, 1, 1),
        minDate: new Date(1890, 1, 1),
        startingDay: 1
    };

    viewModel.altInputFormats = ['M!/d!/yyyy'];

    viewModel.calendarStatuses = {
        isStartDateCalendarOpened: false,
        isEndDateCalendarOpened: false
    };

    function cancel() {
        $uibModalInstance.dismiss();
    };

    function uploadImage(files) {
        var isInvalidFileFound = false;

        viewModel.imageuploading = true;

        if (!files || files.length == 0) {
            viewModel.imageuploading = false;
            return;
        }

        angular.forEach(files, function (file, key) {
            if (file.type.indexOf('image') < 0) {
                isInvalidFileFound = true;
                return;
            }
        });

        if (isInvalidFileFound) {
            alert('Only image files can be uploaded for an company logo');
            $scope.imageuploading = false;
            return;
        }

        viewModel.promotionProductsFactory.uploadLogo(files[0]).then(function (data) {
            viewModel.imageuploading = false;
        });
    };

    function openCalendar(calendarControl) {

        viewModel.calendarStatuses = {
            isStartDateCalendarOpened: false,
            isEndDateCalendarOpened: false
        };

        switch (calendarControl) {
            case 'StartDate':
                viewModel.calendarStatuses.isStartDateCalendarOpened = true;
                break
            case 'EndDate':
                viewModel.calendarStatuses.isEndDateCalendarOpened = true;
                break
        }
    };

    function save() {
        if (!viewModel.frmPromotionProduct.$valid) {
            $rootScope.$broadcast('action-complete', true);
            return;
        }

        if (viewModel.actionType == 'CREATE') {
            viewModel.promotionProductsFactory.add().then(function (data) {
                $rootScope.$broadcast('promotion-product-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'UPDATE') {
            viewModel.promotionProductsFactory.update().then(function (data) {
                $rootScope.$broadcast('promotion-product-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'DELETE') {
            viewModel.promotionProductsFactory.deletePromotionProduct().then(function (data) {
                $rootScope.$broadcast('promotion-product-updated', true);
                $uibModalInstance.dismiss();
            });
        }
    };
};


(function () {

    'use strict';

    angular.module('app').controller('registerController', RegisterController);

    RegisterController.$inject = ['$scope', '$rootScope', '$state', 'registerFactory'];

    function RegisterController($scope, $rootScope, $state, registerFactory) {
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

            registerFactory.register(viewModel.model).then(function (response) {
                viewModel.isRegistrationSucceful = true;
            });
        };

        function cancel(provider) {
            $state.go('landing');
        };

    };

})();
(function () {

    'use strict';

    angular.module('app').factory('registerFactory', registerFactory);

    registerFactory.$inject = ['$http', '$q', '$state', 'companyRequestApiFactory'];

    function registerFactory($http, $q, $state, companyRequestApiFactory) {
        var factory = {
            register: register
        };

        return factory;

        function register(companyRequest) {
            var deferred = $q.defer();

            companyRequestApiFactory.addCompanyRequest(companyRequest).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').controller('rolesAdminController', rolesAdminController);

    rolesAdminController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'notificationFactory', 'rolesAdminFactory'];

    function rolesAdminController($scope, $rootScope, $state, $stateParams, notificationFactory, rolesAdminFactory) {
        var viewModel = $scope;

        viewModel.rolesAdminFactory = rolesAdminFactory;
        
        viewModel.searchRoles = searchRoles;
        viewModel.addRole = addRole;
        viewModel.editRole = editRole;
        viewModel.deleteRole = deleteRole;

        viewModel.SearchFilter = {
            PageData: {
                Take: 20,
                Skip: 0
            },
            SearchText: ''
        };

        viewModel.rolesGridOptions = {
            Paging: {
                PageIndex: 1,
                PageSize: 20
            },
            PageSizes: [20, 40, 60, 90, 100],
            Read: function (options) {
                var that = this;

                $rootScope.isLoading = true;
                $rootScope.loadingMessage = 'Loading data, please wait ...';

                viewModel.SearchFilter.PageData.Take = options.take;
                viewModel.SearchFilter.PageData.Skip = options.skip;

                viewModel.rolesAdminFactory.getRoles(viewModel.SearchFilter).then(function (response) {
                    viewModel.rolesGrid.SetDataSource(viewModel.rolesAdminFactory.roles, viewModel.rolesAdminFactory.totalRoles);
                    $rootScope.isLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            viewModel.rolesGrid = data.grid;
            viewModel.rolesGrid.SetPage(null, 1);
        });

        viewModel.$on('roles-updated', function (event, data) {
            viewModel.rolesGrid.SetPage(null, viewModel.rolesGrid.Paging.PageIndex);
        });

        function searchRoles() {
            viewModel.rolesGrid.SetPage(null, 1);
        };

        function addRole() {

            viewModel.rolesAdminFactory.initialiseRoleModal().then(function () {
                var newScope = $rootScope.$new();

                newScope.actionType = 'CREATE';

                notificationFactory.open({
                    templateUrl: 'saveroletemplate.html',
                    scope: newScope,
                    size: 'md',
                    controller: roleAdminSaveModalController
                });
            });
        };

        function editRole(role) {
            viewModel.rolesAdminFactory.initialiseRoleModal(role.Id).then(function () {
                var newScope = $rootScope.$new();

                newScope.actionType = 'UPDATE';

                notificationFactory.open({
                    templateUrl: 'saveroletemplate.html',
                    scope: newScope,
                    size: 'md',
                    controller: roleAdminSaveModalController
                });
            });
        };

        function deleteRole(role) {
            var newScope = $rootScope.$new();

            viewModel.rolesAdminFactory.role = role;
            newScope.actionType = 'DELETE';
            
            notificationFactory.open({
                templateUrl: 'saveroletemplate.html',
                scope: newScope,
                size: 'md',
                controller: roleAdminSaveModalController
            });
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('rolesAdminFactory', rolesAdminFactory);

    rolesAdminFactory.$inject = ['$q', 'moduleApiFactory', 'roleApiFactory'];

    function rolesAdminFactory($q, moduleApiFactory, roleApiFactory) {

        var factory = {
            initialiseRoleModal: initialiseRoleModal,
            roles: [],
            role: {},
            totalRoles: 0,
            getRoles: getRoles,
            getRole: getRole,
            addRole: addRole,
            updateRole: updateRole,
            deleteRole: deleteRole,
        };

        return factory;

        function initialiseRoleModal(roleId) {
            var deferred = $q.defer();

            getModules().then(function () {
                if (roleId) {
                    factory.getRole(roleId).then(function () {
                        deferred.resolve();
                    });
                }
                else {
                    deferred.resolve();
                }
            });

            return deferred.promise;
        };

        function getRoles(searchFilter) {
            var deferred = $q.defer();

            roleApiFactory.searchRoles(searchFilter).then(function (response) {
                factory.roles = response.Roles;
                factory.totalRoles = response.TotalRoles;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function getRole(roleId) {
            var deferred = $q.defer();

            roleApiFactory.getRole(roleId).then(function (response) {

                for (var i = 0; i < factory.role.RoleModules.length; i++) {
                    var indexOfModule = app.Utils.indexOf(response.Role.RoleModules, factory.role.RoleModules[i].ModuleId, 'ModuleId');

                    if (response.Role.RoleModules[indexOfModule] && response.Role.RoleModules[indexOfModule].Id && indexOfModule >= 0) {
                        response.Role.RoleModules[indexOfModule].IsSelected = true;
                        continue;
                    }

                    response.Role.RoleModules.push(factory.role.RoleModules[i]);
                }

                factory.role = response.Role;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function addRole() {
            var deferred = $q.defer();

            factory.role.RoleModules = excludeUnselectedRoleModules();

            roleApiFactory.addRole(factory.role).then(function (response) {
                factory.role = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function updateRole() {
            var deferred = $q.defer();

            factory.role.RoleModules = excludeUnselectedRoleModules();

            roleApiFactory.updateRole(factory.role).then(function (response) {
                factory.role = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function deleteRole() {
            var deferred = $q.defer();

            factory.role.RoleModules = excludeUnselectedRoleModules();

            roleApiFactory.deleteRole(factory.role).then(function (response) {
                factory.role = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function getModules() {
            var deferred = $q.defer();

            moduleApiFactory.getAllModules('').then(function (data) {
                factory.role.RoleModules = [];
                for (var i = 0; i < data.Modules.length; i++) {
                    factory.role.RoleModules.push({ ModuleId: data.Modules[i].Id, ModuleName: data.Modules[i].Name, IsSelected: false });
                }
                deferred.resolve();
            });

            return deferred.promise;
        };

        function excludeUnselectedRoleModules() {
            var roleModules = [];

            for (var i = 0; i < factory.role.RoleModules.length; i++) {
                if (!factory.role.RoleModules[i].IsSelected) {
                    continue;
                }

                roleModules.push(factory.role.RoleModules[i]);
            }

            return roleModules;
        };
    };

})();
'use strict';

roleAdminSaveModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'rolesAdminFactory'];

function roleAdminSaveModalController($scope, $rootScope, $uibModalInstance, rolesAdminFactory) {
    var viewModel = $scope;

    viewModel.rolesAdminFactory = rolesAdminFactory;
    viewModel.IsDeleteUser = viewModel.actionType == 'DELETE';
    viewModel.IsNew = viewModel.actionType == 'CREATE';
    viewModel.Title = viewModel.IsNew ? 'Add New Role' : viewModel.IsDeleteUser ? 'Delete Role' : 'Edit Role';
    viewModel.save = save;
    viewModel.deleteRole = deleteRole;
    viewModel.cancel = cancel;

    function cancel() {
        $rootScope.$broadcast('role-cancel');
        $uibModalInstance.dismiss();
    };

    function save() {

        if (!viewModel.frmRoleAdmin.$valid) {
            $rootScope.$broadcast('action-complete', true);
            return;
        }

        if (viewModel.actionType == 'CREATE') {
            viewModel.rolesAdminFactory.addRole().then(function (data) {
                $rootScope.$broadcast('roles-updated');
                $uibModalInstance.dismiss();
            });
        }

        if (viewModel.actionType == 'UPDATE') {
            viewModel.rolesAdminFactory.updateRole().then(function (data) {
                $rootScope.$broadcast('roles-updated');
                $uibModalInstance.dismiss();
            });
        }
    };

    function deleteRole() {
        viewModel.rolesAdminFactory.deleteRole().then(function (data) {
            $rootScope.$broadcast('roles-updated');
            $uibModalInstance.dismiss();
        });
    };
};

(function () {

    'use strict';

    angular.module('app').factory('companyWorkingHourFactory', companyWorkingHourFactory);

    companyWorkingHourFactory.$inject = ['$rootScope', 'salonsFactory'];

    function companyWorkingHourFactory($rootScope, salonsFactory) {

        var factory = {
            dayNames: [],
            save: save,
            edit: edit,
            deleteItem: deleteItem,
            reset: reset,
            companyWorkingHour: { ActionType: 'CREATE' }
        };

        return factory;

        function save() {
            removeDayName(factory.companyWorkingHour.DayName);

            var indexOfCompanyWorkingHour = app.Utils.indexOf(salonsFactory.salon.CompanyWorkingHours, factory.companyWorkingHour.DayName, "DayName");

            factory.companyWorkingHour.StartTime = new Date(factory.companyWorkingHour.StartDateTime).toTimeDisplayString();
            factory.companyWorkingHour.EndTime = new Date(factory.companyWorkingHour.EndDateTime).toTimeDisplayString();

            if (indexOfCompanyWorkingHour < 0) {
                add();
                return;
            }

            update(indexOfCompanyWorkingHour);
        };

        function add() {
            if (!salonsFactory.salon.CompanyWorkingHours) {
                salonsFactory.salon.CompanyWorkingHours = [];
            }

            salonsFactory.salon.CompanyWorkingHours.push(factory.companyWorkingHour);
            factory.companyWorkingHour = { ActionType: 'CREATE' };
        };

        function update(indexOfDayName) {
            salonsFactory.salon.CompanyWorkingHours[indexOfDayName] = factory.companyWorkingHour;
            factory.companyWorkingHour = { ActionType: 'CREATE' };
        };

        function removeDayName(dayName) {
            var indexOfDayName = app.Utils.indexOf(factory.dayNames, dayName, "FieldValue");

            if (indexOfDayName >= 0) {
                factory.dayNames[indexOfDayName].display = false;
            }
        };

        function addDayName(dayName) {
            var indexOfDayName = app.Utils.indexOf(factory.dayNames, dayName, "FieldValue");

            if (indexOfDayName >= 0) {
                factory.dayNames[indexOfDayName].display = true;
            }
        };

        function edit(companyWorkingHour) {
            if (factory.companyWorkingHour.ActionType == 'UPDATE' && companyWorkingHour.DayName != factory.companyWorkingHour.DayName) {
                removeDayName(factory.companyWorkingHour.companyWorkingHour);
            }

            addDayName(companyWorkingHour.DayName);

            companyWorkingHour.StartDateTime = app.Utils.timeToDateTime(companyWorkingHour.StartTime);
            companyWorkingHour.EndDateTime = app.Utils.timeToDateTime(companyWorkingHour.EndTime);

            factory.companyWorkingHour = companyWorkingHour;
            factory.companyWorkingHour.ActionType = 'UPDATE';
        };

        function deleteItem(companyWorkingHour) {
            var indexOfDayName = app.Utils.indexOf(factory.dayNames, companyWorkingHour.DayName, "FieldValue");

            if (indexOfDayName < 0) {
                return;
            }

            addDayName(companyWorkingHour.DayName);
            salonsFactory.salon.CompanyWorkingHours.splice(indexOfDayName, 1);
            factory.companyWorkingHour = { ActionType: 'CREATE' };
        };

        function reset() {
            if (factory.companyWorkingHour.ActionType == 'UPDATE') {
                removeAllowanceType(factory.companyWorkingHour.DayName);
            }

            factory.companyWorkingHour = { ActionType: 'CREATE' };
        };

    };

})();
(function () {

    'use strict';

    angular.module('app').controller('salonsController', SalonsController);

    SalonsController.$inject = ['$scope', '$rootScope', '$state', 'notificationFactory', 'salonsFactory'];

    function SalonsController($scope, $rootScope, $state, notificationFactory, salonsFactory) {
        var viewModel = $scope;

        viewModel.salonsFactory = salonsFactory;
        viewModel.addSalon = addSalon;
        viewModel.editSalon = editSalon;
        viewModel.deleteSalon = deleteSalon;
        viewModel.searchSalons = searchSalons;
        viewModel.goToProducts = goToProducts;
        viewModel.goToUsers = goToUsers;
        viewModel.goHome = goHome;
        viewModel.activateSalons = activateSalons;
        viewModel.deactivateSalons = deactivateSalons;
        viewModel.deleteSalons = deleteSalons;

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: ''
        };

        viewModel.salonsGridOptions = {
            Paging: {
                PageIndex: 1,
                PageSize: 5
            },
            PageSizes: [30, 40, 60, 90, 100],
            Read: function (options) {
                var that = this;

                $rootScope.isLoading = true;
                $rootScope.loadingMessage = 'Loading data, please wait ...';

                viewModel.SearchFilter.PageData.Take = options.take;
                viewModel.SearchFilter.PageData.Skip = options.skip;

                viewModel.salonsFactory.searchSalons(viewModel.SearchFilter).then(function (response) {
                    viewModel.salonsGrid.SetDataSource(response.Salons, response.TotalSalons);
                    $rootScope.isLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            viewModel.salonsFactory.initialise().then(function () {
                viewModel.salonsGrid.SetPage(null, 1);
            });
        });

        viewModel.$on('salon-updated', function (event, data) {
            viewModel.salonsGrid.SetPage(null, viewModel.salonsGrid.Paging.PageIndex);
        });

        function searchSalons() {
            viewModel.salonsGrid.SetPage(null, 1);
        };

        function addSalon() {
            var newScope = $rootScope.$new();
            newScope.actionType = 'CREATE';
            viewModel.salonsFactory.salon = { CompanyTypeId: salonsFactory.companyTypeId };

            notificationFactory.open({
                templateUrl: 'salontemplate.html',
                scope: newScope,
                size: 'lg',
                controller: salonModalController
            });
        };

        function editSalon(salon) {
            viewModel.salonsFactory.edit(salon.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'UPDATE';

                notificationFactory.open({
                    templateUrl: 'salontemplate.html',
                    scope: newScope,
                    size: 'lg',
                    controller: salonModalController
                });
            });
        };

        function deleteSalon(salon) {
            viewModel.salonsFactory.edit(salon.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'DELETE';

                notificationFactory.open({
                    templateUrl: 'salontemplate.html',
                    scope: newScope,
                    size: 'sm',
                    controller: salonModalController
                });
            });
        }

        function goHome(e) {
            e.preventDefault();

            $state.go('home');
        };

        function goToProducts(salon) {
            $state.go('products', { salonId: salon.Id });
        };

        function goToUsers(salon) {
            $state.go('companyusers', { companyId: salon.Id });
        };

        function activateSalons() {
            if (!viewModel.salonsFactory.selectedSalons || viewModel.salonsFactory.selectedSalons.length == 0) {
                return;
            };

            $rootScope.isLoading = true;
            $rootScope.loadingMessage = 'Activating salons, please wait ...';

            viewModel.salonsFactory.activateSalons().then(function () {
                viewModel.salonsGrid.SetPage(null, 1);
            }, function () {
                $rootScope.isLoading = false;
                var newScope = $rootScope.$new();

                newScope.model = {
                    'ErrorCode': "404",
                    'ErrorHeader': "Error Activating Salons",
                    'ErrorDetails': "An error occurred while activating salons.",
                };

                $rootScope.$broadcast('server-error-occurred', {
                    templateUrl: 'errortemplate.html',
                    scope: newScope,
                    size: 'sm'
                });
            });
        };

        function deactivateSalons() {
            if (!viewModel.salonsFactory.selectedSalons || viewModel.salonsFactory.selectedSalons.length == 0) {
                return;
            };

            $rootScope.isLoading = true;
            $rootScope.loadingMessage = 'Deactivating salons, please wait ...';
            viewModel.salonsFactory.deactivateSalons().then(function () {
                viewModel.salonsGrid.SetPage(null, 1);
            }, function () {
                $rootScope.isLoading = false;
                var newScope = $rootScope.$new();

                newScope.model = {
                    'ErrorCode': "404",
                    'ErrorHeader': "Error Activating Salons",
                    'ErrorDetails': "An error occurred while activating salons.",
                };

                $rootScope.$broadcast('server-error-occurred', {
                    templateUrl: 'errortemplate.html',
                    scope: newScope,
                    size: 'sm'
                });
            });
        };

        function deleteSalons() {
            if (!viewModel.salonsFactory.selectedSalons || viewModel.salonsFactory.selectedSalons.length == 0) {
                return;
            };

            $rootScope.isLoading = true;
            $rootScope.loadingMessage = 'Deleting salons, please wait ...';
            viewModel.salonsFactory.deleteSalons().then(function () {
                viewModel.salonsGrid.SetPage(null, 1);
            }, function () {
                $rootScope.isLoading = false;
                var newScope = $rootScope.$new();

                newScope.model = {
                    'ErrorCode': "404",
                    'ErrorHeader': "Error Deleting Salons",
                    'ErrorDetails': "An error occurred while activating salons.",
                };

                $rootScope.$broadcast('server-error-occurred', {
                    templateUrl: 'errortemplate.html',
                    scope: newScope,
                    size: 'sm'
                });
            });
        };
    };

})();
/// <reference path="../../shared/objects/utils.js" />


(function () {

    'use strict';

    angular.module('app').factory('salonsFactory', salonsFactory);

    salonsFactory.$inject = ['$q', '$rootScope', 'companyApiFactory', 'lookupApiFactory'];

    function salonsFactory($q, $rootScope, companyApiFactory, lookupApiFactory) {
        var factory = {
            initialise: initialise,
            searchSalons: searchSalons,
            salons: [],
            provinces: [],
            salon: {},
            selectedSalons: [],
            companyTypeId: {},
            clearAll: clearAll,
            edit: edit,
            add: add,
            update: update,
            deleteSalon: deleteSalon,
            uploadSalonImage: uploadSalonImage,
            uploadSalonLogo: uploadSalonLogo,
            setSelectedSalon: setSelectedSalon,
            activateSalons: activateSalons,
            deactivateSalons: deactivateSalons,
            deleteSalons: deleteSalons,
            selectAll: selectAll,
            dayNames:[]
        };

        return factory;

        function initialise() {
            var deferred = $q.defer();
            var promises = {
                companyTypesPromise: lookupApiFactory.getCompanyTypes({ PageData: { IncludeAllData: true } }),
                dayNamesPromise: lookupApiFactory.getLookupFields('DayName')
            }

            factory.selectedSalons = [];
            
            $q.all(promises).then(function (data) {
                for (var i = 0; i < data.dayNamesPromise.length; i++) {
                    data.dayNamesPromise[i].display = true;
                }

                factory.dayNames = data.dayNamesPromise;

                for (var i = 0; i < data.companyTypesPromise.Items.length; i++) {
                    if (data.companyTypesPromise.Items[i].Code == 'SALON') {
                        factory.companyTypeId = data.companyTypesPromise.Items[i].Id;
                        break;
                    }
                }

                deferred.resolve();
            });
            
            return deferred.promise;
        };

        function searchSalons(searchFilter) {
            var deferred = $q.defer();

            factory.selectedSalons = [];

            companyApiFactory.getCompanies(searchFilter).then(function (data) {
                for (var i = 0; i < data.Companies.length; i++) {
                    data.Companies[i].IsSelected = false;
                }

                factory.salons = data.Companies;
                factory.salon = {};
                deferred.resolve({ Salons: data.Companies, TotalSalons: data.TotalCompanies });
            });

            return deferred.promise;
        };

        function clearAll() {
            factory.selectedSalons = [];
            factory.salons = [];
            factory.salon = {};
        };

        function edit(salonId) {
            var deferred = $q.defer();

            companyApiFactory.getCompany(salonId).then(function (data) {
                factory.salon = data.Company;

                for (var i = 0; i < factory.salon.Galleries.length; i++) {
                    factory.salon.Galleries[i].id = i + 1;
                }

                deferred.resolve();
            });

            return deferred.promise;
        };

        function add() {
            var deferred = $q.defer();

            companyApiFactory.addCompany(factory.salon).then(function (data) {
                factory.salon = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function update() {
            var deferred = $q.defer();

            companyApiFactory.updateCompany(factory.salon).then(function (data) {
                factory.salon = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function deleteSalon() {
            var deferred = $q.defer();

            companyApiFactory.deleteCompany(factory.salon).then(function (data) {
                factory.salon = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function uploadSalonLogo(files) {
            var deferred = $q.defer();
            var promises = [];

            companyApiFactory.saveCompanyLogo(files[0], inProgressFunction).then(function (data) {
                factory.salon.Logo = {
                    Logo: data.CompanyImage.ImageFileName,
                    ImageType: 'Logo',
                    NormalRelativeFileName: data.CompanyImage.ImageFileNamePath,
                    ThumbnailRelativeFileName: data.CompanyImage.ImageFileNamePath,
                    PreviewRelativeFileName: data.CompanyImage.ImageFileNamePath
                };

                deferred.resolve();
            });

            return deferred.promise;
        };

        function uploadSalonImage(files) {
            var deferred = $q.defer();
            var promises = [];

            for (var i = 0; i < files.length; i++) {
                promises.push(companyApiFactory.saveCompanyImage(files[i], inProgressFunction));
            }

            $q.all(promises).then(function (data) {
                if (!factory.salon.Galleries) {
                    factory.salon.Galleries = [];
                }

                var logoStartIndex = factory.salon.Galleries.length + 1;

                for (var j = 0; j < data.length; j++) {
                    factory.salon.Galleries.push({
                        id: logoStartIndex + j,
                        Logo: data[j].CompanyImage.ImageFileName,
                        ImageType: 'GALLERY',
                        NormalRelativeFileName: data[j].CompanyImage.ImageFileNamePath,
                        ThumbnailRelativeFileName: data[j].CompanyImage.ImageFileNamePath,
                        PreviewRelativeFileName: data[j].CompanyImage.ImageFileNamePath
                    });
                }
                deferred.resolve();
            });

            return deferred.promise;
        };

        function inProgressFunction(event) {
            var progressPercentage = parseInt(100.0 * event.loaded / event.total);
            console.log('progress: ' + progressPercentage + '% ' + event.config.file.name);
        };

        function selectAll(salons, selectAll) {
            for (var i = 0; i < salons.length; i++) {
                var indexOfSalon = app.Utils.indexOf(factory.selectedSalons, salons[i].Id, "Id");

                salons[i].IsSelected = selectAll;

                if (selectAll && indexOfSalon < 0) {
                    factory.selectedSalons.push(salons[i]);
                }

                if (!selectAll && indexOfSalon >= 0) {
                    factory.selectedSalons.splice(indexOdSalon, 1);
                }
            }
        };

        function setSelectedSalon(salon) {
            var indexOfSalon = app.Utils.indexOf(factory.selectedSalons, salon.Id, "Id");

            if (salon.IsSelected && indexOfSalon < 0) {
                factory.selectedSalons.push(salon);
            }

            if (!salon.IsSelected && indexOfSalon >= 0) {
                factory.selectedSalons.splice(indexOdSalon, 1);
            }
        };

        function activateSalons() {
            if (!factory.selectedSalons || factory.selectedSalons.length == 0) {
                return;
            };

            var deferred = $q.defer();

            var model = {
                StatusCode: 'ACTIVE',
                Ids: getSelectedSalonsId()
            };

            companyApiFactory.updateCompanyStatus(model).then(function () {
                factory.selectedSalons = [];
                deferred.resolve();
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        };

        function deactivateSalons() {
            if (!factory.selectedSalons || factory.selectedSalons.length == 0) {
                return;
            };

            var deferred = $q.defer();

            var model = {
                StatusCode: 'INACTIVE',
                Ids: getSelectedSalonsId()
            };

            companyApiFactory.updateCompanyStatus(model).then(function () {
                factory.selectedSalons = [];
                deferred.resolve();
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        };

        function deleteSalons() {
            if (!factory.selectedSalons || factory.selectedSalons.length == 0) {
                return;
            };
            var deferred = $q.defer();

            var model = {
                StatusCode: 'DELETED',
                Ids: getSelectedSalonsId()
            };

            companyApiFactory.updateCompanyStatus(model).then(function () {
                factory.selectedSalons = [];
                deferred.resolve();
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        };

        function getSelectedSalonsId() {
            var ids = [];

            if (!factory.selectedSalons || factory.selectedSalons.length == 0) {
                return ids;
            };

            for (var i = 0; i < factory.selectedSalons.length; i++) {
                ids.push(factory.selectedSalons[i].Id);
            }

            return ids;
        };
    };

})();
salonModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'geolocation', 'salonsFactory', 'utilsFactory', 'companyWorkingHourFactory'];

function salonModalController($scope, $rootScope, $uibModalInstance, geolocation, salonsFactory, utilsFactory, companyWorkingHourFactory) {
    var viewModel = $scope;

    viewModel.IsDeleteUser = viewModel.actionType == 'DELETE';
    viewModel.Title = viewModel.actionType == 'DELETE' ? 'Delete Salon' : viewModel.actionType == 'CREATE' ? 'Add New Salon' : 'Edit Salon';
    viewModel.cancel = cancel;
    viewModel.save = save;
    viewModel.uploadImage = uploadImage;
    viewModel.uploadLogo = uploadLogo;
    viewModel.salonsFactory = salonsFactory;
    viewModel.setPostalSameAsPhysicalAddress = setPostalSameAsPhysicalAddress;
    viewModel.postalSameAsPhysical = false;
    viewModel.getCurrentLocation = getCurrentLocation;
    viewModel.removeImage = removeImage;
    viewModel.saveWorkingHour = saveWorkingHour;
    viewModel.companyWorkingHourViewModel = companyWorkingHourFactory;

    viewModel.companyWorkingHourViewModel.dayNames = angular.copy(salonsFactory.dayNames);

    function cancel() {
        $uibModalInstance.dismiss();
    };

    function uploadLogo(files) {
        var isInvalidFileFound = false;

        viewModel.imageuploading = true;

        if (!files || files.length == 0) {
            viewModel.imageuploading = false;
            return;
        }

        angular.forEach(files, function (file, key) {
            if (file.type.indexOf('image') < 0) {
                isInvalidFileFound = true;
                return;
            }
        });

        if (isInvalidFileFound) {
            alert('Only image files can be uploaded for an company logo');
            $scope.imageuploading = false;
            return;
        }

        viewModel.salonsFactory.uploadLogo(files).then(function (data) {
            viewModel.imageuploading = false;
        });
    };

    function uploadLogo(files) {
        var isInvalidFileFound = false;

        viewModel.imageuploading = true;

        if (!files || files.length == 0) {
            viewModel.imageuploading = false;
            return;
        }

        angular.forEach(files, function (file, key) {
            if (file.type.indexOf('image') < 0) {
                isInvalidFileFound = true;
                return;
            }
        });

        if (isInvalidFileFound) {
            alert('Only image files can be uploaded for an company logo');
            $scope.imageuploading = false;
            return;
        }

        viewModel.salonsFactory.uploadSalonLogo(files).then(function (data) {
            viewModel.imageuploading = false;
        });
    };

    function uploadImage(files) {

        if (viewModel.salonsFactory.salon.Galleries && viewModel.salonsFactory.salon.Galleries.length > 2) {
            displayError("Error Uploading Iamges", 'Salon galleries are required and must not be more than 2.');
            $scope.imageuploading = false;
            return;
        }

        var filesLength = viewModel.salonsFactory.salon.Galleries ? viewModel.salonsFactory.salon.Galleries.length : 0;

        var isInvalidFileFound = false;

        viewModel.imageuploading = true;

        if (!files || files.length == 0) {
            viewModel.imageuploading = false;
            return;
        }

        angular.forEach(files, function (file, key) {
            if (file.type.indexOf('image') < 0) {
                isInvalidFileFound = true;
                return;
            }
        });

        if (isInvalidFileFound) {
            displayError("Error Uploading Iamges", 'Only image files can be uploaded for an company logo');
            $scope.imageuploading = false;
            return;
        }

        filesLength = filesLength + files.length;

        if (filesLength > 2) {
            displayError("Error Uploading Iamges", 'Salon galleries are required and must not be more than 2.');
            $scope.imageuploading = false;
            return;
        }

        viewModel.salonsFactory.uploadSalonImage(files).then(function (data) {
            viewModel.imageuploading = false;
        });
    };

    function save() {
        if (!viewModel.frmSalon.$valid || !validateImages()) {
            $rootScope.$broadcast('action-complete', true);
            return;
        }

        if (viewModel.actionType == 'CREATE') {
            viewModel.salonsFactory.add().then(function (data) {
                $rootScope.$broadcast('salon-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'UPDATE') {
            viewModel.salonsFactory.update().then(function (data) {
                $rootScope.$broadcast('salon-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'DELETE') {
            viewModel.salonsFactory.deleteSalon().then(function (data) {
                $rootScope.$broadcast('salon-updated', true);
                $uibModalInstance.dismiss();
            });
        }
    };

    function setPostalSameAsPhysicalAddress(postalSameAsPhysical) {
        if (!postalSameAsPhysical || !viewModel.salonsFactory.salon) {
            return;
        }

        viewModel.salonsFactory.salon.PostalAddressLine1 = viewModel.salonsFactory.salon.PhysicalAddressLine1;
        viewModel.salonsFactory.salon.PostalAddressLine2 = viewModel.salonsFactory.salon.PhysicalAddressLine2;
        viewModel.salonsFactory.salon.PostalAddressSuburb = viewModel.salonsFactory.salon.PhysicalAddressSuburb;
        viewModel.salonsFactory.salon.PostalAddressCity = viewModel.salonsFactory.salon.PhysicalAddressCity;
        viewModel.salonsFactory.salon.PostalAddressPostalCode = viewModel.salonsFactory.salon.PhysicalAddressPostalCode;
        viewModel.salonsFactory.salon.PostalAddressLatitude = viewModel.salonsFactory.salon.PhysicalAddressLatitude;
        viewModel.salonsFactory.salon.PostalAddressLongitude = viewModel.salonsFactory.salon.PhysicalAddressLongitude;
    };

    function getCurrentLocation() {
        utilsFactory.getCurrentLocation().then(function (data) {
            viewModel.salonsFactory.salon.PostalAddressLatitude = data.Position.latitude;
            viewModel.salonsFactory.salon.PostalAddressLongitude = data.Position.longitude;
            viewModel.salonsFactory.salon.PhysicalAddressLatitude = data.Position.latitude;
            viewModel.salonsFactory.salon.PhysicalAddressLongitude = data.Position.longitude;
        }, locationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });
    };

    function removeImage(imageIndex) {
        var index = app.Utils.indexOf(viewModel.salonsFactory.salon.Galleries, imageIndex, 'id');

        if (index >= 0) {
            viewModel.salonsFactory.salon.Galleries.splice(index, 1);
        }
    };

    function validateImages() {
        var isValid = true;
        var errorMessage = '';

        if (!viewModel.salonsFactory.salon.Logo || !viewModel.salonsFactory.salon.Logo) {
            errorMessage = '<div>Salon Logo is required.</div>';
            isValid = false;
        }

        if (!viewModel.salonsFactory.salon.Galleries || viewModel.salonsFactory.salon.Galleries.length == 0 || viewModel.salonsFactory.salon.Galleries.length > 2) {
            errorMessage = errorMessage + '<div>Salon galleries are required and must not be more than 2.</div>';
            isValid = false;
        }

        if (!isValid) {
            displayError("Error Saving Salons", errorMessage);
        }

        return isValid;
    }

    function locationError(error) {
        var newScope = $rootScope.$new();

        newScope.model = {
            'ErrorCode': 408,
            'ErrorHeader': 'Error retrieving location',
            'ErrorDetails': 'Error retrieving location, please ensure that gps location is enabled.'
        };

        $rootScope.$broadcast('server-error-occurred', {
            templateUrl: 'errortemplate.html',
            scope: newScope,
            size: 'sm'
        });
    };

    function displayError(errorHeader, errorDetails) {

        var newScope = $rootScope.$new();

        newScope.model = {
            'ErrorCode': "404",
            'ErrorHeader': errorHeader,
            'ErrorDetails': errorDetails,
        };

        $rootScope.$broadcast('server-error-occurred', {
            templateUrl: 'errortemplate.html',
            scope: newScope,
            size: 'sm'
        });

    }

    function saveWorkingHour() {
        if (!viewModel.frmWorkingHours.isValid(viewModel.companyWorkingHourViewModel.companyWorkingHour)) {
            return;
        }

        viewModel.companyWorkingHourViewModel.save();
    };
};


(function () {

    'use strict';

    angular.module('app').controller('searchBeautyTipsController', searchBeautyTipsController);

    searchBeautyTipsController.$inject = ['$scope', '$rootScope', '$state', 'beautyTipApiFactory'];

    function searchBeautyTipsController($scope, $rootScope, $state, beautyTipApiFactory) {
        var viewModel = $scope;

        viewModel.isLoading = false;
        viewModel.searchBeautyTips = searchBeautyTips;

        viewModel.SearchFilter = {
            StatusCode: 'ACTIVE',
            PageData: {
                Take: 30,
                Skip: 0,
                SortColumn: 'CreateDate',
                SortOrder: 2
            },
            SearchText: ''
        };

        viewModel.beautyTipsGridOptions = {
            Paging: {
                PageIndex: 1,
                PageSize: 30
            },
            PageSizes: [30, 40, 60, 90, 100],
            Read: function (options) {
                var that = this;

                $rootScope.isLoading = true;
                $rootScope.loadingMessage = 'Loading data, please wait ...';

                viewModel.SearchFilter.PageData.Take = options.take;
                viewModel.SearchFilter.PageData.Skip = options.skip;

                beautyTipApiFactory.getBeautyTips(viewModel.SearchFilter).then(function (response) {
                    viewModel.beautyTipsGrid.SetDataSource(response.BeautyTips, response.TotalBeautyTips);
                    $rootScope.isLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            viewModel.beautyTipsGrid = data.grid;
            viewModel.beautyTipsGrid.SetPage(null, 1);
        });

        function searchBeautyTips() {
            viewModel.beautyTipsGrid.SetPage(null, 1);
        };

    };

})();
(function () {

    'use strict';

    angular.module('app').controller('searchPromotionProductsController', searchPromotionProductsController);

    searchPromotionProductsController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'notificationFactory', 'promotionProductApiFactory', 'utilsFactory'];

    function searchPromotionProductsController($scope, $rootScope, $state, $stateParams, notificationFactory, promotionProductApiFactory, utilsFactory) {
        var viewModel = $scope;

        viewModel.isLoading = false;
        viewModel.searchSpecials = searchSpecials;
        viewModel.goToSalonDirection = goToSalonDirection;

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: ''
        };

        viewModel.specialsGridOptions = {
            Paging: {
                PageIndex: 1,
                PageSize: 30
            },
            PageSizes: [30, 40, 60, 90, 100],
            Read: function (options) {
                var that = this;

                $rootScope.isLoading = true;
                $rootScope.loadingMessage = 'Loading data, please wait ...';

                viewModel.SearchFilter.PageData.Take = options.take;
                viewModel.SearchFilter.PageData.Skip = options.skip;

                promotionProductApiFactory.getAppPromotionProducts(viewModel.SearchFilter).then(function (response) {
                    viewModel.specialsGrid.SetDataSource(response.PromotionProducts, response.TotalPromotionProducts);
                    $rootScope.isLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            utilsFactory.getCurrentLocation().then(function (data) {
                viewModel.SearchFilter.Latitude = data.Position.latitude;
                viewModel.SearchFilter.Longitude = data.Position.longitude;
                viewModel.specialsGrid.SetPage(null, 1);
            }, locationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });
        });

        function searchSpecials() {
            viewModel.specialsGrid.SetPage(null, 1);
        };

        function goToSalonDirection(salonId) {
            $state.go('searchsalondirections', { salonId: salonId });
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
    };

})();
(function () {

    'use strict';

    angular.module('app').controller('searchSalonController', searchSalonController);

    searchSalonController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'searchSalonFactory'];

    function searchSalonController($scope, $rootScope, $state, $stateParams, searchSalonFactory) {
        var viewModel = $scope;
        var salonId = $stateParams.salonId

        $rootScope.isLoading = true;
        $rootScope.loadingMessage = 'Loading data, please wait ...';
        viewModel.goToSalonDirections = goToSalonDirections;
        viewModel.searchSalonFactory = searchSalonFactory;

        viewModel.searchSalonFactory.initialise(salonId).then(function () {
            $rootScope.isLoading = false;
        });

        function goToSalonDirections() {
            $state.go('searchsalondirections', { salonId: viewModel.searchSalonFactory.salon.Id });
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('searchSalonFactory', searchSalonFactory);

    searchSalonFactory.$inject = ['$q', '$rootScope', 'companyApiFactory', 'productApiFactory'];

    function searchSalonFactory($q, $rootScope, companyApiFactory, productApiFactory) {
        var factory = {
            initialise: initialise,
            salon: {},
            products: []
        };

        return factory;

        function initialise(salonId) {
            var deferred = $q.defer();

            var promises = {
                companyPromise: companyApiFactory.getCompany(salonId),
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

            productApiFactory.getAppProducts(searchFilter).then(function (data) {
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

    angular.module('app').controller('searchSalonDirectionsController', searchSalonDirectionsController);

    searchSalonDirectionsController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'geolocation', 'companyApiFactory', 'notificationFactory', 'utilsFactory'];

    function searchSalonDirectionsController($scope, $rootScope, $state, $stateParams, geolocation, companyApiFactory, notificationFactory, utilsFactory) {
        var viewModel = $scope;
        var salonId = $stateParams.salonId;

        viewModel.isLoading = false;
        viewModel.salon = {};

        $scope.map = {
            control: {},
            center: {
                latitude: -26.1706755,
                longitude: 28.0483971
            },
            zoom: 14
        };

        utilsFactory.getCurrentLocation().then(function (locationResponse) {

            $scope.map.center = {
                latitude: locationResponse.Position.latitude,
                longitude: locationResponse.Position.longitude
            };

            companyApiFactory.getCompany(salonId).then(function (data) {
                viewModel.salon = data.Company;

                var directionsDisplay = new google.maps.DirectionsRenderer();
                var directionsService = new google.maps.DirectionsService();
                var geocoder = new google.maps.Geocoder();

                var directions = {
                    origin: {
                        lat: viewModel.map.center.latitude,
                        lng: viewModel.map.center.longitude
                    },
                    destination: {
                        lat: Number(viewModel.salon.PhysicalAddressLatitude),
                        lng: Number(viewModel.salon.PhysicalAddressLongitude)
                    },
                    showList: false
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
                        $scope.showList = true;
                        viewModel.isLoading = false;
                    } else {
                        alert('Google route unsuccesfull!');
                    }
                });
            });
        }, locationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });

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

    angular.module('app').controller('searchSalonsController', searchSalonsController);

    searchSalonsController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'geolocation', 'companyApiFactory', 'searchSalonsFactory', 'notificationFactory', 'utilsFactory'];

    function searchSalonsController($scope, $rootScope, $state, $stateParams, geolocation, companyApiFactory, searchSalonsFactory, notificationFactory, utilsFactory) {
        var viewModel = $scope;

        viewModel.isLoading = false;
        viewModel.searchSalons = searchSalons;
        viewModel.goToSalonDirection = goToSalonDirection;
        viewModel.viewSalon = viewSalon;
        viewModel.salons = [];

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: searchSalonsFactory.SearchText,
            SubCategoryId: searchSalonsFactory.SubCategoryId,
            IsLocationSearch: true
        };

        searchSalonsFactory.SearchText = '';
        searchSalonsFactory.SubCategoryId = null;

        viewModel.salonsGridOptions = {
            Paging: {
                PageIndex: 1,
                PageSize: 30
            },
            PageSizes: [30, 40, 60, 90, 100],
            Read: function (options) {
                var that = this;

                $rootScope.isLoading = true;
                $rootScope.loadingMessage = 'Loading data, please wait ...';

                viewModel.SearchFilter.PageData.Take = options.take;
                viewModel.SearchFilter.PageData.Skip = options.skip;

                companyApiFactory.getAppCompanies(viewModel.SearchFilter).then(function (response) {
                    viewModel.salonsGrid.SetDataSource(response.Companies, response.TotalCompanies);
                    $rootScope.isLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            initialise();
        });

        function searchSalons() {
            viewModel.salonsGrid.SetPage(null, 1);
        };

        function initialise() {
            viewModel.isLoading = true;
            $rootScope.loadingMessage = 'Locating current location, please wait ...';

            utilsFactory.getCurrentLocation().then(function (data) {
                viewModel.SearchFilter.Latitude = data.Position.latitude;
                viewModel.SearchFilter.Longitude = data.Position.longitude;
                viewModel.isLoading = false;
                viewModel.salonsGrid.SetPage(null, 1);
            }, function (data) {
                var newScope = $rootScope.$new();

                newScope.model = data.data;

                notificationFactory.open({
                    templateUrl: 'errortemplate.html',
                    scope: newScope,
                    size: 'sm',
                    controller: errorController
                });
            });
        };

        function goToSalonDirection(salon) {
            $state.go('searchsalondirections', { salonId: salon.Id });
        };

        function viewSalon(salon) {
            $state.go('searchsalon', { salonId: salon.Id });
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('searchSalonsFactory', searchSalonsFactory);

    searchSalonsFactory.$inject = ['$q', '$rootScope', 'companyApiFactory', 'lookupApiFactory'];

    function searchSalonsFactory($q, $rootScope, companyApiFactory, lookupApiFactory) {
        var factory = {
            searchFilter: {}
        };

        return factory;

    };

})();
(function () {

    'use strict';

    angular.module('app').controller('subCategoryController', SubCategoryController);

    SubCategoryController.$inject = ['$scope', '$rootScope', '$state', 'notificationFactory', 'subCategoryFactory'];

    function SubCategoryController($scope, $rootScope, $state, notificationFactory, subCategoryFactory) {
        var viewModel = $scope;

        viewModel.subCategoryFactory = subCategoryFactory;
        viewModel.addSubCategory = addSubCategory;
        viewModel.editSubCategory = editSubCategory;
        viewModel.deleteSubCategory = deleteSubCategory;
        viewModel.searchSubCategories = searchSubCategories;

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: '',
            ShowAll: true
        };

        viewModel.subCategoriesGridOptions = {
            Paging: {
                PageIndex: 1,
                PageSize: 5
            },
            PageSizes: [30, 40, 60, 90, 100],
            Read: function (options) {
                var that = this;

                $rootScope.isLoading = true;
                $rootScope.loadingMessage = 'Loading data, please wait ...';

                viewModel.SearchFilter.PageData.Take = options.take;
                viewModel.SearchFilter.PageData.Skip = options.skip;

                viewModel.subCategoryFactory.searchSubCategories(viewModel.SearchFilter).then(function (response) {
                    viewModel.subCategoriesGrid.SetDataSource(response.SubCategories, response.TotalSubCategories);
                    $rootScope.isLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            viewModel.subCategoryFactory.initialise().then(function () {
                viewModel.subCategoriesGrid.SetPage(null, 1);
            });
        });

        viewModel.$on('sucategory-updated', function (event, data) {
            viewModel.subCategoriesGrid.SetPage(null, viewModel.subCategoriesGrid.Paging.PageIndex);
        });

        function searchSubCategories() {
            viewModel.subCategoriesGrid.SetPage(null, 1);
        };

        function addSubCategory() {
            var newScope = $rootScope.$new();
            newScope.actionType = 'CREATE';
            viewModel.subCategoryFactory.subCategory = {};

            notificationFactory.open({
                templateUrl: 'subcategorytemplate.html',
                scope: newScope,
                size: 'lg',
                controller: subCategoryModalController
            });
        };

        function editSubCategory(subCategory) {
            viewModel.subCategoryFactory.edit(subCategory.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'UPDATE';

                notificationFactory.open({
                    templateUrl: 'subcategorytemplate.html',
                    scope: newScope,
                    size: 'lg',
                    controller: subCategoryModalController
                });
            });
        };

        function deleteSubCategory(subCategory) {
            viewModel.subCategoryFactory.edit(subCategory.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'DELETE';

                notificationFactory.open({
                    templateUrl: 'subcategorytemplate.html',
                    scope: newScope,
                    size: 'sm',
                    controller: subCategoryModalController
                });
            });
        }
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('subCategoryFactory', subCategoryFactory);

    subCategoryFactory.$inject = ['$q', '$rootScope', 'subCategoryApiFactory', 'lookupApiFactory'];

    function subCategoryFactory($q, $rootScope, subCategoryApiFactory, lookupApiFactory) {
        var factory = {
            initialise: initialise,
            searchSubCategories: searchSubCategories,
            categories: [],
            subCategory: {},
            edit: edit,
            add: add,
            update: update,
            deleteSubCategory: deleteSubCategory
        };

        return factory;

        function initialise() {
            var deferred = $q.defer();

            lookupApiFactory.getCategories({ PageData: { IncludeAllData: true } }).then(function (response) {
                factory.categories = response.Items;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function searchSubCategories(searchFilter) {
            var deferred = $q.defer();

            lookupApiFactory.getSubCategories(searchFilter).then(function (data) {
                deferred.resolve({ SubCategories: data.Items, TotalSubCategories: data.TotalItems });
            });

            return deferred.promise;
        };

        function edit(subCategoryId) {
            var deferred = $q.defer();

            subCategoryApiFactory.getSubCategory(subCategoryId).then(function (data) {
                factory.subCategory = data.SubCategory;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function add() {
            var deferred = $q.defer();

            subCategoryApiFactory.addSubCategory(factory.subCategory).then(function (data) {
                factory.subCategory = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function update() {
            var deferred = $q.defer();

            subCategoryApiFactory.updateSubCategory(factory.subCategory).then(function (data) {
                factory.subCategory = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function deleteSubCategory() {
            var deferred = $q.defer();

            subCategoryApiFactory.deleteSubCategory(factory.subCategory).then(function (data) {
                factory.beuatyTip = {};
                deferred.resolve();
            });

            return deferred.promise;
        };
    };

})();
subCategoryModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'subCategoryFactory'];

function subCategoryModalController($scope, $rootScope, $uibModalInstance, subCategoryFactory) {
    var viewModel = $scope;

    viewModel.IsDeleteSubCategory = viewModel.actionType == 'DELETE';
    viewModel.Title = viewModel.actionType == 'DELETE' ? 'Delete Service' : viewModel.actionType == 'CREATE' ? 'Add New Service' : 'Edit Service';
    viewModel.cancel = cancel;
    viewModel.save = save;
    viewModel.subCategoryFactory = subCategoryFactory;

    function cancel() {
        $uibModalInstance.dismiss();
    };

    function save() {
        if (!viewModel.frmSubCategory.$valid) {
            $rootScope.$broadcast('action-complete', true);
            return;
        }

        if (viewModel.actionType == 'CREATE') {
            viewModel.subCategoryFactory.add().then(function (data) {
                $rootScope.$broadcast('sucategory-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'UPDATE') {
            viewModel.subCategoryFactory.update().then(function (data) {
                $rootScope.$broadcast('sucategory-updated', true);
                $uibModalInstance.dismiss();
            });
        }
        else if (viewModel.actionType == 'DELETE') {
            viewModel.subCategoryFactory.deleteSubCategory().then(function (data) {
                $rootScope.$broadcast('sucategory-updated', true);
                $uibModalInstance.dismiss();
            });
        }
    };

};


(function () {

    'use strict';

    angular.module('app').controller('userProfileController', UserProfileController);

    UserProfileController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'userProfileFactory', 'toastr', 'toastrConfig'];

    function UserProfileController($scope, $rootScope, $state, $stateParams, userProfileFactory, toastr, toastrConfig) {
        var viewModel = $scope;
        var userProfileId = $stateParams.userProfileId;

        viewModel.userProfileFactory = userProfileFactory;
        viewModel.saveProfile = saveProfile;
        toastrConfig.positionClass = 'toast-bottom-right';

        viewModel.userProfileFactory.getUser(userProfileId);

        function saveProfile() {
            if (!viewModel.frmUserProfile.$valid) {
                $rootScope.$broadcast('action-complete', true);
                return;
            }

            viewModel.userProfileFactory.save().then(function (data) {
                toastr.success('User profile save was successful.', 'Save');
            });
        };
    };

})();
(function () {

    'use strict';

    angular.module('app').factory('userProfileFactory', userProfileFactory);

    userProfileFactory.$inject = ['$q', 'accountApiFactory'];

    function userProfileFactory($q, accountApiFactory) {
        var factory = {
            getUser: getUser,
            save: save,
            user: {},
        };

        return factory;

        function getUser(userId) {
            var deferred = $q.defer();

            accountApiFactory.getUser(userId).then(function (data) {
                factory.user = data.User;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function save() {
            var deferred = $q.defer();

            accountApiFactory.updateUser(factory.user).then(function (data) {
                factory.user = data.User;
                deferred.resolve();
            });

            return deferred.promise;
        };
    };

})();