'use strict';

import Interfaces = require('./interfaces');
import Enumerations = require('./enumerations');
import Utilities = require('./utilities');


class BackgroundLoader {
    constructor(private $q: ng.IQService) {

    }

    downloadImage(url: string) {
        var deferred = this.$q.defer();
        try {
            let worker = new Worker('app/core/download.manager.js');
            worker.postMessage(JSON.stringify({ id: 0, params: { url: url } }));
            worker.onmessage = (e) => {
                console.log('Thread resolved!');
                let data = JSON.parse(e.data);                
                deferred.resolve(data);
            };
        }
        catch (exception) {
            deferred.reject(exception);
        }
        return deferred.promise;
        //if (Utilities.isWindows()) {
        //    let uri = new Utilities.Windows.Foundation.Uri(url);
        //    let fileName = '';

        //    let file = Utilities.Windows.Storage.KnownFolders.getFolderForUserAsync(null, Utilities.Windows.Storage.KnownFolderId.picturesLibrary)
        //        .then(function (picturesLibrary) {
        //            return picturesLibrary.createFileAsync(fileName, Utilities.Windows.Storage.CreationCollisionOption.replaceExisting);
        //        });                

        //    let backgroundDownloader = new Utilities.Windows.Networking.BackgroundTransfer.BackgroundDownloader();
        //    let downloadOperation = backgroundDownloader.createDownload(uri, file);
        //}
    }
}

export = BackgroundLoader;