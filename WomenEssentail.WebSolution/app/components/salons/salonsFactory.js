/// <reference path="../../shared/objects/utils.js" />


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
            selectedSalons: [],
            companyTypeId: {},
            clearAll: clearAll,
            edit: edit,
            add: add,
            update: update,
            deleteSalon: deleteSalon,
            uploadSalonImage: uploadSalonImage,
            uploadSalonLogo: uploadSalonLogo,
            setSelectedSalon: setSelectedSalon,
            activateSalons: activateSalons,
            deactivateSalons: deactivateSalons,
            deleteSalons: deleteSalons,
            selectAll: selectAll,
            dayNames:[]
        };

        return factory;

        function initialise() {
            var deferred = $q.defer();
            var promises = {
                companyTypesPromise: lookupApiFactory.getCompanyTypes({ PageData: { IncludeAllData: true } }),
                dayNamesPromise: lookupApiFactory.getLookupFields('DayName')
            }

            factory.selectedSalons = [];
            
            $q.all(promises).then(function (data) {
                for (var i = 0; i < data.dayNamesPromise.length; i++) {
                    data.dayNamesPromise[i].display = true;
                }

                factory.dayNames = data.dayNamesPromise;

                for (var i = 0; i < data.companyTypesPromise.Items.length; i++) {
                    if (data.companyTypesPromise.Items[i].Code == 'SALON') {
                        factory.companyTypeId = data.companyTypesPromise.Items[i].Id;
                        break;
                    }
                }

                deferred.resolve();
            });
            
            return deferred.promise;
        };

        function searchSalons(searchFilter) {
            var deferred = $q.defer();

            factory.selectedSalons = [];

            companyApiFactory.getCompanies(searchFilter).then(function (data) {
                for (var i = 0; i < data.Companies.length; i++) {
                    data.Companies[i].IsSelected = false;
                }

                factory.salons = data.Companies;
                factory.salon = {};
                deferred.resolve({ Salons: data.Companies, TotalSalons: data.TotalCompanies });
            });

            return deferred.promise;
        };

        function clearAll() {
            factory.selectedSalons = [];
            factory.salons = [];
            factory.salon = {};
        };

        function edit(salonId) {
            var deferred = $q.defer();

            companyApiFactory.getCompany(salonId).then(function (data) {
                factory.salon = data.Company;

                for (var i = 0; i < factory.salon.Galleries.length; i++) {
                    factory.salon.Galleries[i].id = i + 1;
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

        function uploadSalonLogo(files) {
            var deferred = $q.defer();
            var promises = [];

            companyApiFactory.saveCompanyLogo(files[0], inProgressFunction).then(function (data) {
                factory.salon.Logo = {
                    Logo: data.CompanyImage.ImageFileName,
                    ImageType: 'Logo',
                    NormalRelativeFileName: data.CompanyImage.ImageFileNamePath,
                    ThumbnailRelativeFileName: data.CompanyImage.ImageFileNamePath,
                    PreviewRelativeFileName: data.CompanyImage.ImageFileNamePath
                };

                deferred.resolve();
            });

            return deferred.promise;
        };

        function uploadSalonImage(files) {
            var deferred = $q.defer();
            var promises = [];

            for (var i = 0; i < files.length; i++) {
                promises.push(companyApiFactory.saveCompanyImage(files[i], inProgressFunction));
            }

            $q.all(promises).then(function (data) {
                if (!factory.salon.Galleries) {
                    factory.salon.Galleries = [];
                }

                var logoStartIndex = factory.salon.Galleries.length + 1;

                for (var j = 0; j < data.length; j++) {
                    factory.salon.Galleries.push({
                        id: logoStartIndex + j,
                        Logo: data[j].CompanyImage.ImageFileName,
                        ImageType: 'GALLERY',
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

        function selectAll(salons, selectAll) {
            for (var i = 0; i < salons.length; i++) {
                var indexOfSalon = app.Utils.indexOf(factory.selectedSalons, salons[i].Id, "Id");

                salons[i].IsSelected = selectAll;

                if (selectAll && indexOfSalon < 0) {
                    factory.selectedSalons.push(salons[i]);
                }

                if (!selectAll && indexOfSalon >= 0) {
                    factory.selectedSalons.splice(indexOdSalon, 1);
                }
            }
        };

        function setSelectedSalon(salon) {
            var indexOfSalon = app.Utils.indexOf(factory.selectedSalons, salon.Id, "Id");

            if (salon.IsSelected && indexOfSalon < 0) {
                factory.selectedSalons.push(salon);
            }

            if (!salon.IsSelected && indexOfSalon >= 0) {
                factory.selectedSalons.splice(indexOdSalon, 1);
            }
        };

        function activateSalons() {
            if (!factory.selectedSalons || factory.selectedSalons.length == 0) {
                return;
            };

            var deferred = $q.defer();

            var model = {
                StatusCode: 'ACTIVE',
                Ids: getSelectedSalonsId()
            };

            companyApiFactory.updateCompanyStatus(model).then(function () {
                factory.selectedSalons = [];
                deferred.resolve();
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        };

        function deactivateSalons() {
            if (!factory.selectedSalons || factory.selectedSalons.length == 0) {
                return;
            };

            var deferred = $q.defer();

            var model = {
                StatusCode: 'INACTIVE',
                Ids: getSelectedSalonsId()
            };

            companyApiFactory.updateCompanyStatus(model).then(function () {
                factory.selectedSalons = [];
                deferred.resolve();
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        };

        function deleteSalons() {
            if (!factory.selectedSalons || factory.selectedSalons.length == 0) {
                return;
            };
            var deferred = $q.defer();

            var model = {
                StatusCode: 'DELETED',
                Ids: getSelectedSalonsId()
            };

            companyApiFactory.updateCompanyStatus(model).then(function () {
                factory.selectedSalons = [];
                deferred.resolve();
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        };

        function getSelectedSalonsId() {
            var ids = [];

            if (!factory.selectedSalons || factory.selectedSalons.length == 0) {
                return ids;
            };

            for (var i = 0; i < factory.selectedSalons.length; i++) {
                ids.push(factory.selectedSalons[i].Id);
            }

            return ids;
        };
    };

})();