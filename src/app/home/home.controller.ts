'use strict';

import {BingImageService} from '../services/bing.service';
import {IBingImage} from '../core/interfaces';

export class HomeController {
    images: Array<IBingImage> = null;

    constructor(private bingImageService: BingImageService) {
        bingImageService.getImagesFromCalendar(8, 20).then((images) => { this.renderImages(images) });
    }

    renderImages(images: Array<IBingImage>) {        
        if (!this.images) {
            this.images = images;
            return;
        }

        images.forEach((image) => {
            this.images.push(image);
        });
    }

    setBackground(image: IBingImage) {
        var url = 'https://www.bing.com' + image.urlBase + '_1920x1080.jpg';

        if (window.hasOwnProperty('Windows')) {
            let windows = window['Windows'];
            let userPersonalizationSettings = windows.System.UserProfile.UserProfilePersonalizationSettings;
            if (userPersonalizationSettings.isSupported()) {
                //userPersonalizationSettings.current.trySetWallpaperImageAsync();
            }
        }
    }
}