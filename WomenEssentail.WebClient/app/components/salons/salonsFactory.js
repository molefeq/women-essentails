(function () {

    'use strict';

    angular.module('app').factory('salonsFactory', salonsFactory);

    salonsFactory.$inject = ['$q', '$rootScope', 'companyApiFactory', 'lookupApiFactory'];

    function salonsFactory($q, $rootScope, companyApiFactory, lookupApiFactory) {
        var factory = {
            initialise: initialise,
            searchSalons: searchSalons,
            salons: [],
            provinces: [],
            salon: {},
            companyTypeId: {},
            clearAll: clearAll,
            edit: edit,
            add: add,
            update: update,
            deleteSalon: deleteSalon,
            uploadLogo: uploadLogo
        };

        return factory;

        function initialise() {
            var deferred = $q.defer();

            lookupApiFactory.getCompanyTypes({ PageData: { IncludeAllData: true } }).then(function (response) {
                for (var i = 0; i < response.Items.length; i++) {
                    if (response.Items[i].Code == 'SALON') {
                        factory.companyTypeId = response.Items[i].Id;
                        break;
                    }
                }

                deferred.resolve();
            });

            return deferred.promise;
        };

        function searchSalons(searchFilter) {
            var deferred = $q.defer();

            companyApiFactory.getCompanies(searchFilter).then(function (data) {
                factory.salons = data.Companies;
                factory.salon = {};
                deferred.resolve({ Salons: data.Companies, TotalSalons: data.TotalCompanies });
            });

            return deferred.promise;
        };

        function clearAll() {
            factory.salons = [];
            factory.salon = {};
        };

        function edit(salonId) {
            var deferred = $q.defer();

            companyApiFactory.getCompany(salonId).then(function (data) {
                factory.salon = data.Company;
                deferred.resolve();
            });

            return deferred.promise;
        };
        
        function add() {
            var deferred = $q.defer();

            companyApiFactory.addCompany(factory.salon).then(function (data) {
                factory.salon = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function update() {
            var deferred = $q.defer();

            companyApiFactory.updateCompany(factory.salon).then(function (data) {
                factory.salon = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function deleteSalon() {
            var deferred = $q.defer();

            companyApiFactory.deleteCompany(factory.salon).then(function (data) {
                factory.salon = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function uploadLogo(file) {
            var deferred = $q.defer();

            companyApiFactory.saveCompanyLogo(file, inProgressFunction).then(function (data) {
                factory.salon.Logo = data.CompanyImage.ImageFileName;
                factory.salon.RelativeFileName = data.CompanyImage.ImageFileNamePath;
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