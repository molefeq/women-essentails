

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