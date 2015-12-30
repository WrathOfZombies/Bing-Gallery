'use strict';

import Enumerations = require('./core/enumerations');
import Constants = require('./core/constants');
import App = require('./app');

class BootStrap {
    constructor() {
        let isCordova = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1,
            isWindows = window.hasOwnProperty('Windows');

        if (isCordova && !isWindows) {
            Constants.context = Enumerations.ContextTypes.Cordova;
            BootStrap.cordovaLaunch();
        }
        else if (isWindows) {
            Constants.context = Enumerations.ContextTypes.Windows;
            BootStrap.windowsLaunch();
        }
        else {
            Constants.context = Enumerations.ContextTypes.Web;
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