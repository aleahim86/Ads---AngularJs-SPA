'use strict';

adsApp.factory('adsData', function ($http, $location) {
    function getCategories(success) {
        $http.get('http://softuni-ads.azurewebsites.net/api/categories')
                .success(function (data) {
                    success(data);
                })
                .error(function () {
                    alert('Can\'t load categories');
                });
    }
    function getAllAds(success) {
        $http.get('http://softuni-ads.azurewebsites.net/api/ads')
                .success(function (data) {
                    success(data);
                })
                .error(function () {
                    alert('Can\'t load ads');
                });
    }
    function getTowns(success) {
        $http.get('http://softuni-ads.azurewebsites.net/api/towns')
                .success(function (data) {
                    success(data);
                })
                .error(function () {
                    alert('Can\'t load towns');
                });
    }   
    return {
        getCategories: getCategories,
        getAllAds: getAllAds,
        getTowns: getTowns
    };
});