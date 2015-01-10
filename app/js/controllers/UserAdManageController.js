var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('UserAdManageController',
        function userProfileController($scope, $rootScope, $route, adsData, categoriesData, townsData, ajaxErrorText) {
            console.log(adsData.adIdToBeEdited);
            /* get selected ad */
            adsData.getAdById(adsData.adIdToBeEdited).then(function (data) {
                $scope.currentAd = data;
                $scope.editAdInfo = {
                    title: data.title,
                    text: data.text,
                    imageDataUrl: data.imageDataUrl ? data.imageDataUrl : './img/image-upload.png',
                    categoryId: data.categoryId ? data.categoryId : null,
                    townId: data.townId ? data.townId : null,
                    changeImage: false
                };
            }, function (error) {
                $rootScope.$broadcast('alertMessage', ajaxErrorText);
            });

            /* get towns for dropdown*/
            townsData.getAllTowns().then(function (data) {
                $scope.townsData = data;
            }, function (error) {
                $rootScope.$broadcast('alertMessage', ajaxErrorText);
            });

            /* get categories for dropdown */
            categoriesData.getAllCategories().then(function (data) {
                $scope.categoriesData = data;
            }, function (error) {
                $rootScope.$broadcast('alertMessage', ajaxErrorText);
            });
        });