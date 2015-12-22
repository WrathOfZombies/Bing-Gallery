'use strict';

import $ = require('jquery');
import angular = require('angular');
import ui = require('angular-ui-router');
import {HomeController} from './home/home.controller';
import {BingImageService} from './services/bing.service';

function getViewTemplate(view: string): string {
    return 'app/' + view + '/' +  view + '.html';
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
            templateUrl: getViewTemplate('home'),
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