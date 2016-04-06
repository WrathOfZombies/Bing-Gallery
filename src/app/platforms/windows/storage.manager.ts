'use strict';

import {IStorageManager, IImageFile} from '../../core/models/interfaces';

class StorageManager implements IStorageManager {
    getThumbnail: (filename: string) => Promise<IImageFile>;
    saveThumbnail: (filename: string) => Promise<any>;
    clearThumbnails: () => Promise<boolean>;
    getWallpaper: (filename: string) => Promise<IImageFile>;
    saveWallpaper: (filename: string) => Promise<any>;
    clearWallpapers: () => Promise<boolean>;
}