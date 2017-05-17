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

