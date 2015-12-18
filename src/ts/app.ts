/// <reference path="../../_references.d.ts" />
/// <reference path="../../typings/tsd.d.ts" />

namespace BingGallery.Core {
    export function resolvePath(path: string): string {
        return '/www/templates/' + path + '.html';
    }

    export let module = angular.module('BingGallery', ['ngAnimate', 'ngMaterial', 'ui.router']);

    class App {
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
                console.log(BingImageService);
                BingImageService.getImageFromCalendar();
            }]);
        }
    }

    function bootstrap() {
        if (!(document && angular)) return;

        new App(module);

        angular.element(document).ready(() => {
            console.log('Bootstrapping');
            angular.bootstrap(document, ['BingGallery']);
        });
    }

    export function startApplication() {
        var context = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
        var windowsMode = window.hasOwnProperty('Windows');
        if (context && !windowsMode) {
            console.log('cordova mode: waiting for device');
            document.addEventListener('deviceready', () => {
                console.log('device ready');
                bootstrap();
            }, false);
        }

        if (windowsMode) {
            console.log('windows mode: waiting for device');
        }
        else {
            console.log('web mode: waiting for browser');
        }
        bootstrap();
    }
}

BingGallery.Core.startApplication();