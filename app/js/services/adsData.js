/* Serrvice for getting аll ads on home page  */
onlineAdsApp.factory('adsData', function adsData($http, $q, baseUrl, authData) {
    function adsRequester(method, url, data) {
        var deferred = $q.defer();

        var headers = authData.getAuthorizationHeaders();
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

    var getUserAds = function (pageNumber, adsWithStatus) {
        return adsRequester('GET', baseUrl + '/user/ads?pagesize=3&startpage=' +
                pageNumber + '&status=' + adsWithStatus, null);
    };
    
    var getAllAdsByTown = function(townId, categoryId, pageNumber){
        return adsRequester('GET',  baseUrl + '/ads?pagesize=5&TownId=' + townId + 
            '&CategoryId=' + categoryId + '&startpage=' + pageNumber, null);
    };
    
    var getAllAdsByCategory = function(categoryId, townId, pageNumber){
        return adsRequester('GET', baseUrl + '/ads?pagesize=5&CategoryId=' + categoryId + 
            '&TownId=' + townId + '&startpage=' + pageNumber, null);
    };
    
    var publishAd = function(newAdData){
        return adsRequester('POST', baseUrl + '/user/ads', newAdData);
    };
    
    var getAdById = function(id){
        return adsRequester('GET', baseUrl + '/user/ads/' + id, null);
    };
    
    var editAd = function(id, editAdData){
        return adsRequester('PUT', baseUrl + '/user/ads/' + id, editAdData);
    };
    
    var publishAgainAd = function(id){
        return adsRequester('PUT', baseUrl + '/user/ads/publishagain/' + id, null);
    };
    
    var deactivateAd = function(id){
        return adsRequester('PUT', baseUrl + '/user/ads/deactivate/' + id, null);
    };

    var deleteAd = function(id){
        return adsRequester('DELETE', baseUrl + '/user/ads/' + id, null);
    };
    
    return {
        getAll: getAllAdds,
        getUserAds: getUserAds,
        getAllAdsByTown: getAllAdsByTown,
        getAllAdsByCategory: getAllAdsByCategory,
        publishAd: publishAd,
        getAdById: getAdById,
        editAd: editAd,
        publishAgainAd: publishAgainAd,
        deactivateAd: deactivateAd,
        deleteAd: deleteAd
    };
});