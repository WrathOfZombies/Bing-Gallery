'use strict';

var config: RequireConfig = {
    baseUrl: '/www/lib/js',
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
        'underscore': {
            exports: '_'
        }
    },
    paths: {
        app: '../../js'
    }
};

requirejs.config(config);

requirejs(['jquery', 'angular', 'underscore', 'angular-ui-router', 'app/bootstrapper'], ($, _, angular, ui, main) => {
    main.BootStrap.bootstrap();
});