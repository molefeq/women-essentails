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