(function () {

    'use strict';

    angular.module('app').factory('salonsFactory', salonsFactory);

    salonsFactory.$inject = ['$q', '$rootScope', 'companyApiFactory'];

    function salonsFactory($q, $rootScope, companyApiFactory) {
        var factory = {
            searchSalons: searchSalons,
            searchFilter: {},
            salons: []
        };

        return factory;

        function searchSalons(searchFilter) {
            var deferred = $q.defer();

            companyApiFactory.getCompanies(searchFilter).then(function (data) {
                for (var i = 0; i < data.Companies.length; i++) {
                    factory.salons.push(data.Companies[i]);
                }
                deferred.resolve();
            });

            return deferred.promise;
        };

    };

})();