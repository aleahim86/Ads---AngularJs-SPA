/* Serrvice for getting аll ads on home page  */
onlineAdsApp.factory('adsData', function adsData($http, $q, baseUrl, authorizationService) {
    function adsRequester(method, url, data) {
        var deferred = $q.defer();

        var headers = authorizationService.getAuthorizationHeaders();
        $http({
            method: method,
            url: url,
            data: data,
            headers: headers
        })
                .success(function (data, status, headers, config) {
                    deferred.resolve(data, status, headers, config);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data, status, headers, config);
                });

        return deferred.promise;
    }

    var getAllAdds = function (pageNumber, townId, categoryId) {
        return adsRequester('GET', baseUrl + '/ads?pagesize=5&startpage=' + pageNumber +
                '&TownId=' + townId + '&CategoryId=' + categoryId, null);
    };

    return {
        getAll: getAllAdds
    };
});