System.config({
    packages: {
        'app': {
            format: 'register',
            meta: {
                'bootstrap.js': {
                    format: 'register',
                    deps: [
                        'lib/underscore'
                    ]
                }
            }
        },
        'lib': {
            format: 'global',
            meta: {
                'lib/angular2.dev.js': {
                    deps: [
                        'lib/Rx',
                        'lib/angular2-polyfills',
                    ]
                },
                'lib/router.dev.js': {
                    deps: ['lib/angular2.dev']
                },
                'lib/http.dev.js': {
                    deps: ['lib/angular2.dev']
                },
                'lib/angular-material.js': {
                    exports: '$'
                },
                'lib/underscore.js': {
                    exports: '_'
                },                
            }
        }
    }
});

System.import('app/bootstrap').then(null, console.error.bind(console));