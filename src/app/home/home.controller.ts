'use strict';

import {BingImageService} from '../services/bing.service';
import {ImageManager} from '../services/bing.image';
import {IBingImage} from '../core/interfaces';

export class HomeController {
    tiles: Array<any> = [];

    constructor(private bingImageService: BingImageService) {
        bingImageService.getImagesFromCalendar(8).then((images) => { this.renderImages(images) });
    }

    renderImages(images: ImageManager) {
        let tiles = images.get();

        if (!this.tiles) {
            console.log('initializing');
            this.tiles = tiles;
            return;
        }

        tiles.forEach((tile) => {
            this.tiles.push(tile);
        });
    }

    setBackground(tile: IBingImage) {
        var url = 'https://www.bing.com' + tile.urlBase + '_1920x1080.jpg';

        if (window.hasOwnProperty('Windows')) {
            let windows = window['Windows'];
            let userPersonalizationSettings = windows.System.UserProfile.UserProfilePersonalizationSettings;
            if (userPersonalizationSettings.isSupported()) {
                //userPersonalizationSettings.current.trySetWallpaperImageAsync();
            }
        }
    }
}