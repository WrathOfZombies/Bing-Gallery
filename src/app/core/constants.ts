'use strict';

import Interfaces = require('./interfaces');
import Enumerations = require('./enumerations');

class Constants {
    private static _context: Enumerations.ContextTypes;
    private static isInitialized: boolean = false;

    public static get context(): Enumerations.ContextTypes {
        if (!this.isInitialized) {
            let isCordova = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1,
                isWindows = window.hasOwnProperty('Windows');

            if (isCordova && !isWindows) {
                Constants.context = Enumerations.ContextTypes.Cordova;
            }
            else if (isWindows) {
                Constants.context = Enumerations.ContextTypes.Windows;
            }
            else {
                Constants.context = Enumerations.ContextTypes.Web;
            }

            Constants.isInitialized = true;
        }

        return this._context;
    }

    public static set context(value: Enumerations.ContextTypes) {
        if (this.isInitialized) throw 'Cannot initialize context again.';
        this._context = value;            
    }    

    public static regions: Interfaces.IEnumDictionary<string> = {
        0: 'ar-XA',
        1: 'bg-BG',
        2: 'cs-CZ',
        3: 'da-DK',
        4: 'de-AT',
        5: 'de-CH',
        6: 'de-DE',
        7: 'el-GR',
        8: 'en-AU',
        9: 'en-CA',
        10: 'en-GB',
        11: 'en-ID',
        12: 'en-IE',
        13: 'en-IN',
        14: 'en-MY',
        15: 'en-NZ',
        16: 'en-PH',
        17: 'en-SG',
        18: 'en-US',
        19: 'en-XA',
        20: 'en-ZA',
        21: 'es-AR',
        22: 'es-CL',
        23: 'es-ES',
        24: 'es-MX',
        25: 'es-US',
        26: 'es-XL',
        27: 'et-EE',
        28: 'fi-FI',
        29: 'fr-BE',
        30: 'fr-CA',
        31: 'fr-CH',
        32: 'fr-FR',
        33: 'he-IL',
        34: 'hr-HR',
        35: 'hu-HU',
        36: 'it-IT',
        37: 'ja-JP',
        38: 'ko-KR',
        39: 'lt-LT',
        40: 'lv-LV',
        41: 'nb-NO',
        42: 'nl-BE',
        43: 'nl-NL',
        44: 'pl-PL',
        45: 'pt-BR',
        46: 'pt-PT',
        47: 'ro-RO',
        48: 'ru-RU',
        49: 'sk-SK',
        50: 'sl-SL',
        51: 'sv-SE',
        52: 'th-TH',
        53: 'tr-TR',
        54: 'uk-UA',
        55: 'zh-CN',
        56: 'zh-HK',
        57: 'zh-TW'
    };
}

export = Constants;