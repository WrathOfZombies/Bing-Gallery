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
            this.module.controller('TileController', ['BingImageService', class TileController {
                tiles: Array<any> = [];

                constructor(private bingImageService: BingGallery.Core.Services.BingImageService) {

                    for (let i = 7, n; n = i + 1, i < 500; i += 7) {
                        bingImageService.getImagesFromCalendar(i, n).then((images) => { this.renderImages(images) });
                    }
                }

                renderImages(images: Core.Models.ImageManager) {
                    let tiles = images.get();

                    if (!this.tiles) {
                        console.log('initializing');
                        this.tiles = tiles;
                        return;
                    }

                    tiles.forEach((tile) => {
                        console.log(tile);
                        this.tiles.push(tile);
                    });
                }

                setBackground(tile: Utils.Interfaces.IBingImage) {
                    var url = 'https://www.bing.com' + tile.urlBase + '_1920x1080.jpg';

                    if (window.hasOwnProperty('Windows')) {
                        let windows = window['Windows'];
                        let userPersonalizationSettings = windows.System.UserProfile.UserProfilePersonalizationSettings;
                        if (userPersonalizationSettings.isSupported()) {
                            //userPersonalizationSettings.current.trySetWallpaperImageAsync();
                        }
                    }
                }
            }]);

            this.module.directive('backImage', function () {
                return function (scope, element, attrs) {
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
                controller: 'TileController',
                controllerAs: 'tileCtrl'
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