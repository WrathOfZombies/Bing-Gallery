/// <reference path="../../../../_references.d.ts" />
/// <reference path="../../../../typings/tsd.d.ts" />

namespace BingGallery.Core.Services {
	import utils = BingGallery.Utils;

	export class BingImageService {
		private url: string = 'https://www.bing.com/HPImageArchive.aspx?format=xml&n={count}&idx={page}&mkt={region}';

		private retrieveImage(response: ng.IHttpPromiseCallbackArg<any>): BingGallery.Core.Models.BingImage {
			if (!(response && response.data)) return null;
			console.log('Formatting data', response.data);
			return new BingGallery.Core.Models.BingImage(response.data);
		}

		private retrieveImageArray(response: ng.IHttpPromiseCallbackArg<Array<any>>): Array<BingGallery.Core.Models.BingImage> {
			if (!(response && response.data)) return null;
			return response.data.map(this.retrieveImage);
		}

		constructor(private $http: ng.IHttpService) { }

		getImageFromCalendar(
			count: number = 1,
			page: number = 0,
			region: utils.Enumerations.Regions = utils.Enumerations.Regions.UnitedStatesEN
		) {
			if (count < 0 || page < 0) return null;

			let formattedUrl = this.url;
			formattedUrl = formattedUrl.replace('{count}', count.toString());
			formattedUrl = formattedUrl.replace('{page}', page.toString());
			formattedUrl = formattedUrl.replace('{region}', utils.Constants.REGIONS[region]);

			let xhr = this.$http.get(formattedUrl);

			return count > 1 ? xhr.then(this.retrieveImageArray) : xhr.then(this.retrieveImage);
		}
	}
}