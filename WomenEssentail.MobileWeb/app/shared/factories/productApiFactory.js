(function () {

    'use strict';

    angular.module('app').factory('productApiFactory', productApiFactory);

    productApiFactory.$inject = ['$http', '$rootScope', '$q', 'ServerApiBaseUrl'];

    function productApiFactory($http, $rootScope, $q, ServerApiBaseUrl) {
        var factory = {
            getProducts: getProducts,
            getPromotionProducts: getPromotionProducts,
            getProduct: getProduct
        };

        return factory;

        function getProducts(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Product/GetAppProducts',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Products: data.Items, TotalProducts: data.TotalItems });
            });

            return deferred.promise;
        };

        function getProduct(productId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Product/FetchProduct/?productId=' + productId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Product: data.Item });
            });

            return deferred.promise;
        };

        function getPromotionProducts(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'PromotionProduct/GetAppPromotionProducts',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ PromotionProducts: data.Items, TotalPromotionProducts: data.TotalItems });
            });

            return deferred.promise;
        }
    };

})();