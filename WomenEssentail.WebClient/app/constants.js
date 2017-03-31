﻿'use strict';

var menus = {
    Company: {
        MenuItems: [
            { DisplayName: 'Company', path: 'company', module: 'Company', QueryParameters: ['companyId'] },
            { DisplayName: 'Employees', path: 'employees', module: 'Employees', QueryParameters: ['companyId'] },
            //{ DisplayName: 'Company Set Up', path: 'companysetup', module: 'Company', QueryParameters: ['companyId'] },
            { DisplayName: 'Users', path: 'companyusers', module: 'Company', QueryParameters: ['companyId'] }
        ]
    },
    Organisation: {
        MenuItems: [
            { DisplayName: 'Organisation', path: 'organisation', module: 'Organisation', QueryParameters: ['organisationId'] },
            { DisplayName: 'Users', path: 'organisationusers', module: 'Organisation Users', QueryParameters: ['organisationId'] }
        ]
    },
    SarsConfigurations: {
        MenuItems: [
            { DisplayName: 'Tax Tables', module: 'Tax Tables', path: 'taxtables' },
            { DisplayName: 'Allowances', module: 'Allowances', path: 'allowances' },
            { DisplayName: 'Pension Rules', module: 'Pension Rules', path: 'pensionrules' },
            { DisplayName: 'RAF Rules', module: 'RAF Rules', path: 'rafrules' },
            { DisplayName: 'Medical Aid Credits', module: 'Medical Aid Credits', path: 'medicalaidcredits' }
        ]
    }
};

var anonymousStates =
    {
        'login': true,
        'forgotpassword': true,
        'resetpassword': true,
        'changepassword': true,
        'landing': true,
        'aboutus': true,
        'contactus': true,
        'searchsalons': true,
        'register': true
    };

angular.module('app').constant('ServerBaseUrl', 'http://localhost:55464/');
angular.module('app').constant('ServerApiBaseUrl', 'http://localhost:55464/api/');
angular.module('app').constant('SubMenuItems', menus);
angular.module('app').constant('AnonymousStates', anonymousStates);