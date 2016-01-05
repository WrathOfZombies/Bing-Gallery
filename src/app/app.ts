'use strict';

import $ = require('jquery');
import angular = require('angular');
import ui = require('angular-ui-router');
import Utilities = require('./core/utilities');
import BackgroundLoader = require('./core/background.loader');
import HomeController = require('./home/home.controller');
import BingImageService = require('./services/bing.service');
import ImageLoader = require('./components/imageLoader/directive');

class App {
    private registerComponents() {
        this.module.factory('BingImageService', ['$http', ($http: ng.IHttpService) => { return new BingImageService($http); }]);
        this.module.factory('BackgroundLoaderService', ['$q', ($q: ng.IQService) => { return new BackgroundLoader($q); }]);
        this.module.controller('HomeController', ['BingImageService', 'BackgroundLoaderService', HomeController]);
        this.module.directive('imageLoader', [() => { return new ImageLoader(); }]);
    }

    private registerStates(
        $stateProvider: ng.ui.IStateProvider,
        $locationProvider: ng.ILocationProvider
    ) {
        $stateProvider.state(Utilities.getStateDefinition('Home'));
    }

    private configureComponents() {
        this.module.config(['$stateProvider', '$locationProvider', this.registerStates]);
    }

    constructor(private module: ng.IModule) {
        this.registerComponents();
        this.configureComponents();
        this.run();
    }

    run() {
        this.module.run(['$state', 'BingImageService', ($state: ng.ui.IStateService, BingImageService: BingImageService) => {
            $state.go('Home');
        }]);
    }
}

export = App;