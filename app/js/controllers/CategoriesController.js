'use strict';

adsApp.controller('CategoriesController',
        function CategoriesController($scope) {
            var category = {
                "id": 1,
                "name": "sample string 2"
            };
            
            $scope.category = category;
        }
);

