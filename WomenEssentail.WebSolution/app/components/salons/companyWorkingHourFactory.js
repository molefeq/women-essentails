(function () {

    'use strict';

    angular.module('app').factory('companyWorkingHourFactory', companyWorkingHourFactory);

    companyWorkingHourFactory.$inject = ['$rootScope', 'salonsFactory'];

    function companyWorkingHourFactory($rootScope, salonsFactory) {

        var factory = {
            dayNames: angular.copy(salonsFactory.dayNames),
            save: save,
            edit: edit,
            deleteItem: deleteItem,
            reset: reset,
            companyWorkingHour: { ActionType: 'CREATE' }
        };

        return factory;

        function save() {
            removeDayName(factory.companyWorkingHour.DayName);

            var indexOfCompanyWorkingHour = payRollApp.Utils.indexOf(salonsFactory.CompanyWorkingHours, factory.companyWorkingHour.DayName, "DayName");

            if (indexOfCompanyWorkingHour < 0) {
                add();
                return;
            }

            update(indexOfCompanyWorkingHour);
        };

        function add() {
            if (!salonsFactory.salon.CompanyWorkingHours) {
                salonsFactory.salon.CompanyWorkingHours = [];
            }

            salonsFactory.salon.CompanyWorkingHours.push(factory.companyWorkingHour);
            factory.companyWorkingHour = { ActionType: 'CREATE' };
        };

        function update(indexOfDayName) {
            salonsFactory.salon.CompanyWorkingHours[indexOfDayName] = factory.companyWorkingHour;
            factory.companyWorkingHour = { ActionType: 'CREATE' };
        };

        function removeDayName(dayName) {
            var indexOfDayName = payRollApp.Utils.indexOf(factory.dayNames, dayName, "FieldValue");

            if (indexOfDayName >= 0) {
                factory.dayNames[indexOfDayName].display = false;
            }
        };

        function addDayName(dayName) {
            var indexOfDayName = payRollApp.Utils.indexOf(factory.dayNames, dayName, "FieldValue");

            if (indexOfDayName >= 0) {
                factory.dayNames[indexOfDayName].display = true;
            }
        };

        function edit(companyWorkingHour) {
            if (factory.companyWorkingHour.ActionType == 'UPDATE' && companyWorkingHour.DayName != factory.companyWorkingHour.DayName) {
                removeDayName(factory.companyWorkingHour.companyWorkingHour);
            }

            addDayName(companyWorkingHour.DayName);

            factory.companyWorkingHour = companyWorkingHour;
            factory.companyWorkingHour.ActionType = 'UPDATE';
        };

        function deleteItem(companyWorkingHour) {
            var indexOfDayName = payRollApp.Utils.indexOf(factory.dayNames, companyWorkingHour.DayName, "FieldValue");

            if (indexOfDayName < 0) {
                return;
            }

            addDayName(companyWorkingHour.DayName);
            salonsFactory.salon.CompanyWorkingHours.splice(indexOfDayName, 1);
            factory.companyWorkingHour = { ActionType: 'CREATE' };
        };

        function reset() {
            if (factory.companyWorkingHour.ActionType == 'UPDATE') {
                removeAllowanceType(factory.companyWorkingHour.DayName);
            }

            factory.companyWorkingHour = { ActionType: 'CREATE' };
        };

    };

})();