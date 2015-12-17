/// <reference path="../../../../_references.d.ts" />
/// <reference path="../../../../typings/tsd.d.ts" />

namespace BingGallery.Core.Models {
	import utils = BingGallery.Utils;

	export class BingImage {
		private imageMetadata: utils.Interfaces.IBingImageResult;
		private image: any;

		constructor(data: any) {
			console.log(data);
		}
	}
}