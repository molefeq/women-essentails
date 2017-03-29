(function () {

    'use strict';

    angular.module('app').factory('appFactory', AppFactory);
    
    function AppFactory() {
        var user, userDisplayName, token;

        var factory = {
            ManageUrlRedirects: manageUrlRedirects
        };

        return factory;
        
        function manageUrlRedirects(event, fromState, toState) {
            
        };
    };

})();