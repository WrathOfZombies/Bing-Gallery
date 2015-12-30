'use strict';

import $ = require('jquery');
import angular = require('angular');
import ui = require('angular-ui-router');
import Utilities = require('./core/utilities');
import HomeController = require('./home/home.controller');
import BingImageService = require('./services/bing.service');
import ImageLoader = require('./components/imageLoader/directive');

class App {
    private registerComponents() {
        this.module.factory('BingImageService', ['$http', ($http: ng.IHttpService) => { return new BingImageService($http); }]);
        this.module.controller('HomeController', ['BingImageService', HomeController]);
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