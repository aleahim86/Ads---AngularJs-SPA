'use strict';

var adsApp = angular
        .module('adsApp', ['ngRoute', 'angularUtils.directives.dirPagination'])
        .config(function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'templates/home.html',
                controller: 'AdsAppController'
            }).when('/register', {
                templateUrl: 'templates/registerTemplate.html',
                controller: 'RegisterController'
            }).when('/login', {
                templateUrl: 'templates/loginTemplate.html',
                controller: 'LoginController'
            })
                    .otherwise('/'); 
        });
        

