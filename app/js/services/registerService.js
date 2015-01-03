'use strict';

adsApp.factory('registerService', function ($http, adsData) {
    function register(user, success) {
        $http({
            url: 'http://softuni-ads.azurewebsites.net/api/user/Register',
            method: 'POST',
            data: JSON.stringify(user)
        })
                .success(function (data) {
                    success(data);
                    adsData.showInfoMessage("User acount created. Please login!");
                })
                .error(function (err) {
                    adsData.showAjaxError("Register failed", err);
                    console.log(err);
                });
    }
    return {
        register: register
    };
});