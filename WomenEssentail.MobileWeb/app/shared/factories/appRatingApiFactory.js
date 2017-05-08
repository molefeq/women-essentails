
(function () {

    'use strict';

    angular.module('app').factory('appRatingApiFactory', appRatingApiFactory);

    appRatingApiFactory.$inject = ['$http', '$rootScope', '$q', '$upload', 'ServerApiBaseUrl'];

    function appRatingApiFactory($http, $rootScope, $q, $upload, ServerApiBaseUrl) {
        var factory = {
            addAppRating: addAppRating
        };

        return factory;

        function addAppRating(appRating) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/AppRating/AddAppRating',
                data: appRating
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ AppRating: data.Item });
            });

            return deferred.promise;
        };


    };

})();