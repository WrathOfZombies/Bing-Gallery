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
            this.module.controller('gridListDemoCtrl', function ($scope) {
                this.tiles = buildGridModel({
                    icon: "avatar:svg-",
                    title: "Svg-",
                    background: ""
                });
                function buildGridModel(tileTmpl) {
                    var it, results = [];
                    for (var j = 0; j < 100; j++) {
                        it = angular.extend({}, tileTmpl);
                        it.icon = it.icon + (j + 1);
                        it.title = it.title + (j + 1);
                        it.span = { row: 1, col: 1 };

                        let me = j % 9;

                        switch (me + 1) {
                            case 1:
                                it.background = "red";
                                it.span.row = it.span.col = 2;
                                break;
                            case 2: it.background = "green"; break;
                            case 3: it.background = "darkBlue"; break;
                            case 4:
                                it.background = "blue";
                                it.span.col = 2;
                                break;
                            case 5:
                                it.background = "yellow";
                                it.span.row = it.span.col = 2;
                                break;
                            case 6: it.background = "pink"; break;
                            case 7: it.background = "darkBlue"; break;
                            case 8: it.background = "purple"; break;
                            case 9: it.background = "deepBlue"; break;
                            case 10: it.background = "lightPurple"; break;
                            case 11: it.background = "yellow"; break;
                        }
                        results.push(it);
                    }
                    return results;
                }
            });

            this.module.controller('AppCtrl', function () {
                this.items = [];
                for (var i = 0; i < 1000; i++) {
                    this.items.push(i);
                }
            });
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
                // BingImageService.getImageFromCalendar();
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