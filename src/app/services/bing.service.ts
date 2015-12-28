'use strict';

import {Regions} from '../core/enumerations';
import {REGIONS} from '../core/constants';
import {IBingImage} from '../core/interfaces';

export class BingImageService {
    private url: string = 'https://www.bing.com/HPImageArchive.aspx?format=js&n={count}&idx={page}&mkt={region}';

    private retrieveImageArray(response: ng.IHttpPromiseCallbackArg<any>): Array<IBingImage> {
        if (!(response && response.data)) return null;
        return response.data.images;
    }

    constructor(private $http: ng.IHttpService) { }

    getImagesFromCalendar(
        count: number = 1,
        page: number = 0,
        region: Regions = Regions.UnitedStatesEN
    ) {
        if (count < 0 || page < 0) return null;

        let formattedUrl = this.url;
        formattedUrl = formattedUrl.replace('{count}', count.toString());
        formattedUrl = formattedUrl.replace('{page}', page.toString());
        formattedUrl = formattedUrl.replace('{region}', REGIONS[region]);

        if (true) formattedUrl = 'app/services/data.json';

        let xhr = this.$http.get(formattedUrl);
        return xhr.then(this.retrieveImageArray);
    }
}