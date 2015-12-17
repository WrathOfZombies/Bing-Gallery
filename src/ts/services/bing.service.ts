/// <reference path="../../../_references.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

namespace BingGallery.Core.Services {
	export enum Markets {
		Arabic
	}
	
	export class BingImageService {
		private url: string = 'http://www.bing.com/HPImageArchive.aspx?format=json&n={count}&idx={page}&mkt={market}';
		
		constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
			 
		}	
		
		getCurrentImages(count: number, page: number) {
				
		}	
		
		getGalleryImages() {
			
		}
	}
}