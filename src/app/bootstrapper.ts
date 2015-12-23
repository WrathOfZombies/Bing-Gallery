'use strict';

import {App} from './app';

export class BootStrap {
    static context: string;

    constructor() {
        let isCordova = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1,
            isWindows = window.hasOwnProperty('Windows');

        if (isCordova && !isWindows) {
            BootStrap.context = 'Cordova';
            BootStrap.cordovaLaunch();
        }
        else if (isWindows) {
            BootStrap.context = 'Windows';
            BootStrap.bootstrap();
        }
        else {
            BootStrap.context = 'Web';
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

    static bootstrap() {
        let module = angular.module('BingGallery', ['ui.router', 'ngAnimate', 'ngMessages', 'ngAria', 'ngMaterial']);

        if (!(document && angular)) return;
        new App(module);

        angular.element(document).ready(() => {
            angular.bootstrap(document, ['BingGallery']);
        });
    }
}