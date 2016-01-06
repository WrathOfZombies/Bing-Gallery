'use strict';

import Interfaces = require('./interfaces');
import Enumerations = require('./enumerations');
import Utilities = require('./utilities');

const MAXTHREADS = 10;

class DownloadManager {
    private static _threadId: number = 0;
    private _queue: Array<Interfaces.IDownloadTask> = [];
    private _active: Array<Interfaces.IDownloadTask> = [];

    private executetask(tasks: Array<Interfaces.IDownloadTask>) {
        _.each(tasks, (task, index) => {
            if (task.state !== Enumerations.DownloadWorkerStates.NotStarted) return;

            try {
                let worker = new Worker('app/core/download.worker.js');
                worker.postMessage({ id: DownloadManager._threadId++, url: task.url });
                worker.onmessage = (e) => {
                    switch (<Enumerations.DownloadWorkerStates>e.data.state) {
                        case Enumerations.DownloadWorkerStates.NoParametersSupplied:
                        case Enumerations.DownloadWorkerStates.RequestFailed:
                        case Enumerations.DownloadWorkerStates.ResponseInvalid:
                            task.deferred.reject(e.data.response);
                            worker.terminate();
                            break;

                        case Enumerations.DownloadWorkerStates.IndeterminateProgress: break;
                        case Enumerations.DownloadWorkerStates.DeterminateProgress:
                            task.deferred.notify(e.data.response);
                            break;

                        case Enumerations.DownloadWorkerStates.Success:
                            task.deferred.resolve(e.data.response);
                            worker.terminate();
                            break;
                    }
                };
                task.state = Enumerations.DownloadWorkerStates.Started;
                this._active.splice(index, 1);
            }
            catch (exception) {
                task.state = Enumerations.DownloadWorkerStates.RequestFailed
                task.deferred.reject(exception);
                this._active.splice(index, 1);
                console.error(exception);
            }
        });
    }

    private updateQueue() {
        try {
            if (!(this._queue.length > 0)) return;

            if (this._active.length < MAXTHREADS) {
                let numberOfTaskSlots = MAXTHREADS - this._active.length;


                if (!(numberOfTaskSlots > 0)) return;

                let tasks = _.first(this._queue.splice(0, numberOfTaskSlots), numberOfTaskSlots);
                this._active = _.union(this._active, tasks);
                this.executetask(tasks);
            }
        }
        catch (exception) {
            console.error(exception);
        }
    }

    constructor(private $q: ng.IQService, private $interval: ng.IIntervalService) {
        this.$interval(() => { this.updateQueue(); }, 300);
    }

    download(url: string): ng.IPromise<any> {
        let task: Interfaces.IDownloadTask = {
            url: url,
            deferred: this.$q.defer<string>()
        };

        task.state = Enumerations.DownloadWorkerStates.NotStarted;
        this._queue.push(task);
        return task.deferred.promise;
    }
}

export = DownloadManager;