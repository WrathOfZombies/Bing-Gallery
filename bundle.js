({
    appDir: './www',
    baseUrl: 'lib',
    dir: './www-prod',
    modules: [{
        name: 'app/main',
        exclude: [
            'jquery',
            'angular',
            'underscore',
            'angular-ui-router',
            'angular-animate',
            'angular-aria',
            'angular-material',
            'angular-messages'
        ]
    }],
    fileExclusionRegExp: /^(r|bundle)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths: {
        app: '../app'
    },
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
    }
})