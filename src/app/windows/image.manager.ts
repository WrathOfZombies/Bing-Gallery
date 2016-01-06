'use strict';

import Interfaces = require('../core/interfaces');
import Enumerations = require('../core/enumerations');
import Utilities = require('../core/utilities');
import DownloadManager = require('../core/download.manager');


class ImageManager implements Interfaces.IImageManager {
    constructor(private $q: ng.IQService, private downloadManager: DownloadManager) {
    }

    downloadImage(url: string, resolution: Enumerations.Resolutions): ng.IPromise<string> {
        let isCache: boolean = false;
        switch (resolution) {
            case Enumerations.Resolutions.High: url = url + '_1920x1080.jpg'; break;
            case Enumerations.Resolutions.Medium: url = url + '_1366X768.jpg'; break;
            case Enumerations.Resolutions.Low:
                url = url + '_800x480.jpg';
                isCache = true;
                break;
        }

        return this.downloadManager.download(url)
            .then((byteArray: Array<number>) => {
                let regex = new RegExp('^.+\/(.*)$', 'i');
                let matches = regex.exec(url);
                return this.saveImage(matches[1], byteArray, isCache);
            });
    }

    saveImage(filename: string, byteArray: Array<number>, temporary: boolean = false): ng.IPromise<string> {
        let deferred = this.$q.defer(),
            folder = null;

        if (temporary) {
            folder = Utilities.Windows.Storage.ApplicationData.current.localCacheFolder;
        }
        else {
            folder = Utilities.Windows.Storage.KnownFolders.picturesLibrary;
        }

        folder.createFileAsync(filename, Utilities.Windows.Storage.CreationCollisionOption.generateUniqueName)
            .then((file) => {
                try {
                    let bytes = Utilities.Windows.Security.Cryptography.CryptographicBuffer.createFromByteArray(byteArray);
                    var data = Utilities.Windows.Security.Cryptography.CryptographicBuffer.encodeToBase64String(bytes);

                    Utilities.Windows.Storage.FileIO.writeBufferAsync(file, bytes)
                        .then(() => { deferred.resolve(file.name); },
                        (error) => { deferred.reject(error); });
                }
                catch (exception) { deferred.reject(exception); }
            }, (error) => { deferred.reject(error); });

        return deferred.promise;
    }

    setImageAsWallpaper(filename: string): ng.IPromise<boolean> {
        let deferred = this.$q.defer(),
            userpersonalizationsettings = Utilities.Windows.System.UserProfile.UserProfilePersonalizationSettings;

        if (userpersonalizationsettings.isSupported()) {
            Utilities.Windows.Storage.KnownFolders.picturesLibrary.getFileAsync(filename)
                .then((file) => {
                    userpersonalizationsettings.current.trySetWallpaperImageAsync(file)
                        .then((success) => { deferred.resolve(true); },
                        (error) => { deferred.reject(false); });
                },
                (error) => {
                    deferred.reject(error);
                });
        }
        else {
            deferred.reject('Feature not supported');
        }

        return deferred.promise;
    }
}

export = ImageManager;