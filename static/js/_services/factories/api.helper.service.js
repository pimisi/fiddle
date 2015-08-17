(function () {
    'use strict';

    angular
        .module('playgroundApp')
        .factory('APIHelper', APIHelper);

    APIHelper.$inject = ['$resource', '$http'];

    function APIHelper($resource, $http) {

        //var apiEndpoints = null;
        //var primaryAPISource = '';
        //var fallbackAPISource = '';

        var serviceSourceObject = {};
        var target = {environment: '', fallback: ''};

        var helperObject = {};

        helperObject.getServiceObject = function (environment, fallback, callback) {

            target.environment = environment;
            target.fallback = fallback;

            var apiEndpoints = $resource('/static/resources/api_endpoints.json', {}, {
                query: {
                    isArray: false
                }
            });
            apiEndpoints.query(function (data) {
                //console.log(data);
                apiEndpoints = data;

                var endpointObject = apiEndpoints[environment];
                var fallbackEndpointObject = apiEndpoints[fallback];

                serviceSourceObject.primary = endpointObject;
                serviceSourceObject.fallback = fallbackEndpointObject;

                callback(serviceSourceObject);
            });
        }

        helperObject.getAPIServiceObject = function (environment, fallback) {
            // Retrieve the endpoint json file
            $.ajax({
                url: '/static/resources/api_endpoints.json',
                async: false,
                dataType: 'json',
                success: function (data) {
                    var endpointObject = data[environment];
                    var fallbackEndpointObject = data[fallback];

                    serviceSourceObject.primary = endpointObject;
                    serviceSourceObject.fallback = fallbackEndpointObject;
                }
            });

            return serviceSourceObject;

        }

        helperObject.getServiceURI = function (serviceObject, requiredService, serviceObjectKey, params) {

            var serviceSourceObject = serviceObject[serviceObjectKey];
            var serviceURI = '';
            var serviceURIObject = {};
            var requiredServiceObject = null;
            var delimeters = new RegExp("[ |.|,|-]", "g");

            if (requiredService.indexOf("-") || requiredService.indexOf(" ")
                || requiredService.indexOf(".") || requiredService.indexOf(",")) {
                var serviceParts = requiredService.split(delimeters);

                if (serviceParts.length > 0) {

                    requiredServiceObject = serviceSourceObject[serviceParts[0]];

                    for (var i = 0; i < serviceParts.length; i++) {
                        serviceURIObject = serviceSourceObject[serviceParts[i]];

                        if (typeof(serviceURIObject) == "string") {
                            serviceURI = String(serviceURIObject);

                            break;
                        } else {
                            serviceSourceObject = serviceURIObject;
                        }
                    }
                }

            } else {
                serviceURIObject = serviceSourceObject[requiredService];

                if (typeof(serviceURIObject) == "string") {
                    serviceURI = String(serviceURIObject);
                }

                requiredServiceObject = serviceSourceObject[requiredService];
            }

            var baseUrl = requiredServiceObject["baseUrl"];

            if (baseUrl.length <= 0) {
                baseUrl = serviceSourceObject["baseUrl"];
            }

            // prepend to endpoint
            if (serviceURI.length > 0) {
                serviceURI = baseUrl + serviceURI;
            } else {
                serviceURI = baseUrl;
            }

            // Replace the params placeholder with supplied params
            if (params != undefined && params != null) {

                if (typeof(params) == 'object') {

                    for (var key in params) {
                        if (params.hasOwnProperty(key)) {
                            var regexPattern = new RegExp(':' + key, 'g');
                            var value = params[key];
                            serviceURI = serviceURI.replace(regexPattern, value);
                        }
                    }

                    console.log(serviceURI);
                }
            }
            return serviceURI;
        }

        helperObject.getServiceURIObject = function (environment, fallbackEnvironment, requiredService, params, callback) {

            var serviceURIMap = {};

            this.getServiceObject(environment, fallbackEnvironment, function (serviceObject) {
                var mainURI = helperObject.getServiceURI(serviceObject, requiredService, "primary", params);
                var mockURI = helperObject.getServiceURI(serviceObject, requiredService, "fallback", params);

                serviceURIMap.main = mainURI;
                serviceURIMap.fallback = mockURI;

                callback(serviceURIMap);
            });

            return serviceURIMap;
        }

        helperObject.getAPIServiceURIObject = function (environment, fallbackEnvironment,
                                                        requiredService, params, callback) {
            var serviceURIMap = {};
            var serviceObject = this.getAPIServiceObject(environment, fallbackEnvironment);

            var mainURI = helperObject.getServiceURI(serviceObject, requiredService, "primary", params);
            var mockURI = helperObject.getServiceURI(serviceObject, requiredService, "fallback", params);

            serviceURIMap.main = mainURI;
            serviceURIMap.fallback = mockURI;

            return serviceURIMap;
        }

        return helperObject;
    }
})();