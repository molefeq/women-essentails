(function () {

    'use strict';

    angular.module('app').factory('beautyTipApiFactory', beautyTipApiFactory);

    beautyTipApiFactory.$inject = ['$http', '$rootScope', '$q', '$upload', 'ServerApiBaseUrl'];

    function beautyTipApiFactory($http, $rootScope, $q, $upload, ServerApiBaseUrl) {
        var factory = {
            getBeautyTips: getBeautyTips,
            getBeautyTip: getBeautyTip,
            addBeautyTip: addBeautyTip,
            updateBeautyTip: updateBeautyTip,
            deleteBeautyTip: deleteBeautyTip,
            activateBeautyTip: activateBeautyTip
        };

        return factory;
        
        function getBeautyTips(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/BeautyTip/GetBeautyTips',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ BeautyTips: data.Items, TotalBeautyTips: data.TotalItems });
            });

            return deferred.promise;
        };
        
        function getBeautyTip(beautyTipId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/BeautyTip/FetchBeautyTip/?beautyTipId=' + beautyTipId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ BeautyTip: data.Item });
            });

            return deferred.promise;
        };

        function addBeautyTip(beautyTip) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/BeautyTip/AddBeautyTip',
                data: beautyTip
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ BeautyTip: data.Item });
            });

            return deferred.promise;
        };

        function updateBeautyTip(beautyTip) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/BeautyTip/UpdateBeautyTip',
                data: beautyTip
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ BeautyTip: data.Item });
            });

            return deferred.promise;
        };

        function deleteBeautyTip(beautyTip) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/BeautyTip/DeleteBeautyTip',
                data: beautyTip
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ BeautyTip: data.Item });
            });

            return deferred.promise;
        };

        function activateBeautyTip(beautyTip) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/BeautyTip/ActivateBeautyTip',
                data: beautyTip
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ BeautyTip: data.Item });
            });

            return deferred.promise;
        };
        
    };

})();