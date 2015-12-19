namespace BingGallery.Core {
    import app = BingGallery.Core.App;
    import enums = BingGallery.Utils.Enumerations;

    export let context: enums.Context;

    export function startApplication() {
        let isCordova = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1,
            isWindows = window.hasOwnProperty('Windows');

        if (isCordova && !isWindows) {
            context = enums.Context.Cordova;
            cordovaLaunch();
        }
        else if (isWindows) {
            context = enums.Context.Windows;
            App.bootstrap();
        }
        else {
            context = enums.Context.Web;
            App.bootstrap();
        }
    }

    function cordovaLaunch() {
        let onPause = (event) => {

        };

        let onResume = (event) => {

        };

        let onDeviceReady = (event) => {
            document.addEventListener('pause', onPause);
            document.addEventListener('resume', onResume);

            App.bootstrap();
        };

        document.addEventListener('deviceready', onDeviceReady);
    }
}

BingGallery.Core.startApplication();
