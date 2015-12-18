/// <reference path="../../_references.d.ts" />
/// <reference path="../../typings/tsd.d.ts" />

namespace BingGallery.Core {
    export function resolvePath(path: string): string {
        return '/www/templates/' + path + '.html';
    }

    export let module = angular.module('BingGallery', ['ngAnimate', 'ngMaterial', 'ui.router']);

    export class App {
        private registerComponents() {
            this.module.factory('BingImageService', ['$http', ($http: ng.IHttpService) => { return new BingGallery.Core.Services.BingImageService($http); }]);
        }

        private registerStates(
            $stateProvider: ng.ui.IStateProvider,
            $locationProvider: ng.ILocationProvider
        ) {
            $stateProvider.state('home', {
                templateUrl: resolvePath('views/home')
            });

            $locationProvider.html5Mode(true).hashPrefix('!');
        }

        private configureComponents() {
            this.module.config(['$stateProvider', '$locationProvider', this.registerStates]);
        }

        constructor(private module: ng.IModule) {
            console.log('Creating');
            this.registerComponents();
            this.configureComponents();
            this.run();
        }

        run() {
            this.module.run(['$state', 'BingImageService', ($state: ng.ui.IStateService, BingImageService: BingGallery.Core.Services.BingImageService) => {
                $state.go('home');
                BingImageService.getImageFromCalendar();
            }]);
        }

        static bootstrap() {
            if (!(document && angular)) return;
            new App(module);

            angular.element(document).ready(() => {
                angular.bootstrap(document, ['BingGallery']);
            });
        }
    }
}