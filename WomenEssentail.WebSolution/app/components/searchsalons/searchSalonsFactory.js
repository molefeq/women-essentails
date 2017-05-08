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