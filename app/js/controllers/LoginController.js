'use strict';

adsApp.controller('LoginController', function ($scope, loginService, $location) {
    $scope.tryingToLogin = function (user) {
        loginService.login(user, function (resp) {
            if (resp.access_token != null && resp.access_token != undefined && resp.access_token != '') {
                localStorage.setItem('token', resp.access_token);
                localStorage.setItem('username', resp.username);
                $location.path('user/home');
            }
        });
    };
}
);
