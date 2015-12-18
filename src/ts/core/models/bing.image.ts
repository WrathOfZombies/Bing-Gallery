/// <reference path="../../../../_references.d.ts" />
/// <reference path="../../../../typings/tsd.d.ts" />

namespace BingGallery.Core.Models {
    import utils = BingGallery.Utils;

    export class ImageManager {
        private images: utils.Interfaces.IBingImageResult;

        private parseXML(data: string): utils.Interfaces.IBingImageResult {
            let parser = new DOMParser();
            let xml = parser.parseFromString(data, 'text/xml');
            return this.xml2json<{ images: utils.Interfaces.IBingImageResult }>(xml).images;
        }

        constructor(data: string) {
            this.images = this.parseXML(data);
        }

        get(): Array<utils.Interfaces.IBingImage> {
            return this.images.image;
        }

        private xml2json<T>(xml): T {
            try {
                let obj = {};
                if (xml.children.length > 0) {
                    for (var i = 0; i < xml.children.length; i++) {
                        var item = xml.children.item(i);
                        var nodeName = item.nodeName;

                        if (typeof (obj[nodeName]) == "undefined") {
                            obj[nodeName] = this.xml2json(item);
                        } else {
                            if (typeof (obj[nodeName].push) == "undefined") {
                                var old = obj[nodeName];

                                obj[nodeName] = [];
                                obj[nodeName].push(old);
                            }
                            obj[nodeName].push(this.xml2json(item));
                        }
                    }
                } else {
                    obj = xml.textContent;
                }
                return <T>obj;
            } catch (e) {
                console.log(e.message);
            }
        }
    }
}