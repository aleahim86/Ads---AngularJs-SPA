'use strict';

adsApp.factory('adsData', function ($http, $location) {
    function getCategories(success) {
        $http.get('http://softuni-ads.azurewebsites.net/api/categories')
                .success(function (data) {
                    success(data);
                })
                .error(function () {
                    showErrorMessage('Can\'t load categories');
                });
    }
    function getAllAds(success) {
        $http.get('http://softuni-ads.azurewebsites.net/api/ads')
                .success(function (data) {
                    success(data);
                })
                .error(function () {
                    showErrorMessage('Can\'t load ads');
                });
    }
    function getTowns(success) {
        $http.get('http://softuni-ads.azurewebsites.net/api/towns')
                .success(function (data) {
                    success(data);
                })
                .error(function () {
                    showErrorMessage('Can\'t load towns');
                });
    } 
    function showAjaxError(msg, error) {
        var errMsg = error.responseJSON;
        if (errMsg && errMsg.error) {
            showErrorMessage(msg + ": " + errMsg.error);
        } else {
            showErrorMessage(msg + ".");
        }
    }

    function showInfoMessage(msg) {
        noty({
            text: msg,
            type: 'success',
            layout: 'topCenter',
            timeout: 5000}
        );
    }

    function showErrorMessage(msg) {
        noty({
            text: msg,
            type: 'error',
            layout: 'topCenter',
            timeout: 5000}
        );
    }
    return {
        getCategories: getCategories,
        getAllAds: getAllAds,
        getTowns: getTowns,
        showAjaxError: showAjaxError,
        showInfoMessage: showInfoMessage,
        showErrorMessage: showErrorMessage
    };
});