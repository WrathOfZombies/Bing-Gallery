'use strict';

import Interfaces = require('../core/interfaces');
import Enumerations = require('../core/enumerations');
import Utilities = require('../core/utilities');
import DownloadManager = require('../core/download.manager');


class ImageManager implements Interfaces.IImageManager {
    private downloadOrRetrieveImage(url: string, folder: Windows.Storage.StorageFolder, isThumbnail: boolean): ng.IPromise<Interfaces.IImageFile> {
        let deferred = this.$q.defer();
        let regex = new RegExp('^.+\/(.*)$', 'i');
        let matches = regex.exec(url);
        let filename = matches[1];

        folder
            .getFileAsync(filename)
            .then((file) => {
                deferred.resolve(<Interfaces.IImageFile>{
                    filename: file.name,
                    filepath: file.path
                });
            }, (error) => {
                this.downloadManager
                    .download(url)
                    .then((byteArray: Array<number>) => {
                        this.saveImage(filename, byteArray, isThumbnail)
                            .then((file) => {
                                deferred.resolve(file);
                            });
                    });

            });

        return deferred.promise;
    }

    constructor(private $q: ng.IQService, private downloadManager: DownloadManager) {
    }

    loadImage(url: string, resolution: Enumerations.Resolutions): ng.IPromise<Interfaces.IImageFile> {
        let isThumbnail: boolean = false;

        switch (resolution) {
            case Enumerations.Resolutions.High: url = url + '_1920x1080.jpg'; break;
            case Enumerations.Resolutions.Medium: url = url + '_1366X768.jpg'; break;
            case Enumerations.Resolutions.Low:
                url = url + '_800x480.jpg';
                isThumbnail = true;
                break;
        }

        let folder = isThumbnail ?
            Utilities.Windows.Storage.ApplicationData.current.temporaryFolder :
            Utilities.Windows.Storage.ApplicationData.current.localFolder;

        return this.downloadOrRetrieveImage(url, folder, isThumbnail);
    }

    saveImage(filename: string, byteArray: Array<number>, isThumbnail: boolean = false): ng.IPromise<Interfaces.IImageFile> {
        let deferred = this.$q.defer(),
            folder = isThumbnail ?
                Utilities.Windows.Storage.ApplicationData.current.temporaryFolder :
                Utilities.Windows.Storage.ApplicationData.current.localFolder,
            collision = Utilities.Windows.Storage.CreationCollisionOption.replaceExisting;

        folder.createFileAsync(filename, collision)
            .then((file) => {
                try {
                    let bytes = Utilities.Windows.Security.Cryptography.CryptographicBuffer.createFromByteArray(byteArray);
                    var data = Utilities.Windows.Security.Cryptography.CryptographicBuffer.encodeToBase64String(bytes);
                    return Utilities.Windows.Storage.FileIO.writeBufferAsync(file, bytes).then((success) => {
                        deferred.resolve(<Interfaces.IImageFile>{
                            filename: file.name,
                            filepath: file.path
                        })
                    });
                }
                catch (exception) { deferred.reject(exception); }
            });

        return deferred.promise;
    }

    setImageAsWallpaper(filename: string): ng.IPromise<boolean> {
        let deferred = this.$q.defer(),
            userpersonalizationsettings = Utilities.Windows.System.UserProfile.UserProfilePersonalizationSettings;

        if (userpersonalizationsettings.isSupported()) {
            Utilities.Windows.Storage.ApplicationData.current.localFolder
                .getFileAsync(filename)
                .then((file) => {
                    let tempName = file.name + '_temp';
                    return file.copyAsync(Utilities.Windows.Storage.ApplicationData.current.localFolder, tempName)
                        .then((copiedFile) => {
                            return file.deleteAsync(Windows.Storage.StorageDeleteOption.permanentDelete)
                                .then((success) => {
                                    copiedFile.renameAsync(filename)
                                        .then(() => {
                                            deferred.resolve(userpersonalizationsettings.current.trySetWallpaperImageAsync(copiedFile));
                                        });
                                });
                        });
                });
        }
        else {
            deferred.reject('Feature not supported');
        }

        return deferred.promise;
    }
}

export = ImageManager;