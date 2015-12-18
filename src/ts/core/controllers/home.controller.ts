/// <reference path="../../../../_references.d.ts" />
/// <reference path="../../../../typings/tsd.d.ts" />

namespace BingGallery.Core.Controllers {
    export class HomeController {
        tiles: Array<any> = [];

        constructor(private bingImageService: BingGallery.Core.Services.BingImageService) {
            for (let i = 7, n; n = i + 1, i < 500; i += 7) {
                bingImageService.getImagesFromCalendar(i, n).then((images) => { this.renderImages(images) });
            }
        }

        renderImages(images: Core.Models.ImageManager) {
            let tiles = images.get();

            if (!this.tiles) {
                console.log('initializing');
                this.tiles = tiles;
                return;
            }

            tiles.forEach((tile) => {
                console.log(tile);
                this.tiles.push(tile);
            });
        }

        setBackground(tile: Utils.Interfaces.IBingImage) {
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
}