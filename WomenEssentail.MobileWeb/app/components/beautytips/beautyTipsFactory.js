(function () {

    'use strict';

    angular.module('app').factory('beautyTipsFactory', beautyTipsFactory);

    beautyTipsFactory.$inject = ['$q', '$rootScope', 'companyApiFactory', 'lookupApiFactory'];

    function beautyTipsFactory($q, $rootScope, companyApiFactory, lookupApiFactory) {
        var factory = {
            initialise: initialise,
            searchBeautyTips: searchBeautyTips,
            services: [],
            beautyTips: []
        };

        return factory;

        function initialise(searchFilter) {
            var deferred = $q.defer();
            var promises = {
                companyPromise: companyApiFactory.getBeautytips(searchFilter),
                subCategoriesPromise: lookupApiFactory.getSubCategories({ PageData: { IncludeAllData: true } })
            };

            factory.product = {};

            $q.all(promises).then(function (data) {
                factory.beautyTips = data.companyPromise.BeautyTips;
                factory.services = data.subCategoriesPromise.Items;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function searchBeautyTips(searchFilter) {
            var deferred = $q.defer();

            companyApiFactory.getBeautytips(searchFilter).then(function (data) {
                factory.beautyTips = data.BeautyTips;
                deferred.resolve();
            });

            return deferred.promise;
        };

    };

})();