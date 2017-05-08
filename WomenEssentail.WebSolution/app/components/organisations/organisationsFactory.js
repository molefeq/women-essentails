(function () {

    'use strict';

    angular.module('app').factory('organisationsFactory', organisationsFactory);

    organisationsFactory.$inject = ['$q', 'organisationApiFactory'];

    function organisationsFactory($q, organisationApiFactory) {
        var factory = {
            searchOrganisations: searchOrganisations,
            organisations: [],
            organisation: {},
            clearAll: clearAll,
            add: add,
            uploadOrganisationImage: uploadOrganisationImage
        };

        return factory;

        function searchOrganisations(searchText) {
            var deferred = $q.defer();

            organisationApiFactory.getOrganisations(searchText).then(function (data) {
                factory.organisations = data.Organisations;
                factory.organisation = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function clearAll() {
            factory.organisations = data;
            factory.organisation = {};
        };

        function add() {
            var deferred = $q.defer();

            organisationApiFactory.addOrganisation(factory.organisation).then(function (data) {
                factory.organisations.push(data.organisation);
                factory.organisation = {};
                deferred.resolve();
            });

            return deferred.promise;
        };

        function uploadOrganisationImage(file) {
            var deferred = $q.defer();

            organisationApiFactory.saveOrganisationLogo(file, inProgressFunction).then(function (data) {
                factory.organisation.LogoFileName = data.PolicyImage.ImageFileName;
                factory.organisation.LogoFileNamePath = data.PolicyImage.ImageFileNamePath;
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