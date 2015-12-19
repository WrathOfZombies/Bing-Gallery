module BingGallery.Core.Controllers {
    import types = BingGallery.Types;

    export class HomeController {
        tiles: Array<any> = [];

        constructor(private bingImageService: BingGallery.Core.Services.BingImageService) {
            bingImageService.getImagesFromCalendar(8).then((images) => { this.renderImages(images) });
        }

        renderImages(images: Core.Models.ImageManager) {
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

        setBackground(tile: types.Interfaces.IBingImage) {
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
