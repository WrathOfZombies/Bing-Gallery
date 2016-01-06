'use strict';

import Utilities = require('./core/utilities');
import App = require('./app');

class BootStrap {
    constructor() {
        if (Utilities.isCordova) {
            BootStrap.cordovaLaunch();
        }
        else if (Utilities.isWindows) {
            BootStrap.windowsLaunch();
        }
        else {
            BootStrap.bootstrap();
        }
    }

    static cordovaLaunch() {
        let onPause = (event) => {

        };

        let onResume = (event) => {

        };

        let onDeviceReady = (event) => {
            document.addEventListener('pause', onPause);
            document.addEventListener('resume', onResume);
            BootStrap.bootstrap();
        };

        document.addEventListener('deviceready', onDeviceReady);
    }

    static windowsLaunch() {
        BootStrap.bootstrap();
    }

    static bootstrap() {
        let module = angular.module('BingGallery', ['ui.router', 'ngAnimate', 'ngMessages', 'ngAria', 'ngMaterial']);

        if (!(document && angular)) return;
        new App(module);

        angular.element(document).ready(() => {
            angular.bootstrap(document, ['BingGallery']);
        });
    }
}

export = BootStrap;