'use strict';

import Interfaces = require('../core/interfaces');
import Enumerations = require('../core/enumerations');
import Utilities = require('../core/utilities');


class WindowsImageManager implements Interfaces.IImageManager {
    downloadImage(url: string): ng.IPromise<string> {
        return null;    
    }

    saveImage(filename: string): ng.IPromise<string> {
        return null;
    }

    setImageAsWallpaper(filename: string): ng.IPromise<boolean> {
        return null;
    }
}

export = WindowsImageManager;