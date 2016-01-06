/// <reference path="enumerations.ts" />
'use strict';

declare function postMessage(message: any): void;

class DownloadWorker {
    private xhr: XMLHttpRequest;

    constructor(private id: number) { }

    downloadAsync(url: string, method: string = 'GET') {
        this.xhr = new XMLHttpRequest();

        this.xhr.onload = (e: Event) => {
            try {
                postMessage({ state: 6, response: new Uint8Array(this.xhr.response) });
            }
            catch (exception) {
                postMessage({ state: 3, response: exception.message });
            }
        };

        this.xhr.onerror = (e: Event) => {
            postMessage({ state: 2, response: 'Request Failed' });
        };

        this.xhr.onprogress = (e: ProgressEvent) => {
            if (e.lengthComputable) {
                var percentComplete = e.loaded / e.total;
                postMessage({ state: 5, response: { total: e.total, loaded: e.loaded, percent: percentComplete } });
            } else {
                postMessage({ state: 4, response: '' });
            }
        }

        this.xhr.open(method, url, true);
        this.xhr.responseType = "arraybuffer";

        let regex = new RegExp('^.+?\.([a-z]*)$', 'i');
        let matches = regex.exec(url);
        if (matches && matches[1]) {
            if (matches[1] === 'jpg' || matches[1] === 'jpeg' || matches[1] === 'png') {
                this.xhr.setRequestHeader('Accept', 'image/' + matches[1]);
            }
        }

        this.xhr.send();
    }
}

onmessage = (e) => {
    if (!e.data) {
        postMessage({ state: 1, response: 'No parameters supplied' });
        return;
    }
    let manager = new DownloadWorker(e.data.id);
    manager.downloadAsync(e.data.url);
}