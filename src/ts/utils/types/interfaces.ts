/// <reference path="../../../../_references.d.ts" />
/// <reference path="../../../../typings/tsd.d.ts" />

namespace BingGallery.Utils.Interfaces {
    export interface IEnumDictionary {
        [index: number]: string
    }

    export interface IBingImageResult {
        image: Array<IBingImage>;
    }

    export interface IBingImage {
        startDate: Date,
        endDate: Date,
        fullStartDate: Date,
        url: string,
        urlBase: string,
        copyright: string,
        copyrightLink: string,
        drk: number,
        top: number,
        bot: number,
        hotspots: Array<IBingImageHotspot>;
    }

    export interface IBingImageHotspot {
        desc: string,
        link: string,
        query: string,
        locX: number,
        locY: number
    }
}