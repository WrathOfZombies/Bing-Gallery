module BingGallery.Core.Services {
    import types = BingGallery.Types;
    import consts = BingGallery.Constants;

    export class BingImageService {
        private url: string = 'https://www.bing.com/HPImageArchive.aspx?format=xml&n={count}&idx={page}&mkt={region}';

        private retrieveImageArray(response: ng.IHttpPromiseCallbackArg<any>): BingGallery.Core.Models.ImageManager {
            if (!(response && response.data)) return null;
            return new BingGallery.Core.Models.ImageManager(response.data);
        }

        constructor(private $http: ng.IHttpService) { }

        getImagesFromCalendar(
            count: number = 1,
            page: number = 0,
            region: types.Enumerations.Regions = types.Enumerations.Regions.UnitedStatesEN
        ) {
            if (count < 0 || page < 0) return null;

            let formattedUrl = this.url;
            formattedUrl = formattedUrl.replace('{count}', count.toString());
            formattedUrl = formattedUrl.replace('{page}', page.toString());
            formattedUrl = formattedUrl.replace('{region}', consts.REGIONS[region]);

            // if (false) formattedUrl = '/www/cache/data.xml';

            let xhr = this.$http.get(formattedUrl);
            return xhr.then(this.retrieveImageArray);
        }
    }
}
