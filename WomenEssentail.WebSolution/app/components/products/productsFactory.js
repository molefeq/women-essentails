(function () {

    'use strict';

    angular.module('app').factory('productsFactory', productsFactory);

    productsFactory.$inject = ['$q', '$rootScope', 'companyApiFactory', 'productApiFactory', 'lookupApiFactory'];

    function productsFactory($q, $rootScope, companyApiFactory, productApiFactory, lookupApiFactory) {
        var factory = {
            initialise: initialise,
            searchProducts: searchProducts,
            salon: {},
            product: {},
            categories: [],
            subCategories: [],
            edit: edit,
            add: add,
            update: update,
            deleteProduct: deleteProduct,
            getSubCategories: getSubCategories,
            uploadLogo: uploadLogo
        };

        return factory;

        function initialise(companyId) {
            var deferred = $q.defer();
            var promises = {
                companyPromise: companyApiFactory.getCompany(companyId),
                categoriesPromise: lookupApiFactory.getCategories({ PageData: { IncludeAllData: true } })
            };

            factory.product = {};

            $q.all(promises).then(function (data) {
                factory.salon = data.companyPromise.Company;
                factory.categories = data.categoriesPromise.Items;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function searchProducts(searchFilter) {
            var deferred = $q.defer();

            productApiFactory.getProducts(searchFilter).then(function (data) {
                deferred.resolve({ Products: data.Products, TotalProducts: data.TotalProducts });
            });

            return deferred.promise;
        };

        function edit(productId) {
            var deferred = $q.defer();

            productApiFactory.getProduct(productId).then(function (data) {
                factory.product = data.Product;

                if (factory.product.CategoryId) {
                    factory.getSubCategories(factory.product.CategoryId).then(function () {
                        deferred.resolve();
                    });
                }
                else {
                    deferred.resolve();
                }
            });

            return deferred.promise;
        };

        function add() {
            var deferred = $q.defer();

            productApiFactory.addProduct(factory.product).then(function (data) {
                factory.product = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function update() {
            var deferred = $q.defer();

            productApiFactory.updateProduct(factory.product).then(function (data) {
                factory.product = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function deleteProduct() {
            var deferred = $q.defer();

            productApiFactory.deleteProduct(factory.product).then(function (data) {
                factory.product = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function uploadLogo(file) {
            var deferred = $q.defer();

            productApiFactory.saveProductLogo(file, inProgressFunction).then(function (data) {
                factory.product.Logo = data.ProductImage.ImageFileName;
                factory.product.RelativeFileName = data.ProductImage.ImageFileNamePath;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function getSubCategories(categoryId) {
            var deferred = $q.defer();

            lookupApiFactory.getSubCategories({ CategoryId: categoryId, PageData: { IncludeAllData: true } }).then(function (response) {
                factory.subCategories = response.Items;
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