(function () {

    'use strict';

    angular.module('app').factory('promotionProductApiFactory', promotionProductApiFactory);

    promotionProductApiFactory.$inject = ['$http', '$rootScope', '$q', '$upload', 'ServerApiBaseUrl'];

    function promotionProductApiFactory($http, $rootScope, $q, $upload, ServerApiBaseUrl) {
        var factory = {
            getPromotionProducts: getPromotionProducts,
            getAppPromotionProducts: getAppPromotionProducts,
            getPromotionProduct: getPromotionProduct,
            addPromotionProduct: addPromotionProduct,
            updatePromotionProduct: updatePromotionProduct,
            deletePromotionProduct: deletePromotionProduct,
            savePromotionProductLogo: savePromotionProductLogo
        };

        return factory;

        function getPromotionProducts(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/PromotionProduct/GetPromotionProducts',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ PromotionProducts: data.Items, TotalPromotionProducts: data.TotalItems });
            });

            return deferred.promise;
        };

        function getAppPromotionProducts(searchFilter) {
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
        };

        function getPromotionProduct(promotionProductId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/PromotionProduct/FetchPromotionProduct/?promotionProductId=' + promotionProductId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ PromotionProduct: data.Item });
            });

            return deferred.promise;
        };

        function addPromotionProduct(promotionProduct) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/PromotionProduct/AddPromotionProduct',
                data: promotionProduct
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ PromotionProduct: data.Item });
            });

            return deferred.promise;
        };

        function updatePromotionProduct(promotionProduct) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/PromotionProduct/UpdatePromotionProduct',
                data: promotionProduct
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ PromotionProduct: data.Item });
            });

            return deferred.promise;
        };

        function deletePromotionProduct(promotionProduct) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/PromotionProduct/DeletePromotionProduct',
                data: promotionProduct
            })
            .success(function (data, status, headers, config) {
                deferred.resolve();
            });

            return deferred.promise;
        };

        function savePromotionProductLogo(file, inProgressFunction) {
            var deferred = $q.defer();

            $upload.upload({
                url: ServerApiBaseUrl + '/PromotionProduct/SaveImage',
                method: "POST",
                file: file
            }).progress(function (event) {
                inProgressFunction(event);
            }).success(function (data, status, headers, config) {
                deferred.resolve({ PromotionProductImage: data });
            });

            return deferred.promise;
        };
    };

})();