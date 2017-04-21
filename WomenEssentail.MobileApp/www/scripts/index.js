(function () {
    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady() {
        if (checkConnection()) {
            switchOnGPSLocationServices();
        }
    };

    function checkConnection() {
        var networkState = navigator.connection.type;
        var states = {};

        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';

        var isConnectionAvailable = networkState !== Connection.NONE;

        if (!isConnectionAvailable) {
            alert('Connection type: ' + states[networkState]);
        }

        return isConnectionAvailable;
    };

    function switchOnGPSLocationServices() {
        cordova.plugins.diagnostic.isLocationAvailable(function (available) {
            if (!available) {
                cordova.plugins.locationAccuracy.request(onRequestSuccess, onRequestFailure, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
                return;
            }

            loadGoogleMapsApi();
        }, function (error) {
            alert("The following error occurred: " + error);
        });
    };

    function loadGoogleMapsApi() {
        if (typeof google === 'undefined' || google === null || typeof google.maps === 'undefined' || google.maps === null) {
            $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyB7Dp0M7lBi97YoSYlpgt_7IDCMeXEZBiQ', initializeAngularApp);
            return;
        }

        initializeAngularApp();
    };

    function initializeAngularApp() {
        angular.element(function () {
            angular.bootstrap(document, ['app']);
        });
    };

    function onRequestSuccess(success) {
        loadGoogleMapsApi();
    };

    function onRequestFailure(error) {
        if (error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
            cordova.plugins.diagnostic.switchToLocationSettings();
            loadGoogleMapsApi();
        }
    };

})();

