'use strict';

adsApp.factory('loginService', function ($http, adsData) {
    function login(user, success) {
        $http({
            url: 'http://softuni-ads.azurewebsites.net/api/user/login',
            method: 'POST',
            data: JSON.stringify(user)
        }).success(function (data) {
            success(data);
            adsData.showInfoMessage("Successful login!");
        }).error(function (err) {
            adsData.showAjaxError("Invalid login", err);
        });
    }

    return {
        login: login
    };
});