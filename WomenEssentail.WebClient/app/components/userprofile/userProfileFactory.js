(function () {

    'use strict';

    angular.module('app').factory('userProfileFactory', userProfileFactory);

    userProfileFactory.$inject = ['$q', 'accountApiFactory'];

    function userProfileFactory($q, accountApiFactory) {
        var factory = {
            getUser: getUser,
            save: save,
            user: {},
        };

        return factory;

        function getUser(userId) {
            var deferred = $q.defer();

            accountApiFactory.getUser(userId).then(function (data) {
                factory.user = data.User;
                deferred.resolve();
            });

            return deferred.promise;
        };

        function save() {
            var deferred = $q.defer();

            accountApiFactory.updateUser(factory.user).then(function (data) {
                factory.user = data.User;
                deferred.resolve();
            });

            return deferred.promise;
        };
    };

})();