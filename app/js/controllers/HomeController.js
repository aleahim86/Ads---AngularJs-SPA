var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);
/* home controller*/
onlineAdsAppControllers.controller('HomeController',
        function homeController($scope, $rootScope, adsData, categoriesData, townsData, ajaxErrorText) {
            /* get selected town/category id for further filtering */
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
        });