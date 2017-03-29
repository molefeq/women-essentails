(function () {

    'use strict';

    angular.module('app').factory('moduleApiFactory', moduleApiFactory);

    moduleApiFactory.$inject = ['$http', '$q', 'ServerApiBaseUrl'];

    function moduleApiFactory($http, $q, ServerApiBaseUrl) {
        var factory = {
            getAllModules: getAllModules
        };

        return factory;

        function getAllModules(searchText) {
            var deferred = $q.defer();

            $http(
            {
                method: 'POST',
                url: ServerApiBaseUrl + '/Module/GetModules/',
                data: { SearchText: searchText, PageData: { IncludeAllData: true, SortOrder: 1 } }
            })
            .success(function (data, status, headers, config) {
                deferred.resolve({ Modules: data.Items, TotalModules: data.TotalItems });
            });

            return deferred.promise;
        };
    };

})();