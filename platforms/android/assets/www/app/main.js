'use strict';
var config = {
    baseUrl: '/www/lib',
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
        app: '/www/app'
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
], function ($, main) {
    $(document).ready(function () {
        main.BootStrap.bootstrap();
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQUksTUFBTSxHQUFrQjtJQUN4QixPQUFPLEVBQUUsVUFBVTtJQUNuQixJQUFJLEVBQUU7UUFDRixRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsR0FBRztTQUNmO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2hCLE9BQU8sRUFBRSxTQUFTO1NBQ3JCO1FBQ0QsbUJBQW1CLEVBQUU7WUFDakIsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDO1NBQ3BCO1FBQ0QsaUJBQWlCLEVBQUU7WUFDZixJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUM7U0FDcEI7UUFDRCxrQkFBa0IsRUFBRTtZQUNoQixJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUM7U0FDcEI7UUFDRCxjQUFjLEVBQUU7WUFDWixJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUM7U0FDcEI7UUFDRCxrQkFBa0IsRUFBRTtZQUNoQixJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUM7U0FDcEI7UUFDRCxZQUFZLEVBQUU7WUFDVixPQUFPLEVBQUUsR0FBRztTQUNmO0tBQ0o7SUFDRCxLQUFLLEVBQUU7UUFDSCxHQUFHLEVBQUUsVUFBVTtLQUNsQjtDQUNKLENBQUM7QUFFRixTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXpCLFNBQVMsQ0FBQztJQUNOLFFBQVE7SUFDUixrQkFBa0I7SUFDbEIsU0FBUztJQUNULFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsaUJBQWlCO0lBQ2pCLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsa0JBQWtCO0NBQ3JCLEVBQUUsVUFBQyxDQUFDLEVBQUUsSUFBSTtJQUNQLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQy9CLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiYXBwL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgY29uZmlnOiBSZXF1aXJlQ29uZmlnID0ge1xyXG4gICAgYmFzZVVybDogJy93d3cvbGliJyxcclxuICAgIHNoaW06IHtcclxuICAgICAgICAnanF1ZXJ5Jzoge1xyXG4gICAgICAgICAgICBleHBvcnRzOiAnJCdcclxuICAgICAgICB9LFxyXG4gICAgICAgICdhbmd1bGFyJzoge1xyXG4gICAgICAgICAgICBkZXBzOiBbJ2pxdWVyeSddLFxyXG4gICAgICAgICAgICBleHBvcnRzOiAnYW5ndWxhcidcclxuICAgICAgICB9LFxyXG4gICAgICAgICdhbmd1bGFyLXVpLXJvdXRlcic6IHtcclxuICAgICAgICAgICAgZGVwczogWydhbmd1bGFyJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICdhbmd1bGFyLWFuaW1hdGUnOiB7XHJcbiAgICAgICAgICAgIGRlcHM6IFsnYW5ndWxhciddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnYW5ndWxhci1tZXNzYWdlcyc6IHtcclxuICAgICAgICAgICAgZGVwczogWydhbmd1bGFyJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICdhbmd1bGFyLWFyaWEnOiB7XHJcbiAgICAgICAgICAgIGRlcHM6IFsnYW5ndWxhciddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnYW5ndWxhci1tYXRlcmlhbCc6IHtcclxuICAgICAgICAgICAgZGVwczogWydhbmd1bGFyJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICd1bmRlcnNjb3JlJzoge1xyXG4gICAgICAgICAgICBleHBvcnRzOiAnXydcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGF0aHM6IHtcclxuICAgICAgICBhcHA6ICcvd3d3L2FwcCdcclxuICAgIH1cclxufTtcclxuXHJcbnJlcXVpcmVqcy5jb25maWcoY29uZmlnKTtcclxuXHJcbnJlcXVpcmVqcyhbXHJcbiAgICAnanF1ZXJ5JyxcclxuICAgICdhcHAvYm9vdHN0cmFwcGVyJyxcclxuICAgICdhbmd1bGFyJyxcclxuICAgICd1bmRlcnNjb3JlJyxcclxuICAgICdhbmd1bGFyLXVpLXJvdXRlcicsXHJcbiAgICAnYW5ndWxhci1hbmltYXRlJyxcclxuICAgICdhbmd1bGFyLWFyaWEnLFxyXG4gICAgJ2FuZ3VsYXItbWF0ZXJpYWwnLFxyXG4gICAgJ2FuZ3VsYXItbWVzc2FnZXMnXHJcbl0sICgkLCBtYWluKSA9PiB7XHJcbiAgICAkKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgbWFpbi5Cb290U3RyYXAuYm9vdHN0cmFwKCk7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
