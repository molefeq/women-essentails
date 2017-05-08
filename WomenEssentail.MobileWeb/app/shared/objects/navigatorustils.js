'use strict'

var app = app || {};

(function (navigatorutils) {
    navigatorutils.navigate = function (sourcePosition, destinationPosition, app) {
        launchnavigator.navigate([destinationPosition.latitude, destinationPosition.longitude], {
            start: [sourcePosition.latitude, sourcePosition.longitude],
            app: app,
            transportMode:launchnavigator.TRANSPORT_MODE.DRIVING,
            launchMode: launchnavigator.LAUNCH_MODE.MAPS
        });
    };

    function getAndroidDafaultApp(platform) {
        var dfd = jQuery.Deferred();

        launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, function (isAvailable) {
            if (isAvailable) {
                dfd.resolve(launchnavigator.APP.GOOGLE_MAPS);
            }
            else {
                launchnavigator.isAppAvailable(launchnavigator.APP.GEO, function (isAvailable) {
                    if (isAvailable) {
                        dfd.resolve(launchnavigator.APP.GEO);
                    }
                    else {
                        dfd.resolve('GOOGLE_WEB_BROWSER');
                    }
                });
            }
        });

        return dfd.promise();
    };

    function getIOSDafaultApp(platform) {
        var dfd = jQuery.Deferred();

        launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, function (isAvailable) {
            if (isAvailable) {
                dfd.resolve(launchnavigator.APP.GOOGLE_MAPS);
            }
            else {
                launchnavigator.isAppAvailable(launchnavigator.APP.APPLE_MAPS, function (isAvailable) {
                    if (isAvailable) {
                        dfd.resolve(launchnavigator.APP.APPLE_MAPS);
                    }
                    else {
                        dfd.resolve('GOOGLE_WEB_BROWSER');
                    }
                });
            }
        });

        return dfd.promise();
    };

})(app.NavigatorUtils = {});

