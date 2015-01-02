app.controller('CategoriesController', function($scope, $log, adsData) {
	adsData.getAllCategories()
		.success(function (categories) {
			$scope.Categories = categories;
		})
		.error(function (error) {
			$log.error(error);
		});
});

