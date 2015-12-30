'use strict';
import Interfaces = require('../../core/interfaces');

class ImageLoader {
    link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: Interfaces.IImageLoaderAttributes) {
        var url = attrs.imageLoader;
        element.css({
            'background-image': 'url(' + url + ')',
            'background-size': 'cover'
        });
    };
}

export = ImageLoader;