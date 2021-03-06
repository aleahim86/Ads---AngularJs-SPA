var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);
/* login controller*/
onlineAdsAppControllers.controller('LoginController',
        function loginController($scope, $rootScope, $location, authService, authData, ajaxErrorText) {
            $rootScope.$broadcast('userLoginRegister');

            $scope.login = function (userData, loginForm) {
                if (loginForm.$valid) {
                    authService.login(userData).then(function (data) {
                        authData.setUserSession(data);

                        $rootScope.$broadcast('userHasLogged');
                        $location.path('/home');
                    }, function (error) {
                        $scope.errorOccurred = true;
                        if (error.error_description) {
                            $rootScope.$broadcast('alertMessage', error.error_description);
                        } else {
                            $rootScope.$broadcast('alertMessage', ajaxErrorText);
                        }
                    });
                }
            };
        });
