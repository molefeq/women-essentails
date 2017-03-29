// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    var map;
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        //loadMapsApi();
        // Initialize the map view 
        //map = plugin.google.maps.Map.getMap(div);

        // Wait until the map is ready status. 
        // map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);




        // const GOOGLE = new plugin.google.maps.LatLng(37.422476,-122.08425);
        // Handle the Cordova pause and resume events
        //document.addEventListener( 'pause', onPause.bind( this ), false );
        //document.addEventListener( 'resume', onResume.bind( this ), false );

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        //var parentElement = document.getElementById('deviceready');
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');
        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
    };
    function loadMapsApi() {
        $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyB7Dp0M7lBi97YoSYlpgt_7IDCMeXEZBiQ&sensor=true&callback=onMapsApiLoaded');
        if (google && google.maps) {
            return;
        }
        //$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyB7Dp0M7lBi97YoSYlpgt_7IDCMeXEZBiQ&sensor=true&callback=onMapsApiLoaded');
    }
    //function initMap() {
    //    alert('Maps is nitialised.');
    //    angular.element(function () {
    //        angular.bootstrap(document, ['app']);
    //    });
    //}
    function onBtnClicked() {

        // Move to the position with animation 
        map.animateCamera({
            target: { lat: 37.422359, lng: -122.084344 },
            zoom: 17,
            tilt: 60,
            bearing: 140,
            duration: 5000
        }, function () {

            // Add a maker 
            map.addMarker({
                position: { lat: 37.422359, lng: -122.084344 },
                title: "Welecome to \n" +
                       "Cordova GoogleMaps plugin for iOS and Android",
                snippet: "This plugin is awesome!",
                animation: plugin.google.maps.Animation.BOUNCE
            }, function (marker) {

                // Show the info window 
                marker.showInfoWindow();

                // Catch the click event 
                marker.on(plugin.google.maps.event.INFO_CLICK, function () {

                    // To do something... 
                    alert("Hello world!");

                });
            });
        });
    }
    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();