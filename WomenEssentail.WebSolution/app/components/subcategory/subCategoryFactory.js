(function () {

    'use strict';

    angular.module('app').factory('subCategoryFactory', subCategoryFactory);

    subCategoryFactory.$inject = ['$q', '$rootScope', 'subCategoryApiFactory', 'lookupApiFactory'];

    function subCategoryFactory($q, $rootScope, subCategoryApiFactory, lookupApiFactory) {
        var factory = {
            initialise: initialise,
            searchSubCategories: searchSubCategories,
            categories: [],
            subCategory: {},
            edit: edit,
            add: add,
            update: update,
            deleteSubCategory: deleteSubCategory
        };

        return factory;

        function initialise() {
            var deferred = $q.defer();

            lookupApiFactory.getCategories({ PageData: { IncludeAllData: true } }).then(function (response) {
                factory.categories = response.Items;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function searchSubCategories(searchFilter) {
            var deferred = $q.defer();

            lookupApiFactory.getSubCategories(searchFilter).then(function (data) {
                deferred.resolve({ SubCategories: data.Items, TotalSubCategories: data.TotalItems });
            });

            return deferred.promise;
        };

        function edit(subCategoryId) {
            var deferred = $q.defer();

            subCategoryApiFactory.getSubCategory(subCategoryId).then(function (data) {
                factory.subCategory = data.SubCategory;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function add() {
            var deferred = $q.defer();

            subCategoryApiFactory.addSubCategory(factory.subCategory).then(function (data) {
                factory.subCategory = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function update() {
            var deferred = $q.defer();

            subCategoryApiFactory.updateSubCategory(factory.subCategory).then(function (data) {
                factory.subCategory = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function deleteSubCategory() {
            var deferred = $q.defer();

            subCategoryApiFactory.deleteSubCategory(factory.subCategory).then(function (data) {
                factory.beuatyTip = {};
                deferred.resolve();
            });

            return deferred.promise;
        };
    };

})();