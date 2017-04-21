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

                for (var i = 0; i < factory.salon.Logos.length; i++) {
                    factory.salon.Logos[i].id = i + 1;
                }

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

        function uploadLogo(files) {
            var deferred = $q.defer();
            var promises = [];

            for (var i = 0; i < files.length; i++) {
                promises.push(companyApiFactory.saveCompanyLogo(files[i], inProgressFunction));
            }

            $q.all(promises).then(function (data) {
                if (!factory.salon.Logos) {
                    factory.salon.Logos = [];
                }

                var logoStartIndex = factory.salon.Logos.length + 1;

                for (var j = 0; j < data.length; j++) {
                    factory.salon.Logos.push({
                        id: logoStartIndex + j,
                        Logo: data[j].CompanyImage.ImageFileName,
                        NormalRelativeFileName: data[j].CompanyImage.ImageFileNamePath,
                        ThumbnailRelativeFileName: data[j].CompanyImage.ImageFileNamePath,
                        PreviewRelativeFileName: data[j].CompanyImage.ImageFileNamePath
                    });
                }
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