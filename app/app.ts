'use strict';

import $ = require('jquery');
import angular = require('angular');
import ui = require('angular-ui-router');
import {HomeController} from './core/controllers/home.controller';
import {BingImageService} from './core/services/bing.service';

function resolvePath(path: string): string {
    return '/www/templates/' + path + '.html';
}

export class App {
    private registerComponents() {
        this.module.factory('BingImageService', ['$http', ($http: ng.IHttpService) => { return new BingImageService($http); }]);
        this.module.controller('HomeController', ['BingImageService', HomeController]);
        this.module.directive('backImage', function() {
            return function(scope, element, attrs) {
                var url = attrs.backImage;
                element.css({
                    'background-image': 'url(' + url + ')',
                    'background-size': 'cover'
                });
            };
        });
    }

    private registerStates(
        $stateProvider: ng.ui.IStateProvider,
        $locationProvider: ng.ILocationProvider
    ) {
        $stateProvider.state('home', {
            templateUrl: resolvePath('views/home'),
            controller: 'HomeController',
            controllerAs: 'home'
        });

        $locationProvider.html5Mode(true).hashPrefix('!');
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
            $state.go('home');
        }]);
    }
}