'use strict';

import {IImageManager, IImageFile} from '../../core/models/interfaces';
import {Resolutions} from '../../core/models/enumerations';
import {DownloadManager} from '../../services/downloader/download.manager';


class ImageManager implements IImageManager {
    constructor(private downloadManager: DownloadManager) {
    }

    private downloadOrRetrieveImage(url: string, folder: Windows.Storage.StorageFolder, isThumbnail: boolean): Promise<IImageFile> {
        let regex = new RegExp('^.+\/(.*)$', 'i'),
            matches = regex.exec(url),
            filename = matches[1];


        return new Promise<IImageFile>((resolve, reject) => {
            folder.getFileAsync(filename)
                .done((file: Windows.Storage.StorageFile) => {
                    resolve(<IImageFile>{
                        filename: file.name,
                        filepath: file.path
                    });
                }, (error) => { reject(error); });
        })
            .catch((error) => {
                return this.downloadManager
                    .download(url)
                    .then((byteArray: Uint8Array) => {
                        return this.saveImage(filename, byteArray, isThumbnail);
                    });
            });
    }

    loadImage(url: string, resolution: Resolutions): Promise<IImageFile> {
        let isThumbnail: boolean = false;

        switch (resolution) {
            case Resolutions.High: url = url + '_1920x1080.jpg'; break;
            case Resolutions.Medium: url = url + '_1366X768.jpg'; break;
            case Resolutions.Low:
                url = url + '_800x480.jpg';
                isThumbnail = true;
                break;
        }

        let folder = isThumbnail ?
            Windows.Storage.ApplicationData.current.temporaryFolder :
            Windows.Storage.ApplicationData.current.localFolder;

        return this.downloadOrRetrieveImage(url, folder, isThumbnail);
    }

    saveImage(filename: string, byteArray: Uint8Array, isThumbnail: boolean = false): Promise<IImageFile> {
        let folder = isThumbnail ?
            Windows.Storage.ApplicationData.current.temporaryFolder :
            Windows.Storage.ApplicationData.current.localFolder,

            collision = Windows.Storage.CreationCollisionOption.replaceExisting;

        return new Promise<Windows.Storage.StorageFile>((resolve, reject) => {
            folder.createFileAsync(filename, collision)
                .then((file: Windows.Storage.StorageFile) => {
                    let bytes = Windows.Security.Cryptography.CryptographicBuffer.createFromByteArray(byteArray),
                        data = Windows.Security.Cryptography.CryptographicBuffer.encodeToBase64String(bytes), ;

                    Windows.Storage.FileIO.writeBufferAsync(file, bytes).done(
                        () => { resolve(file) },
                        (error) => { reject(error) }
                    );
                });
        }).then((file: Windows.Storage.StorageFile) => {
            return <IImageFile>{
                filename: file.name,
                filepath: file.path
            };
        });
    }

    setImageAsWallpaper(filename: string): Promise<boolean> {
        let userProfile = <any>Windows.System.UserProfile;
        let userPersonaliztionSettings = userProfile.UserProfilePersonalizationSettings;

        return new Promise<boolean>((resolve, reject) => {
            if (userPersonaliztionSettings.isSupported()) {
                let originalFile = null,
                    copiedFile = null;

                Windows.Storage.ApplicationData.current.localFolder
                    .getFileAsync(filename)
                    .then((file) => {
                        originalFile = file;
                        let tempName = originalFile.name + '_temp';
                        return file.copyAsync(Windows.Storage.ApplicationData.current.localFolder, tempName);
                    })
                    .then((file) => {
                        copiedFile = file;
                        return originalFile.deleteAsync(Windows.Storage.StorageDeleteOption.permanentDelete);
                    })
                    .then((success) => {
                        return copiedFile.renameAsync(filename);
                    })
                    .done(() => { resolve(userPersonaliztionSettings.current.trySetWallpaperImageAsync(copiedFile)); },
                    (error) => { reject(error); });
            }
            else {
                reject('API not supported');
            }
        });
    }
}