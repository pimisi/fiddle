(function () {
    'use strict';

    angular
        .module('playgroundApp')
        .factory('BaseServiceModel', BaseServiceModel);

    BaseServiceModel.$inject = ['$resource', 'API_PREFERRED_KEYS', '$rootScope', 'APIHelper', 'Base64'];

    function BaseServiceModel($resource, API_PREFERRED_KEYS, $rootScope, APIHelper, Base64) {

        var BaseServiceModel = function (requestedService, param) {

            this.responsePayload = null;
            this.responseError = null;

            this.apiUriObject = APIHelper.getAPIServiceURIObject(
                API_PREFERRED_KEYS.main,
                API_PREFERRED_KEYS.fallback,
                requestedService,
                param
            );

            /* APIHelper.getServiceURIObject("development", "mock", requestedService, param,
             function (serviceURIObject) {
             self.apiUriObject = serviceURIObject;
             apiUriObject = self.apiUriObject;

             console.log(self.apiUriObject);


             //fetchCallback(apiUriObject);
             return serviceURIObject;
             });*/
        }

        /**
         * This method is used as the base method to fetch JSON Object for the required service.
         * This method uses a fallback logic so that if the primary source of the call fails
         * it would make a secondary call to retrieve mock data of the exact same payload structure
         */
        BaseServiceModel.prototype.JSONRequest = function (sourceURI) {

            console.log(sourceURI);

            return $resource(sourceURI, {}, {
                fetchJSONObject: {
                    method: 'GET',
                    transformRequest: addAuthorizationHeader
                },
                fetchJSONArray: {
                    method: 'GET',
                    transformRequest: addAuthorizationHeader,
                    isArray: true
                },
                postJSONObject: {
                    method: 'POST',
                    transformRequest: addAuthorizationHeader
                },
                postJSONArray: {
                    method: 'POST',
                    transformRequest: addAuthorizationHeader,
                    isArray: true
                }
            });

        }

        BaseServiceModel.prototype.fetchJSONObject = function (requestedService, param) {
            var self = this;
            self.responsePayload = null;

            if (requestedService != undefined && requestedService != null) {
                self.apiUriObject = APIHelper.getAPIServiceURIObject(
                    API_PREFERRED_KEYS.main,
                    API_PREFERRED_KEYS.fallback,
                    requestedService,
                    param
                );
            }

            return self.JSONRequest(self.apiUriObject["main"]).fetchJSONObject().$promise.then(function (data) {
                self.responsePayload = data;

                //return data;
            }, function (response) {
                var __response = getResponseError(response);

                if (__response.responseData == null || __response.status == 404) {
                    // make secondary call
                    return self.JSONRequest(self.apiUriObject["fallback"]).fetchJSONObject()
                        .$promise.then(function (data) {
                            self.responsePayload = data;

                            //return data;
                        }, function (response) {
                            console.log("Fallback Other Method");
                            self.responseError = getResponseError(response);

                        }).catch(function (response) {
                            console.log("Fallback Failed");
                            self.responseError = getResponseError(response);
                            //return null;
                        });
                } else {
                    this.responseError = getResponseError(response);
                }
                console.log("Other Method");

            }).catch(function (response) {
                console.log("Failed");

                //return null;
            });
        }

        function addAuthorizationHeader(data, headersGetter) {
            // as per HTTP accounts spec [1], credentials must be
            // encoded in base64.
            var headers = headersGetter();
            //headers['Authorization'] = ('Basic ' + Base64.encode(data.username + ':' + data.password))
        }

        function getResponseError(response) {
            var responseData = response.hasOwnProperty('data') ? response.data : null;
            var status = response.hasOwnProperty('status') ? response.status : 0;
            var statusText = response.hasOwnProperty('statusText') ? response.statusText : '';
            return {responseData: responseData, status: status, statusText: statusText};
        }

        return BaseServiceModel;

    }

})();