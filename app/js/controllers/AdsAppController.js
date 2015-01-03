'use strict';

adsApp.controller('AdsAppController', function ($scope, adsData) {
    adsData.getCategories(function (resp) {
        $scope.categories = resp;
    });

    adsData.getTowns(function (resp) {
        $scope.towns = resp;
    });
    
    var currentCategoryId = '',
            currentTownId = '',
            currentPage = 1;

    /* pagination */
    $scope.totalAds = 0;
    $scope.adsPerPage = 5;
    getResultsPage(1);

    $scope.pagination = {
        current: 1
    };

    $scope.pageChanged = function (newPage) {
        getResultsPage(newPage);
    };

    function getResultsPage(pageNumber) {
        adsData.getAllAds(pageNumber, currentTownId, currentCategoryId, function (resp) {
            $scope.ads = resp.ads;
            $scope.totalAds = parseInt(resp.numItems);
            currentPage = pageNumber;
        });
    }
});

