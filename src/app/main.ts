'use strict';

var config: RequireConfig = {
    baseUrl: '/lib',
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
        app: '/app'
    }
};

requirejs.config(config);

requirejs([
    'jquery',
    'app/bootstrapper',
    'angular',
    'underscore',
    'angular-ui-router',
    'angular-animate',
    'angular-aria',
    'angular-material',
    'angular-messages'
], ($, main) => {
    $(document).ready(() => {
        main.BootStrap.bootstrap();
    });
});