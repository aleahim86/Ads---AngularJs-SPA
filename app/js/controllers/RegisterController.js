var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);
/*register controller*/
onlineAdsAppControllers.controller('RegisterController',
    function registerController($scope, $rootScope, $location, authService, authData, ajaxErrorText) {
        var errorMessage;
       
        $scope.registrationActive = true;
        $scope.EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.PHONE_REGEXP = /^\d+$/;

        $scope.register = function(regData, registerForm) {
            if (registerForm.$valid) {
                authService.register(regData).then(function(data) {
                    authData.setUserSession(data);
                    $rootScope.$broadcast('alertMessage', 'User account created.Please login');
                    $location.path('/login');
                }, function(error) {
                    errorMessage = error.modelState;
                    $rootScope.$broadcast('alertMessage', ajaxErrorText);
                });
            }
        };
    });