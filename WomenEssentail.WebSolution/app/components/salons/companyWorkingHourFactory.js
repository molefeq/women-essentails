(function () {

    'use strict';

    angular.module('app').factory('companyWorkingHourFactory', companyWorkingHourFactory);

    companyWorkingHourFactory.$inject = ['$rootScope', 'salonsFactory'];

    function companyWorkingHourFactory($rootScope, salonsFactory) {

        var factory = {
            dayNames: [],
            save: save,
            edit: edit,
            deleteItem: deleteItem,
            reset: reset,
            companyWorkingHour: { ActionType: 'CREATE' }
        };

        return factory;

        function save() {
            removeDayName(factory.companyWorkingHour.DayName);

            var indexOfCompanyWorkingHour = app.Utils.indexOf(salonsFactory.salon.CompanyWorkingHours, factory.companyWorkingHour.DayName, "DayName");

            factory.companyWorkingHour.StartTime = new Date(factory.companyWorkingHour.StartDateTime).toTimeDisplayString();
            factory.companyWorkingHour.EndTime = new Date(factory.companyWorkingHour.EndDateTime).toTimeDisplayString();

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
            var indexOfDayName = app.Utils.indexOf(factory.dayNames, dayName, "FieldValue");

            if (indexOfDayName >= 0) {
                factory.dayNames[indexOfDayName].display = false;
            }
        };

        function addDayName(dayName) {
            var indexOfDayName = app.Utils.indexOf(factory.dayNames, dayName, "FieldValue");

            if (indexOfDayName >= 0) {
                factory.dayNames[indexOfDayName].display = true;
            }
        };

        function edit(companyWorkingHour) {
            if (factory.companyWorkingHour.ActionType == 'UPDATE' && companyWorkingHour.DayName != factory.companyWorkingHour.DayName) {
                removeDayName(factory.companyWorkingHour.companyWorkingHour);
            }

            addDayName(companyWorkingHour.DayName);

            companyWorkingHour.StartDateTime = app.Utils.timeToDateTime(companyWorkingHour.StartTime);
            companyWorkingHour.EndDateTime = app.Utils.timeToDateTime(companyWorkingHour.EndTime);

            factory.companyWorkingHour = companyWorkingHour;
            factory.companyWorkingHour.ActionType = 'UPDATE';
        };

        function deleteItem(companyWorkingHour) {
            var indexOfDayName = app.Utils.indexOf(factory.dayNames, companyWorkingHour.DayName, "FieldValue");

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