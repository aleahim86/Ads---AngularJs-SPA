'use strict';

var adsApp = angular
        .module('adsApp', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'templates/home.html',
                controller: 'AdsAppController'
            }).when('/register', {
                templateUrl: 'templates/registerTemplate.html',
                controller: 'Register'
            })
                    .otherwise('/'); 
        });
        

