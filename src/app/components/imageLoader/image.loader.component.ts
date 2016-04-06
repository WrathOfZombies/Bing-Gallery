'use strict';
import Interfaces = require('../../core/interfaces');
import Enumerations = require('../../core/enumerations');

class ImageLoader {

    constructor(private ImageManager: Interfaces.IImageManager) { }

    get directive(): ng.IDirective {
        return {
            link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: Interfaces.IImageLoaderAttributes) => {
                let url = attrs.imageLoader;
                this.ImageManager.downloadImage(url, Enumerations.Resolutions.Low)
                    .then((result) => { element.css({ 'background-image': 'url(ms-appdata:///temp/' + result.filename + ')' }); });
            }
        }
    }
}

export = ImageLoader;