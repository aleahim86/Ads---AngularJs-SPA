app.controller('AllAdsController', function ($scope, $route, $log, adsData) {
    adsData.getAll()
            .$promise
            .then(function (data) {
                console.log(data);
                $scope.data = data;
                console.log($scope.data);
            }, function (error) {
                $log.error(error);
            });

    $scope.reload = function () {
        $route.reload();
    };
});

