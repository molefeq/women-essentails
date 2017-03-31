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