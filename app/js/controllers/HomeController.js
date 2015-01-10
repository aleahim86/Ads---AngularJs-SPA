/* Controllers for AdsApp*/
var onlineAdsAppControllers = angular.module('onlineAdsAppControllers', []);
/* home controller*/
onlineAdsAppControllers.controller('HomeController',
        function homeController($scope, $rootScope, adsData, categoriesData, townsData, ajaxErrorText) {
            /* town/category id for further filtering */
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
                adsData.getAll(pageNumber, currentTownId, currentCategoryId).then(function (data) {
                    $scope.loading = true;
                    $scope.adsData = data;
                    $scope.totalAds = parseInt(data.numPages) * 5;
                }, function (error) {
                    $rootScope.$broadcast('alertMessage', ajaxErrorText);
                });
            }

            /* get all categoreis */
            categoriesData.getAllCategories().then(function (data) {
                $scope.categoriesData = data;
            }, function (error) {
                $rootScope.$broadcast('alertMessage', ajaxErrorText);
            });


            /* get all towns*/
            townsData.getAllTowns().then(function (data) {
                $scope.townsData = data;
            }, function (error) {
                $rootScope.$broadcast('alertMessage', ajaxErrorText);
            });


            /* filtering ads by chosen category */
            $scope.filterByCategory = function (categoryId) {
                adsData.getAllAdsByCategory(categoryId, currentTownId, currentPage).then(function (data) {
                    $scope.noAdsToDisplay = false;
                    $scope.loading = true;
                    $scope.adsData = data;

                    if (data.ads.length === 0) {
                        $scope.noAdsToDisplay = true;
                    }

                    $scope.totalAds = parseInt(data.numPages) * 5;
                    currentCategoryId = categoryId;
                }, function (error) {
                    $rootScope.$broadcast('alertMessage', ajaxErrorText);
                });
            };

            /* filtering ads by chosen town*/
            $scope.filterByTown = function (townId) {
                adsData.getAllAdsByTown(townId, currentCategoryId, currentPage).then(function (data) {
                    $scope.noAdsToDisplay = false;
                    $scope.loading = true;
                    $scope.adsData = data;

                    if (data.ads.length === 0) {
                        $scope.noAdsToDisplay = true;
                    }

                    $scope.totalAds = parseInt(data.numPages) * 5;
                    currentTownId = townId;
                }, function (error) {
                    $rootScope.$broadcast('alertMessage', ajaxErrorText);
                }).finally(function () {
                    $scope.loading = false;
                });
            };
        });