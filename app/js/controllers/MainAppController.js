onlineAdsApp.controller('MainAppController',
        function mainAppController($scope, $rootScope, $window, $location, $timeout, authService, authData) {

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

            /* handle refreshing page to store services state and user data */
            function init() {
                var currentUrl;
                $scope.loading = true;
                if (authData.userIsLogged()) {
                    $scope.userIsLogged = true;
                    $scope.homePage = false;
                    $scope.currentUser = authData.getUsername();

                    // show my ads nav on refresh if clicked
                    currentUrl = $location.path();
                    if (currentUrl === '/user/ads' || currentUrl === '/user/ads/published' ||
                            currentUrl === '/user/ads/waitingapproval' || currentUrl === '/user/ads/inactive' ||
                            currentUrl === '/user/ads/rejected') {
                        $scope.navigationMyAdsActive = true;
                    }
                } else {
                    $scope.userIsLogged = false;
                    $scope.navigationMyAdsActive = false;
                }

                /* This event is sent by LoginController when the user has logged 
                 to hide login/register buttons */
                $rootScope.$on("userHasLogged", function () {
                    $scope.userIsLogged = true;
                    $scope.homePage = false;
                    $scope.currentUser = authData.getUsername();
                });
            }

            init();

            $scope.logout = function () {
                authService.logout();
                $scope.userIsLogged = false;
                $scope.navigationMyAdsActive = false;
                $scope.homePage = true;
                $location.path('/home');

                /* alert user */
                $scope.alertDialog = true;
                $scope.alertMsg = 'Goodbye ' + $scope.currentUser + '.Thank you for using our services!';
                $scope.alertType = 'danger';
                $('.alerts-div').css('z-index', 99);

                /* autohide alert message */
                $timeout(function () {
                    $("#current-alert").fadeTo(500, 0).slideUp(500, function () {
                        $scope.alertDialog = false;
                        $('.alerts-div').css('z-index', -1);
                    });
                }, 4000);
            };

            /* when home button or site logo clicked*/
            $scope.loadHomePage = function () {
                $location.path('/home');
                $scope.navigationMyAdsActive = false;
            };

            /* redirect user to route with requested ads-status from myAds-nav 
             ads are loaded in the UserAllAdsController */
            $scope.loadUserAds = function (adsWithStatus) {
                if (authData.userIsLogged()) {
                    $scope.userIsLogged = true;
                    $scope.navigationMyAdsActive = true;

                    if (adsWithStatus === '') {
                        $location.path('/user/ads');
                    } else {
                        $location.path('/user/ads/' + adsWithStatus.toLowerCase());
                    }
                }
            };

            /* activate clicked links on page refresh*/
            $scope.getClass = function (path) {
                if ($location.path() === path) {
                    return "active";
                } else {
                    return "";
                }
            };

            /* redirect user to publish-new-add page */
            $scope.publishNewAdd = function () {
                if (authData.userIsLogged()) {
                    $scope.userIsLogged = true;
                    $scope.navigationMyAdsActive = false;
                    $location.path('/user/publish-new-add');
                }
            };
        });