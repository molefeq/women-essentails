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

