'use strict';

export interface IEnumDictionary {
    [index: number]: string
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
    hs: Array<IBingImageHotspot>;
}

export interface IBingImageHotspot {
    desc: string,
    link: string,
    query: string,
    locX: number,
    locY: number
}