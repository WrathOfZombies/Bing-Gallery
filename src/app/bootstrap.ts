'use strict';

import {bootstrap} from 'angular2/platform/browser';
import Utilities = require('./core/utilities');
import AppComponent = require('./app.component');

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
        bootstrap(AppComponent);
    }
}

new BootStrap();