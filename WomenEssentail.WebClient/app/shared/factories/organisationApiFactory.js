(function () {

    'use strict';

    angular.module('app').factory('organisationApiFactory', organisationApiFactory);

    organisationApiFactory.$inject = ['$http', '$q', '$upload', 'ServerApiBaseUrl'];

    function organisationApiFactory($http, $q, $upload, ServerApiBaseUrl) {
        var factory = {
            getOrganisations: getOrganisations,
            getOrganisation: getOrganisation,
            addOrganisation: addOrganisation,
            updateOrganisation: updateOrganisation,
            saveOrganisationLogo: saveOrganisationLogo
        };

        return factory;

        function getOrganisations(searchText) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Organisation/GetOrganisations',
                data: { SearchText: searchText, PageData: { IncludeAllData: true } }
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Organisations: data.Items, TotalOrganisations: data.TotalItems });
            });

            return deferred.promise;
        };

        function getOrganisation(organisationId) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Organisation/FetchOrganisation/?organisationId=' + organisationId
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ organisation: data.Item });
            });

            return deferred.promise;
        };

        function addOrganisation(organisation) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Organisation/AddOrganisation',
                data: organisation
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ organisation: data.Item });
            });

            return deferred.promise;
        };

        function updateOrganisation(organisation) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Organisation/UpdateOrganisation',
                data: organisation
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ organisation: data.Item });
            });

            return deferred.promise;
        };

        function saveOrganisationLogo(file, inProgressFunction) {
            var deferred = $q.defer();

            $upload.upload({
                url: ServerApiBaseUrl + '/Organisation/SaveImage',
                method: "POST",
                file: file
            }).progress(function (event) {
                inProgressFunction(event);
            }).success(function (data, status, headers, config) {
                deferred.resolve({ PolicyImage: data });
            });

            return deferred.promise;
        };
    };

})();