'use strict';

declare var require: Require;

var config: RequireConfig = {
    baseUrl: 'lib',
    shim: {
        'jquery': {
            exports: '$'
        },
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-messages': {
            deps: ['angular']
        },
        'angular-aria': {
            deps: ['angular']
        },
        'angular-material': {
            deps: ['angular']
        },
        'underscore': {
            exports: '_'
        }
    },
    paths: {
        app: '../app'
    }
};

require.config(config);

require([
    'jquery',
    'app/bootstrap',
    'angular',
    'underscore',
    'angular-ui-router',
    'angular-animate',
    'angular-aria',
    'angular-material',
    'angular-messages'
], ($, BootStrap) => {
    $(document).ready(() => {
        BootStrap.bootstrap();
    });
});