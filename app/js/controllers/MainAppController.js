onlineAdsApp.controller('MainAppController',
        function mainAppController($scope, $rootScope, $window, $location, $timeout) {

            /* handle alert messages */
            $scope.alertDialog = false;
            $scope.homePage = true;
            $scope.alertMsg = '';
            $scope.alertType = '';

            $scope.closeAlert = function () {
                $scope.alertDialog = false;
                $('.alerts-div').css('z-index', -1);
            };

            /* This event is sent by all controllers after success/error ajax callback */
            $scope.$on('alertMessage', function (event, message) {
                $scope.alertDialog = true;
                $scope.alertMsg = message;
                $scope.alertType = 'danger';
                $('.alerts-div').css('z-index', 99);

                /* autohide alert message */
                $timeout(function () {
                    $("#current-alert").fadeTo(500, 0).slideUp(500, function () {
                        $scope.alertDialog = false;
                        $('.alerts-div').css('z-index', -1);
                    });
                }, 5000);
            });

            /* activate clicked links on page refresh*/
            $scope.getClass = function (path) {
                if ($location.path() === path) {
                    return "active";
                } else {
                    return "";
                }
            };
        });