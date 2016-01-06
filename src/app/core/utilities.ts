'use strict';

import Constants = require('./constants');
import Enumerations = require('./enumerations');

class Utilities {
    public static get Context(): string {
        if (Utilities.isWindows) return 'windows';
        else if (Utilities.isCordova) return 'cordova';
        else if (Utilities.isWeb) return 'web';
    }

    public static get Windows(): typeof Windows {
        return window["Windows"];
    }

    public static getRegion(region: Enumerations.RegionType): string {
        return Constants.regions[region];
    }

    public static get isWindows() {
        return Constants.context === Enumerations.ContextTypes.Windows;
    }

    public static get isCordova() {
        return Constants.context === Enumerations.ContextTypes.Cordova;
    }

    public static get isWeb() {
        return Constants.context === Enumerations.ContextTypes.Web;
    }

    public static getViewTemplate(view: string): string {
        return 'app/' + view + '/' + view + '.html';
    }

    public static getDirectiveTemplate(directive: string): string {
        return 'app/components/' + directive + '/' + 'template.html';
    }

    public static getStateDefinition(stateName: string, hasController: boolean = true): ng.ui.IState {
        return <ng.ui.IState>{
            name: stateName,
            templateUrl: this.getViewTemplate(stateName.toLowerCase()),
            controller: hasController ? (stateName + 'Controller') : null,
            controllerAs: hasController ? stateName.toLowerCase() : null
        };
    }
}

export = Utilities;