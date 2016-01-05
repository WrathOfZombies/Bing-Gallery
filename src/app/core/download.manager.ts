'use strict';

class DownloadManager {
    constructor(private id: number, private params) { }

    downloadAsync() {
        let url: string = this.params.url;
        setTimeout(() => {
            this.downloadComplete({ file: 'bow bow ' + this.id.toString() });
        }, 1000);
    }

    downloadComplete(params) {
        try {
            postMessage(JSON.stringify(params), 'Worker ' + this.id.toString());
        }
        catch (exception) {
            console.error(exception);
        }
    }
}

onmessage = (e) => {
    console.log('Download request received from', e);
    if (!e.data) {
        postMessage('no params supplied. terminating worker', 'random');
        return;
    }
    let data = JSON.parse(e.data);
    let manager = new DownloadManager(data.id, data.params);
    manager.downloadAsync();
}