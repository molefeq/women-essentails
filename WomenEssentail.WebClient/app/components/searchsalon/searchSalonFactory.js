﻿(function () {

    'use strict';

    angular.module('app').factory('searchSalonFactory', searchSalonFactory);

    searchSalonFactory.$inject = ['$q', '$rootScope', 'companyApiFactory', 'productApiFactory'];

    function searchSalonFactory($q, $rootScope, companyApiFactory, productApiFactory) {
        var factory = {
            initialise: initialise,
            salon: {},
            products: []
        };

        return factory;

        function initialise(salonId) {
            var deferred = $q.defer();

            var promises = {
                companyPromise: companyApiFactory.getCompany(salonId),
                productsPromise: searchProducts(salonId)
            }

            $q.all(promises).then(function (data) {
                factory.salon = data.companyPromise.Company;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function searchProducts(salonId) {
            var deferred = $q.defer();

            var searchFilter = {
                PageData: {
                    Take: 30,
                    Skip: 0
                },
                SearchText: '',
                CompanyId: salonId,
                IsCompanySearch: true
            };

            productApiFactory.getAppProducts(searchFilter).then(function (data) {
                var categoryGroupedProducts = _.groupBy(data.Products, function (product) { return product.CategoryName; });

                _.each(_.keys(categoryGroupedProducts), function (key) {
                    categoryGroupedProducts[key] = _.groupBy(categoryGroupedProducts[key], function (product) { return product.SubCategoryName; });
                });

                factory.products = categoryGroupedProducts;
                deferred.resolve();
            });

            return deferred.promise;
        };

    };

})();