var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('UserProfileController',
    function userProfileController($scope, $rootScope, $route, userData, townsData, ajaxErrorText) {

        /* load towns for dropdown select town field*/
        townsData.getAllTowns().then(function(data) {
            $scope.townsData = data;
        }, function(error) {
            $rootScope.$broadcast('alertMessage', ajaxErrorText);
        });

        userData.getProfile().then(function(data) {
            $scope.currentuser = data;
            $scope.userDataForm = {
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber ? data.phoneNumber : '',
                townId: data.townId ? data.townId : null
            };
        }, function(error) {
            $rootScope.$broadcast('alertMessage', ajaxErrorText);
        });
        
        $scope.updateProfileInfo = function(userDataForm) {
            if (!userDataForm.name || !userDataForm.email || !userDataForm.phoneNumber) {
                return;
            }

            userData.updateProfileInfo(userDataForm).then(function(data) {
                $route.reload();
                $rootScope.$broadcast('alertMessage', data.message);
            }, function(error) {
                $rootScope.$broadcast('alertMessage', ajaxErrorText);
            });
        };
    });