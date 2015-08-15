(function () {
    'use strict';

    angular
        .module('playgroundApp')
        .factory('BaseServiceModel', BaseServiceModel);

    BaseServiceModel.$inject = ['$scope', '$resource', '$rootScope', 'APIHelper', 'Base64'];

    function BaseServiceModel($scope, $resource, $rootScope, APIHelper, Base64) {

        //var serviceObject = {};
        //var apiUriObject = {};

        function addAuthorizationHeader(data, headersGetter) {
            // as per HTTP accounts spec [1], credentials must be
            // encoded in base64.
            var headers = headersGetter();
            headers['Authorization'] = ('Basic ' + Base64.encode(data.username + ':' + data.password))
        }

        var BaseServiceModel = function(requestedService, param) {

            this.apiUriObject = {};
            this.serviceObject = {};
            this.responsePayload = null;

            var self = this

            APIHelper.getServiceURIObject("development", "mock", requestedService, param,
                function (serviceURIObject) {
                    self.apiUriObject = serviceURIObject;

                    console.log(self.apiUriObject);
                    //fetchCallback(apiUriObject);
                    return serviceURIObject;
                });
        }

        /**
         * This method is used as the base method to fetch JSON Object for the required service.
         * This method uses a fallback logic so that if the primary source of the call fails
         * it would make a secondary call to retrieve mock data of the exact same payload structure
         */
        BaseServiceModel.prototype.JSONRequest = function() {
            var self = this;

            return $resource(apiUriObject["main"], null, {
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

        BaseServiceModel.prototype.fetchJSONObject = function() {
            var self = this;

            return self.JSONRequest.fetchJSONObject().$promise.then(function(data) {
                self.responsePayload = data;

                return data;
            });
        }

        return BaseServiceModel;


    }

})();