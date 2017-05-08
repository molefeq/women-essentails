(function () {

    'use strict';

    angular.module('app').factory('promotionProductsFactory', promotionProductsFactory);

    promotionProductsFactory.$inject = ['$q', '$rootScope', 'productApiFactory', 'promotionProductApiFactory'];

    function promotionProductsFactory($q, $rootScope, productApiFactory, promotionProductApiFactory) {
        var factory = {
            initialise: initialise,
            searchPromotionProducts: searchPromotionProducts,
            product: {},
            promotionProduct: {},
            edit: edit,
            add: add,
            update: update,
            deletePromotionProduct: deletePromotionProduct,
            uploadLogo: uploadLogo
        };

        return factory;

        function initialise(productId) {
            var deferred = $q.defer();

            factory.product = {};
            factory.promotionProduct = {};

            productApiFactory.getProduct(productId).then(function (data) {
                factory.product = data.Product
                deferred.resolve();
            });

            return deferred.promise;
        };

        function searchPromotionProducts(searchFilter) {
            var deferred = $q.defer();

            promotionProductApiFactory.getPromotionProducts(searchFilter).then(function (data) {
                deferred.resolve({ PromotionProducts: data.PromotionProducts, TotalPromotionProducts: data.TotalPromotionProducts });
            });

            return deferred.promise;
        };

        function edit(promotionProductId) {
            var deferred = $q.defer();

            promotionProductApiFactory.getPromotionProduct(promotionProductId).then(function (data) {
                factory.promotionProduct = data.PromotionProduct
                deferred.resolve();
            });

            return deferred.promise;
        };

        function add() {
            var deferred = $q.defer();

            promotionProductApiFactory.addPromotionProduct(factory.promotionProduct).then(function (data) {
                factory.promotionProduct = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function update() {
            var deferred = $q.defer();

            promotionProductApiFactory.updatePromotionProduct(factory.promotionProduct).then(function (data) {
                factory.promotionProductApiFactory = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function deletePromotionProduct() {
            var deferred = $q.defer();

            promotionProductApiFactory.deletePromotionProduct(factory.promotionProduct).then(function (data) {
                factory.promotionProduct = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function uploadLogo(file) {
            var deferred = $q.defer();

            promotionProductApiFactory.savePromotionProductLogo(file, inProgressFunction).then(function (data) {
                factory.promotionProduct.Logo = data.PromotionProductImage.ImageFileName;
                factory.promotionProduct.RelativeFileName = data.PromotionProductImage.ImageFileNamePath;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function inProgressFunction(event) {
            var progressPercentage = parseInt(100.0 * event.loaded / event.total);
            console.log('progress: ' + progressPercentage + '% ' + event.config.file.name);
        };
    };

})();