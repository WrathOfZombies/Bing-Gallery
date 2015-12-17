/// <reference path="../../_references.d.ts" />
/// <reference path="../../typings/tsd.d.ts" />

/**
 * Creates a namespace for all the functional logic to fall within a closure. 
 */
namespace BingGallery.Core {

	/**
	* Helper to find html template paths. Can be invoked using BingGallery.resolvePath()
	*/
	export function resolvePath(path: string): string {
		return 'templates/' + path + '.html';
	}

	/**
	 * Angular module construction. Resuse this throught your app if necessary, although the 
	 * module class below should perform all your registrations in one place. Opinionated 
	 * thought that its better that way.
	 */
	export let module = angular.module('BingGallery', ['ngAnimate', 'ngMaterial', 'ui.router']);

	/**
	 * Module class that manages bootstrapping and module registration and configuration.
	 */
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
			this.registerComponents();
			this.configureComponents();
		}

		run(params: Array<any>) { this.module.run(params); }
	}

	new App(module).run(['$state', 'BingImageService', ($state: ng.ui.IStateService, BingImageService: BingGallery.Core.Services.BingImageService) => {
		$state.go('home');
		console.log(BingImageService);
		BingImageService.getImageFromCalendar();
	}]);
}