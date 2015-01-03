'use strict';

adsApp.controller('AdsAppController', function ($scope, adsData) {
    adsData.getCategories(function (resp) {
        $scope.categories = resp;
    });
    adsData.getAllAds(function (resp) {
        $scope.ads = resp.ads;
    });
    adsData.getTowns(function (resp) {
        $scope.towns = resp;
    });
});

