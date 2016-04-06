'use strict';

import {DownloadWorkerStates} from './enumerations';

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
    state?: DownloadWorkerStates
    promise: Promise<any>
}

export interface IStorageManager {
    getThumbnail: (filename: string) => Promise<IImageFile>;
    saveThumbnail: (filename: string) => Promise<any>;
    clearThumbnails: () => Promise<boolean>;
    getWallpaper: (filename: string) => Promise<IImageFile>;
    saveWallpaper: (filename: string) => Promise<any>;
    clearWallpapers: () => Promise<boolean>;
}

export interface IImageManager {
    setImageAsWallpaper: (filename: string) => Promise<boolean>;
}

export interface IImageLoaderAttributes {
    imageLoader: string
}

export interface IImageFile {
    filename: string,
    filepath: string
}