'use strict';

import {IBingImage, IBingImageResult} from '../../core/models/interfaces';
import {RegionType} from '../../core/models/enumerations';
import {Utilities} from '../../core/helpers/utilities';


class BingService {
    constructor() {
    }

    private url: string = 'https://www.bing.com/HPImageArchive.aspx?format=js&n={count}&idx={page}&mkt={region}';

    private retrieveImageArray(response: ng.IHttpPromiseCallbackArg<IBingImageResult>): Array<IBingImage> {
        if (!(response && response.data)) return null;
        return response.data.images;
    }

    private requestFailed(error) {
        return null;
    }


    getImagesFromCalendar(
        count: number = 1,
        page: number = 0,
        region: RegionType = RegionType.UnitedStatesEN
    ) {
        if (count < 0 || page < 0) return null;

        let formattedUrl = this.url,
            flag = false;

        formattedUrl = formattedUrl.replace('{count}', count.toString());
        formattedUrl = formattedUrl.replace('{page}', page.toString());
        formattedUrl = formattedUrl.replace('{region}', Utilities.getRegion(region));

        if (flag) formattedUrl = 'app/services/data.json';

        let xhr = this.$http.get<IBingImageResult>(formattedUrl);
        return xhr.then(this.retrieveImageArray, this.requestFailed);
    }
}