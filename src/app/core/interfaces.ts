'use strict';

module Interfaces {
    export interface IEnumDictionary<T> {
        [index: number]: T
    }

    export interface IBingImageResult {
        images: Array<IBingImage>
    }

    export interface IBingImage {
        startDate: Date,
        fullStartDate: Date,
        endDate: Date,
        url: string,
        urlBase: string,
        copyright: string,
        copyrightLink: string,
        wp: boolean,
        hsh: string,
        drk: number,
        top: number,
        bot: number,
        hs: Array<IImageHotspot>;
    }

    export interface IImageHotspot {
        desc: string,
        link: string,
        query: string,
        locX: number,
        locY: number
    }

    export interface IImageDownloader {
    }

    export interface IBackgroundWorker {
    }

    export interface IImageLoaderAttributes extends ng.IAttributes {
        imageLoader: string
    }
}

export = Interfaces;