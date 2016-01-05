'use strict';

import Interfaces = require('../core/interfaces');
import Utilities = require('../core/utilities');
import BackgroundLoader = require('../core/background.loader');
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

    constructor(private bingImageService: BingImageService, private BackgroundLoaderService: BackgroundLoader) {
        bingImageService.getImagesFromCalendar(8, 15).then((images) => { this.renderImages(images) });
    }

    images: Array<Interfaces.IBingImage> = null;

    setBackground(image: Interfaces.IBingImage) {
        var url = 'https://www.bing.com' + image.urlBase + '_1920x1080.jpg';

        this.BackgroundLoaderService.downloadImage(url).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });

        //if (Utilities.isWindows()) {
        //    let windows = window['Windows'];
        //    let userPersonalizationSettings = windows.System.UserProfile.UserProfilePersonalizationSettings;
        //    if (userPersonalizationSettings.isSupported()) {
        //        //userPersonalizationSettings.current.trySetWallpaperImageAsync();
        //    }
        //}        
    }
}

export = HomeController;