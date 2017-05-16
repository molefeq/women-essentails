(function () {

    'use strict';

    angular.module('app').factory('companyApiFactory', companyApiFactory);

    companyApiFactory.$inject = ['$http', '$rootScope', '$q', '$upload', 'ServerApiBaseUrl'];

    function companyApiFactory($http, $rootScope, $q, $upload, ServerApiBaseUrl) {
        var factory = {
            getCompanies: getCompanies,
            getAppCompanies: getAppCompanies,
            getCompany: getCompany,
            addCompany: addCompany,
            updateCompany: updateCompany,
            deleteCompany: deleteCompany,
            saveCompanyImage: saveCompanyImage,
            saveCompanyLogo: saveCompanyLogo,
            getCompanyData: getCompanyData,
            addCompanyRequest: addCompanyRequest,
            updateCompanyStatus: updateCompanyStatus
        };

        return factory;

        function getCompanyData(companyTypeCode) {
            var deferred = $q.defer();

            $http(
            {
                method: 'GET',
                url: ServerApiBaseUrl + '/Company/GetCompanyData/?companyTypeCode=' + companyTypeCode
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ CompanyData: data });
            });

            return deferred.promise;
        };

        function getCompanies(searchFilter) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Company/GetCompanies',
                data: searchFilter
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Companies: data.Items, TotalCompanies: data.TotalItems });
            });

            return deferred.promise;
        };

        function getAppCompanies(searchFilter) {
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

        function getCompany(companyId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Company/FetchCompany/?companyId=' + companyId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Company: data.Item });
            });

            return deferred.promise;
        };

        function addCompany(company) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Company/AddCompany',
                data: company
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Company: data.Item });
            });

            return deferred.promise;
        };

        function updateCompany(company) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Company/UpdateCompany',
                data: company
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Company: data.Item });
            });

            return deferred.promise;
        };

        function deleteCompany(company) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Company/DeleteCompany',
                data: company
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Company: data.Item });
            });

            return deferred.promise;
        };

        function saveCompanyImage(file, inProgressFunction) {
            var deferred = $q.defer();

            $upload.upload({
                url: ServerApiBaseUrl + 'Company/SaveImage',
                method: "POST",
                file: file
            }).progress(function (event) {
                inProgressFunction(event);
            }).success(function (data, status, headers, config) {
                deferred.resolve({ CompanyImage: data });
            });

            return deferred.promise;
        };

        function addCompanyRequest(companyRequest) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Company/AddCompanyRequest',
                data: companyRequest
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ CompanyRequest: data.Item });
            });

            return deferred.promise;
        };

        function updateCompanyStatus(model) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + 'Company/UpdateCompanyStatus',
                data: model
            })
            .success(function (data, status, headers, config) {
                deferred.resolve();
            }).error(function () {
                deferred.reject();
            });

            return deferred.promise;
        };

        function saveCompanyLogo(file, inProgressFunction) {
            var deferred = $q.defer();

            $upload.upload({
                url: ServerApiBaseUrl + 'Company/SaveLogo',
                method: "POST",
                file: file
            }).progress(function (event) {
                inProgressFunction(event);
            }).success(function (data, status, headers, config) {
                deferred.resolve({ CompanyImage: data });
            });

            return deferred.promise;
        };
    };

})();