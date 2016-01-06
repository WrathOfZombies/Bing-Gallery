'use strict';

import $ = require('jquery');
import BootStrap = require('./bootstrap');
import angular = require('angular');
import ui = require('angular-ui-router');
import Utilities = require('./core/utilities');
import DownloadManager = require('./core/download.manager');
import WindowsImageManager = require('./windows/image.manager');
import HomeController = require('./home/home.controller');
import BingImageService = require('./services/bing.service');
import ImageLoader = require('./components/imageLoader/directive');

class App {
    private registerFactories() {
        this.module
            .factory('BingImageService', ['$http', ($http: ng.IHttpService) => { return new BingImageService($http); }])
            .factory('DownloadManager', ['$q', '$interval', ($q: ng.IQService, $interval: ng.IIntervalService) => { return new DownloadManager($q, $interval); }]);

        if (Utilities.isWindows) {
            this.module.factory('ImageManager', ['$q', 'DownloadManager', ($q: ng.IQService, DownloadManager: DownloadManager) => { return new WindowsImageManager($q, DownloadManager) }]);
        }
        else if (Utilities.isCordova) {

        }
        else {

        }
    }

    private registerComponents() {
        this.module.directive('imageLoader', ['ImageManager', (ImageManager) => { return new ImageLoader(ImageManager).directive; }]);
    }

    private registerControllers() {
        this.module.controller('HomeController', ['BingImageService', 'ImageManager', HomeController]);
    }

    private registerStates($stateProvider: ng.ui.IStateProvider) {
        $stateProvider.state(Utilities.getStateDefinition('Home'));
    }

    private configureComponents() {
        this.module.config(['$stateProvider', this.registerStates]);
    }

    constructor(private module: ng.IModule) {
        this.registerFactories();
        this.registerControllers();
        this.registerComponents();
        this.configureComponents();
        this.run();
    }

    run() {
        this.module.run(['$state', ($state: ng.ui.IStateService) => {
            $state.go('Home');
        }]);
    }
}

export = App;