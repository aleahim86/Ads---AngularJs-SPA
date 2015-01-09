onlineAdsApp.factory('authenticationService',
    function authentication($http, $q, baseUrl, authorizationService) {
        function authRequest(method, url, data) {
            var deferred = $q.defer();

            $http({
                method: method,
                url: url,
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

        var login = function(userData){
            return authRequest('POST', baseUrl + '/user/login', userData);
        };

         var register = function(regData){
            return authRequest('POST',baseUrl + '/user/register', regData);
        };

        return {
            login: login,
            register: register
        };
    });