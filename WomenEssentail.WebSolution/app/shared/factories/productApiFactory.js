(function () {

    'use strict';

    angular.module('app').factory('productApiFactory', productApiFactory);

    productApiFactory.$inject = ['$http', '$rootScope', '$q', '$upload', 'ServerApiBaseUrl'];

    function productApiFactory($http, $rootScope, $q, $upload, ServerApiBaseUrl) {
        var factory = {
            getProducts: getProducts,
            getAppProducts: getAppProducts,
            getProduct: getProduct,
            addProduct: addProduct,
            updateProduct: updateProduct,
            deleteProduct: deleteProduct,
            saveProductLogo: saveProductLogo
        };

        return factory;

        function getProducts(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Product/GetProducts',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Products: data.Items, TotalProducts: data.TotalItems });
            });

            return deferred.promise;
        };

        function getAppProducts(searchFilter) {
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
                url: ServerApiBaseUrl + '/Product/FetchProduct/?productId=' + productId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Product: data.Item });
            });

            return deferred.promise;
        };

        function addProduct(product) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Product/AddProduct',
                data: product
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Product: data.Item });
            });

            return deferred.promise;
        };

        function updateProduct(product) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Product/UpdateProduct',
                data: product
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Product: data.Item });
            });

            return deferred.promise;
        };

        function deleteProduct(product) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Product/DeleteProduct',
                data: product
            })
            .success(function (data, status, headers, config) {
                deferred.resolve();
            });

            return deferred.promise;
        };

        function saveProductLogo(file, inProgressFunction) {
            var deferred = $q.defer();

            $upload.upload({
                url: ServerApiBaseUrl + '/Product/SaveImage',
                method: "POST",
                file: file
            }).progress(function (event) {
                inProgressFunction(event);
            }).success(function (data, status, headers, config) {
                deferred.resolve({ ProductImage: data });
            });

            return deferred.promise;
        };
    };

})();