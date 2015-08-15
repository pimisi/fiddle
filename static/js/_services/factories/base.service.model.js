(function () {
    'use strict';

    angular
        .module('playgroundApp')
        .factory('BaseServiceModel', BaseServiceModel);

    BaseServiceModel.$inject = ['$scope', '$resource', '$rootScope', 'APIHelper', 'Base64'];

    function BaseServiceModel($scope, $resource, $rootScope, APIHelper, Base64) {

        var serviceObject = {};
        var apiUriObject = {};

        function addAuthorizationHeader(data, headersGetter) {
            // as per HTTP accounts spec [1], credentials must be
            // encoded in base64.
            var headers = headersGetter();
            headers['Authorization'] = ('Basic ' + Base64.encode(data.username + ':' + data.password))
        }

        var BaseServiceModel = function(requestedService) {
            APIHelper.getServiceURIObject("development", "mock", requestedService, param,
                function (serviceURIObject) {
                    apiUriObject = serviceURIObject;

                    console.log(apiUriObject);
                    //fetchCallback(apiUriObject);
                });
        }

        /**
         * This method is used as the base method to fetch JSON Object for the required service.
         * This method uses a fallback logic so that if the primary source of the call fails
         * it would make a secondary call to retrieve mock data of the exact same payload structure
         */
        BaseServiceModel.prototype.fetchJSONObject = function() {
            var self = this;

            return $resource(apiUriObject["main"], null, {});

        }




    }

})();