onlineAdsApp.factory('userData', function($http, $q, baseUrl, authData) {
    function userRequester(method, url, data) {
        var deferred = $q.defer();
        var headers = authData.getAuthorizationHeaders();

        $http({
            method: method,
            url: url,
            headers: headers,
            data: data
        })
            .success(function(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            })
            .error(function(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

    var getProfile = function() {
        return userRequester('GET', baseUrl + '/user/profile', null);
    };
    
    var updateProfileInfo = function(data) {
        return userRequester('PUT', baseUrl + '/user/profile', data);
    };

    return {
        getProfile: getProfile,
        updateProfileInfo: updateProfileInfo
    };
});