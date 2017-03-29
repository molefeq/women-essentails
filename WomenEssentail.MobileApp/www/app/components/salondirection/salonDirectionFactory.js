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