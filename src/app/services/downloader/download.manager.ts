'use strict';

import {IDownloadTask} from '../../core/models/interfaces';
import {DownloadWorkerStates} from '../../core/models/enumerations';
import {Utilities} from '../../core/helpers/utilities';

const MAXTHREADS = 10;

export class DownloadManager {    
    constructor() {
        this._timer = setInterval(() => { this.updateQueue(); }, 300);
    }

    private _timer;
    private static _threadId: number = 0;
    private _queue: Array<IDownloadTask> = [];
    private _active: Array<IDownloadTask> = [];

    private executetask(tasks: Array<IDownloadTask>) {
        _.each(tasks, (task, index) => {
            if (task.state !== DownloadWorkerStates.NotStarted) return;

            try {
                let worker = new Worker('app/core/download.worker.js');
                worker.postMessage({ id: DownloadManager._threadId++, url: task.url });
                worker.onmessage = (e) => {
                    switch (<DownloadWorkerStates>e.data.state) {
                        case DownloadWorkerStates.NoParametersSupplied:
                        case DownloadWorkerStates.RequestFailed:
                        case DownloadWorkerStates.ResponseInvalid:
                            task.promise.reject(e.data.response);
                            worker.terminate();
                            break;

                        case DownloadWorkerStates.IndeterminateProgress: break;
                        case DownloadWorkerStates.DeterminateProgress:
                            task.promise.notify(e.data.response);
                            break;

                        case DownloadWorkerStates.Success:
                            task.promise.resolve(e.data.response);
                            worker.terminate();
                            break;
                    }
                };
                task.state = DownloadWorkerStates.Started;
                this._active.splice(index, 1);
            }
            catch (exception) {
                task.state = DownloadWorkerStates.RequestFailed
                task.promise.reject(exception);
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

    download(url: string): Promise<any> {
        let task: IDownloadTask = {
            url: url,            
        };

        task.promise = new Promise();

        task.state = DownloadWorkerStates.NotStarted;
        this._queue.push(task);
        return task.promise.promise;
    }
}