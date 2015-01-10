var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('UserProfileController',
    function userProfileController($scope, $rootScope, userData, townsData, ajaxErrorText) {

        /* load towns for dropdown select town field*/
        townsData.getAllTowns().then(function(data) {
            $scope.townsData = data;
        }, function(error) {
            $rootScope.$broadcast('alertMessage', ajaxErrorText);
        });

        userData.getProfile().then(function(data) {
            $scope.currentuser = data;
            $scope.userData = {
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber ? data.phoneNumber : '',
                townId: data.townId ? data.townId : null
            };
        }, function(error) {
            $rootScope.$broadcast('alertMessage', ajaxErrorText);
        });
    });