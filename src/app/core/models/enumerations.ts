'use strict';

export enum ContextTypes {
    Web,
    Windows,
    Cordova
}

export enum RegionType {
    Arabia,
    Bulgaria,
    CzechRepublic,
    Denmark,
    Austria,
    Switzerland,
    Germany,
    Greece,
    Australia,
    CanadaEN,
    UnitedKingdom,
    Indonesia,
    Ireland,
    India,
    Malaysia,
    NewZealand,
    Philippines,
    Singapore,
    UnitedStatesEN,
    ArabiaEN,
    SouthAfrica,
    Argentina,
    Chile,
    Spain,
    Mexico,
    UnitedStates,
    LatinAmerica,
    Estonia,
    Finland,
    BelgiumFR,
    Canada,
    SwitzerlandEN,
    France,
    Israel,
    Croatia,
    Hungary,
    Italy,
    Japan,
    Korea,
    Lithuania,
    Latvia,
    Norway,
    Belgium,
    Netherlands,
    Poland,
    Brazil,
    Portugal,
    Romania,
    Russia,
    SlovakRepublic,
    Slovenia,
    Sweden,
    Thailand,
    Turkey,
    Ukraine,
    China,
    HongKong,
    Taiwan
}

export enum DownloadWorkerStates {
    NotStarted = -1,
    Started,
    NoParametersSupplied,
    RequestFailed,
    ResponseInvalid,
    IndeterminateProgress,
    DeterminateProgress,
    Success
}

export enum Resolutions {
    High,
    Medium,
    Low
}
