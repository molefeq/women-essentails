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