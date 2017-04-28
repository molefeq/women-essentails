(function () {

    'use strict';

    angular.module('app').factory('beautyTipsFactory', beautyTipsFactory);

    beautyTipsFactory.$inject = ['$q', '$rootScope', 'beautyTipApiFactory', 'lookupApiFactory'];

    function beautyTipsFactory($q, $rootScope, beautyTipApiFactory, lookupApiFactory) {
        var factory = {
            initialise: initialise,
            searchBeuatyTips: searchBeuatyTips,
            categories: [],
            subCategories: [],
            beuatyTip: {},
            edit: edit,
            add: add,
            update: update,
            deleteBeuatyTip: deleteBeuatyTip,
            getSubCategories: getSubCategories,
            actvate: actvate
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

        function searchBeuatyTips(searchFilter) {
            var deferred = $q.defer();

            beautyTipApiFactory.getBeautyTips(searchFilter).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        };

        function edit(beautyTipId) {
            var deferred = $q.defer();

            beautyTipApiFactory.getBeautyTip(beautyTipId).then(function (data) {
                factory.beuatyTip = data.BeautyTip;

                if (factory.beuatyTip.CategoryId) {
                    factory.getSubCategories(factory.beuatyTip.CategoryId).then(function () {
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

            beautyTipApiFactory.addBeautyTip(factory.beuatyTip).then(function (data) {
                factory.beuatyTip = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function update() {
            var deferred = $q.defer();

            beautyTipApiFactory.updateBeautyTip(factory.beuatyTip).then(function (data) {
                factory.beuatyTip = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function deleteBeuatyTip() {
            var deferred = $q.defer();

            beautyTipApiFactory.deleteBeautyTip(factory.beuatyTip).then(function (data) {
                factory.beuatyTip = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function actvate() {
            var deferred = $q.defer();

            beautyTipApiFactory.activateBeautyTip(factory.beuatyTip).then(function (data) {
                factory.beuatyTip = {};
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
    };

})();