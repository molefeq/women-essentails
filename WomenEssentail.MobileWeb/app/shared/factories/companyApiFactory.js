(function () {

    'use strict';

    angular.module('app').factory('companyApiFactory', companyApiFactory);

    companyApiFactory.$inject = ['$http', '$rootScope', '$q', 'ServerApiBaseUrl'];

    function companyApiFactory($http, $rootScope, $q, ServerApiBaseUrl) {
        var factory = {
            getCompanies: getCompanies,
            getCompany: getCompany,
            addCompanyRating: addCompanyRating,
            addCompanyFeedback: addCompanyFeedback,
            getCompanyFeedbacks: getCompanyFeedbacks,
            addCompanyRequest: addCompanyRequest,
            getBeautytips: getBeautytips
        }

        return factory;

        function getCompanies(searchFilter) {
            var deferred = $q.defer();
            
            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Company/GetAppCompanies',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Companies: data.Items, TotalCompanies: data.TotalItems });
            });

            return deferred.promise;
        };

        function getCompany(companyId, deviceId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Company/FetchCompany/?companyId=' + companyId + '&deviceId=' + deviceId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Company: data.Item });
            });

            return deferred.promise;
        };

        function addCompanyRating(model) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/CompanyRating/AddCompanyRating',
                data: model
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ CompanyRating: data.Item });
            });

            return deferred.promise;
        };

        function addCompanyFeedback(model) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/CompanyFeedback/AddCompanyFeedback',
                data: model
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ CompanyFeedBack: data.Item });
            });

            return deferred.promise;
        };

        function getCompanyFeedbacks(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/CompanyFeedback/GetCompanyFeebacks',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ CompanyFeedbacks: data.Items, TotalCompanyFeedbacks: data.TotalItems });
            });

            return deferred.promise;
        };

        function addCompanyRequest(companyRequest) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/CompanyRequest/AddCompanyRequest',
                data: companyRequest
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ CompanyRequest: data.Item });
            });

            return deferred.promise;
        };

        function getBeautytips(searchFilter) {
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
        }
    };

})();