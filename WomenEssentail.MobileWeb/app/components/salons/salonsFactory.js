(function () {

    'use strict';

    angular.module('app').factory('salonsFactory', salonsFactory);

    salonsFactory.$inject = ['$q', '$rootScope', 'companyApiFactory'];

    function salonsFactory($q, $rootScope, companyApiFactory) {
        var factory = {
            searchSalons: searchSalons,
            salons:[]
        };

        return factory;
        
        function searchSalons(searchFilter) {
            var deferred = $q.defer();

            companyApiFactory.getCompanies(searchFilter).then(function (data) {
                factory.salons = data.Companies;
                deferred.resolve();
            });

            return deferred.promise;
        };

    };

})();