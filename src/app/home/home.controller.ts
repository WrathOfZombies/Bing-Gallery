'use strict';

import Interfaces = require('../core/interfaces');
import Utilities = require('../core/utilities');
import Enumerations = require('../core/enumerations');
import BackgroundLoader = require('../core/download.manager');
import BingImageService = require('../services/bing.service');

class HomeController {
    private renderImages(images: Array<Interfaces.IBingImage>) {
        if (!this.images) {
            this.images = images;
            return;
        }

        images.forEach((image) => {
            this.images.push(image);
        });
    }

    constructor(private BingImageService: BingImageService, private ImageManager: Interfaces.IImageManager) {
        this.BingImageService
            .getImagesFromCalendar(8, 15)
            .then((images) => {
                this.renderImages(images)
            });
    }

    images: Array<Interfaces.IBingImage> = null;

    setBackground(image: Interfaces.IBingImage) {
        var url = 'https://www.bing.com' + image.urlbase;
        this.ImageManager
            .downloadImage(url, Enumerations.Resolutions.High)
            .then((result) => {
                return this.ImageManager.setImageAsWallpaper(result.filename);
            });
    }
}

export = HomeController;