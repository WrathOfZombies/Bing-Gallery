'use strict';

import Interfaces = require('../core/interfaces');
import Enumerations = require('../core/enumerations');
import Utilities = require('../core/utilities');


class BingImageService {
    private url: string = 'https://www.bing.com/HPImageArchive.aspx?format=js&n={count}&idx={page}&mkt={region}';

    private retrieveImageArray(response: ng.IHttpPromiseCallbackArg<Interfaces.IBingImageResult>): Array<Interfaces.IBingImage> {
        if (!(response && response.data)) return null;
        return response.data.images;
    }

    constructor(private $http: ng.IHttpService) { }

    getImagesFromCalendar(
        count: number = 1,
        page: number = 0,
        region: Enumerations.RegionType = Enumerations.RegionType.UnitedStatesEN
    ) {
        if (count < 0 || page < 0) return null;

        let formattedUrl = this.url;
        formattedUrl = formattedUrl.replace('{count}', count.toString());
        formattedUrl = formattedUrl.replace('{page}', page.toString());
        formattedUrl = formattedUrl.replace('{region}', Utilities.getRegion(region));

        if (false) formattedUrl = 'app/services/data.json';

        let xhr = this.$http.get<Interfaces.IBingImageResult>(formattedUrl);
        return xhr.then(this.retrieveImageArray);
    }
}

export = BingImageService;