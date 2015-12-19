module BingGallery.Core.Models {
	import types = BingGallery.Types;

	export class ImageManager {
		private images: types.Interfaces.IBingImageResult;

		private parseXML(data: string): types.Interfaces.IBingImageResult {
			let parser = new DOMParser();
			let xml = parser.parseFromString(data, 'application/xml');
			return this.xml2json<{ images: types.Interfaces.IBingImageResult }>(xml).images;
		}

		constructor(data: string) {
			this.images = this.parseXML(data);
		}

		get(): Array<types.Interfaces.IBingImage> {
			return this.images.image;
		}

		private xml2json<T>(node: Element | Document): T {
			try {
				var data = {};

				// append a value
				function Add(name, value) {
					if (data[name]) {
						if (data[name].constructor != Array) {
							data[name] = [data[name]];
						}
						data[name][data[name].length] = value;
					}
					else {
						data[name] = value;
					}
				};

				// element attributes
				var c, cn;

				// child elements
				for (c = 0; cn = node.childNodes[c]; c++) {
					if (cn.nodeType == 1) {
						if (cn.childNodes.length == 1 && cn.firstChild.nodeType == 3) {
							// text value
							Add(cn.nodeName, cn.firstChild.nodeValue);
						}
						else {
							// sub-object
							Add(cn.nodeName, this.xml2json(cn));
						}
					}
				}

				return <T>data;
			} catch (e) {
				console.log(e.message);
			}
		}
	}
}
