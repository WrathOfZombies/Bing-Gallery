'use strict';

import {Regions} from '../core/enumerations';
import {REGIONS} from '../core/constants';
import {ImageManager} from './bing.image';

export class BingImageService {
    private url: string = 'https://www.bing.com/HPImageArchive.aspx?format=xml&n={count}&idx={page}&mkt={region}';

    private retrieveImageArray(response: ng.IHttpPromiseCallbackArg<any>): ImageManager {
        if (!(response && response.data)) return null;
        return new ImageManager(response.data);
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

        if (true) formattedUrl = '/www/app/services/data.xml';

        let xhr = this.$http.get(formattedUrl);
        return xhr.then(this.retrieveImageArray);
    }
}