'use strict';

adsApp.controller('RegisterController', function ($scope, registerService, $location) {
    $scope.register = function (user) {
        console.log(user);
        registerService.register(user, function (resp) {
            localStorage.setItem('token', resp.access_token);
            localStorage.setItem('username', resp.username);
            $location.path('/login');
        });
    };
});

