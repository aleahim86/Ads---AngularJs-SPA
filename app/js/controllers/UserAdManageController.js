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

            /* get uploaded image */
            $scope.fileSelected = function (fileInputField) {
                delete $scope.editAdInfo.imageDataUrl;
                var file = fileInputField.files[0];

                if (file.type.match(/image\/.*/)) {
                    var reader = new FileReader();
                    reader.onload = function () {
                        /* display uploaded image */
                        $scope.editAdInfo.imageDataUrl = reader.result;
                        $('.ad-image').attr('src', reader.result);
                        $('.image-title').attr('value', file.name);
                        $scope.editAdInfo.changeImage = true;
                        $scope.editAdInfo.imageDataUrl = reader.result;
                    };
                    reader.readAsDataURL(file);
                } else {
                    $('.ad-image').attr('src', './img/not-suported.jpg');
                    $('.image-title').attr('value', 'file format not supported');
                    $scope.editAdInfo.changeImage = true;
                    $scope.editAdInfo.imageDataUrl = null;
                }
            };

            /* delete current image */
            $scope.deleteImage = function () {
                delete $scope.editAdInfo.imageDataUrl;

                $('.ad-image').attr('src', './img/image-upload.png');
                $('.image-title').attr('value', '');
                $scope.editAdInfo.changeImage = true;
                $scope.editAdInfo.imageDataUrl = null;
            };

            /* confirm ad edit */
            $scope.updateAdInfo = function (id, editAdInfo) {
                if (!editAdInfo.title || !editAdInfo.text) {
                    return;
                }

                adsData.editAd(id, editAdInfo).then(function (data) {
                    $route.reload();
                    $rootScope.$broadcast('alertMessage', data.message +
                            "Don't forget to submit it for publishing.");
                }, function (error) {
                    $route.reload();
                    $rootScope.$broadcast('alertMessage', ajaxErrorText);
                });
            };

            /* cancel ad edit */
            $scope.cancel = function () {
                $route.reload();
            };
        });