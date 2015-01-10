var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('UserAllAdsController',
        function userAllAdsController($scope, $rootScope, $route, $location, adsData, ajaxErrorText) {
            $scope.loading = true;
            $scope.noAdsToDisplay = false;

            var adStatus = $location.path().substr(10, $location.path().length);

            /* pagination */
            var currentPage = 1;
            $scope.totalAds = 0;
            $scope.adsPerPage = 3;
            getResultsPage(1);

            $scope.pagination = {
                current: 1
            };

            $scope.pageChanged = function (newPage) {
                getResultsPage(newPage);
            };

            function getResultsPage(pageNumber) {
                adsData.getUserAds(pageNumber, adStatus).then(function (data) {
                    if (data.ads.length === 0) {
                        $scope.noAdsToDisplay = true;
                    } else {
                        $scope.loading = true;
                        $scope.userAdsData = data;
                        $scope.totalAds = parseInt(data.numItems);
                        currentPage = pageNumber;
                    }
                }, function (error) {
                    $rootScope.$broadcast('alertMessage', ajaxErrorText);
                }).finally(function () {
                    $scope.loading = false;
                });
            }

            /* redirect user to edit-ad page */
            $scope.openEditAdMod = function (id) {
                console.log(id);
                adsData.adIdToBeEdited = id;
                $location.path('/user/edit-ad-info');
            };
            
            /* publish again ad*/
            $scope.publishAgainAd = function (id) {
                adsData.publishAgainAd(id).then(function (data) {
                    $route.reload();
                    $rootScope.$broadcast('alertMessage', data.message +
                            "It was moved into your Waiting Approval Ads.");
                }, function (error) {
                    $rootScope.$broadcast('alertMessage', ajaxErrorText);
                });
            };

            /* deactivate ad*/
            $scope.deactivateAd = function (id) {
                adsData.deactivateAd(id).then(function (data) {
                    $route.reload();
                    $rootScope.$broadcast('alertMessage', data.message +
                            "It was moved into your Inactive Ads.");
                }, function (error) {
                    $rootScope.$broadcast('alertMessage', ajaxErrorText);
                });
            };
        });