(function () {

    'use strict';

    angular.module('app').factory('subCategoryApiFactory', subCategoryApiFactory);

    subCategoryApiFactory.$inject = ['$http', '$rootScope', '$q', '$upload', 'ServerApiBaseUrl'];

    function subCategoryApiFactory($http, $rootScope, $q, $upload, ServerApiBaseUrl) {
        var factory = {
            getSubCategories: getSubCategories,
            getSubCategory: getSubCategory,
            addSubCategory: addSubCategory,
            updateSubCategory: updateSubCategory,
            deleteSubCategory: deleteSubCategory
        };

        return factory;

        function getSubCategories(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/SubCategory/GetSubCategories',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ SubCategories: data.Items, TotalSubCategories: data.TotalItems });
            });

            return deferred.promise;
        };

        function getSubCategory(subCategoryId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/SubCategory/FetchSubCategory/?subCategoryId=' + subCategoryId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ SubCategory: data.Item });
            });

            return deferred.promise;
        };

        function addSubCategory(subCategory) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/SubCategory/AddSubCategory',
                data: subCategory
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ SubCategory: data.Item });
            });

            return deferred.promise;
        };

        function updateSubCategory(subCategory) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/SubCategory/UpdateSubCategory',
                data: subCategory
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ SubCategory: data.Item });
            });

            return deferred.promise;
        };

        function deleteSubCategory(subCategory) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/SubCategory/DeleteSubCategory',
                data: subCategory
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ SubCategory: data.Item });
            });

            return deferred.promise;
        };

    };

})();