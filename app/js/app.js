/* AdsApp Module */
var onlineAdsApp = angular.module('onlineAdsApp', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angularUtils.directives.dirPagination',
    'onlineAdsAppControllers'
]);

/* Configure routing and URL paths */
onlineAdsApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        }).
        when('/register', {
            templateUrl: 'templates/register.html',
            controller: 'RegisterController'
        }).
        when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        }).
        otherwise({
            redirectTo: '/home'
        });
    }
]).
run(function($rootScope, $location, authData) {
    $rootScope.$on('$routeChangeStart', function(event, next) {
        var path = $location.path();
        if (!authData.userIsLogged() && path !== '/login' &&
            path !== '/register' && path !== '/home') {
            $location.path('/unauthorized');
        }
    });
}).
constant('baseUrl', 'http://softuni-ads.azurewebsites.net/api').
constant('ajaxErrorText', 'Something went wrong, please try again or refresh the page.');
        

