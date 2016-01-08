'use strict';

import Enumerations = require('./enumerations');

module Interfaces {
    export interface IEnumDictionary<T> {
        [index: number]: T
    }

    export interface IBingImageResult {
        images: Array<IBingImage>
    }

    export interface IBingImage {
        startdate: Date,
        fullstartdate: Date,
        enddate: Date,
        url: string,
        urlbase: string,
        copyright: string,
        copyrightlink: string,
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

    export interface IDownloadTask {
        url: string,
        state?: Enumerations.DownloadWorkerStates
        deferred: ng.IDeferred<any>
    }

    export interface IImageManager {
        setImageAsWallpaper: (filename: string) => ng.IPromise<boolean>;
    }

    export interface IStorageManager {
        getThumbnail: (filename: string) => ng.IPromise<IImageFile>;
        saveThumbnail: (filename: string) => ng.IPromise<any>;
        clearThumbnails: () => ng.IPromise<boolean>;

        getWallpaper: (filename: string) => ng.IPromise<IImageFile>;
        saveWallpaper: (filename: string) => ng.IPromise<any>;    
        clearWallpapers: () => ng.IPromise<boolean>;
    }

    export interface IImageLoaderAttributes extends ng.IAttributes {
        imageLoader: string
    }

    export interface IImageFile {
        filename: string,
        filepath: string
    }
}

export = Interfaces;