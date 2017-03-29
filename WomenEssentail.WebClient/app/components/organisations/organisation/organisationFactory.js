(function () {

    'use strict';

    angular.module('app').factory('organisationFactory', organisationFactory);

    organisationFactory.$inject = ['$q', 'organisationApiFactory'];

    function organisationFactory($q, organisationApiFactory) {

        var factory = {
            getOrganisation: getOrganisation,
            organisation: {},
            saveOrganisation: saveOrganisation,
            uploadOrganisationImage: uploadOrganisationImage
        };

        return factory;

        function getOrganisation(organisationId) {
            var deferred = $q.defer();

            organisationApiFactory.getOrganisation(organisationId).then(function (data) {
                factory.organisation = data.organisation;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function saveOrganisation() {
            var deferred = $q.defer();

            organisationApiFactory.updateOrganisation(factory.organisation).then(function (data) {
                factory.organisation = data.organisation;
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
        
        function inProgressFunction(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        };
    };

})();