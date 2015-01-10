var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('UserPiblishAdController',
    function($scope, $rootScope, adsData, townsData, categoriesData, authData, ajaxErrorText) {
        $scope.nullValue = null;
        $scope.imageData = '';
        $scope.newAdData = {
            townId: null,
            categoryId: null
        };

        /* load towns for dropdown select town field*/
        townsData.getAllTowns().then(function(data) {
            $scope.townsData = data;
        }, function(error) {
            $rootScope.$broadcast('alertMessage', ajaxErrorText);
        });

        /* load cateogoreis for dropdown select category field*/
        categoriesData.getAllCategories().then(function(data) {
            $scope.categoriesData = data;
        }, function(error) {
            $rootScope.$broadcast('alertMessage', ajaxErrorText);
        });

        /* get uploaded image */
        $scope.fileSelected = function(fileInputField) {
            delete $scope.newAdData.imageDataUrl;
            var file = fileInputField.files[0];

            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    /* display uploaded image */
                    $scope.newAdData.imageDataUrl = reader.result;
                    $('.ad-image').attr('src', reader.result);
                    $('.image-title').attr('value', file.name);
                };
                reader.readAsDataURL(file);
            } else {
                $scope.newAdData.imageDataUrl = null;
                $('.ad-image').attr('src', './img/not-suported.jpg');
                $('.image-title').attr('value', 'file format not supported');
            }
        };

        $scope.publishAd = function(newAdData, newAdForm) {
            if (newAdForm.$valid && authData.userIsLogged()) {
                adsData.publishAd(newAdData).then(function(data) {
                    $rootScope.$broadcast('alertMessage', 'Advertisement submitted for approval.Once approved, it will be published.');
            
                    /* clean publish ad form */
                    $('.ad-image').attr('src', './img/image-upload.png');
                    $('.image-title').attr('value', '');
                    $('#title').val('');
                    $('#text').val('');
                    $('#selectTown').val($scope.nullValue);
                    $('#selectCategory').val($scope.nullValue);
                }, function(error) {
                   $rootScope.$broadcast('alertMessage', ajaxErrorText);
                });
            }
        };
    });