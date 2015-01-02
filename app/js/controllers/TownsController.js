'use strict';

adsApp.controller('TownsController',
        function TownsController($scope) {
            var town = {
                "id": 2,
                "name": "sample string town 2"
            };
            
            $scope.town = town;
        }
);



