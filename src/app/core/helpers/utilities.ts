'use strict';

import {Regions} from '../models/constants';
import {ContextTypes, RegionType} from '../models/enumerations';

export class Utilities {
    private static _context: ContextTypes;
    private static _isInitialized: boolean = false;

    public static get context(): ContextTypes {
        if (!this._isInitialized) {
            let isCordova =
                document.URL.indexOf('http://') === -1 &&
                document.URL.indexOf('https://') === -1,

                isWindows = _.has(window, 'Windows');

            if (isCordova && !isWindows) {
                this._context = ContextTypes.Cordova;
            }
            else if (isWindows) {
                this._context = ContextTypes.Windows;
            }
            else {
                this._context = ContextTypes.Web;
            }

            this._isInitialized = true;
        }

        return this._context;
    }

    public static get Context(): string {
        if (Utilities.isWindows) return 'windows';
        else if (Utilities.isCordova) return 'cordova';
        else if (Utilities.isWeb) return 'web';
    }

    public static get Windows(): typeof Windows {
        return window['Windows'];
    }

    public static getRegion(region: RegionType): string {
        return Regions[region];
    }

    public static get isWindows() {
        return this._context === ContextTypes.Windows;
    }

    public static get isCordova() {
        return this._context === ContextTypes.Cordova;
    }

    public static get isWeb() {
        return this._context === ContextTypes.Web;
    }

    public static getComponentTemplateUri(component: string): string {
        return 'app/components/' + component + '/' + component + '.template.html';
    }

    public static getComponentStyleUri(component: string): string {
        return 'app/components/' + component + '/' + component + '.styles.css';
    }    
}