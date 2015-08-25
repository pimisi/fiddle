(function () {
    'use strict';

    angular
        .module('playgroundApp')
        .factory('BaseModelService', BaseModelService);

    BaseModelService.$inject = ['$resource', 'API_PREFERRED_KEYS', '$rootScope', 'APIHelper', 'Base64'];

    function BaseModelService($resource, API_PREFERRED_KEYS, $rootScope, APIHelper, Base64) {

        function getApiUriObject(requestedService, param) {

            if (requestedService != undefined && requestedService != null) {
                if (typeof(requestedService) != 'string') {
                    console.log("getAPIUriObject - The first argument must be a string");
                } else if (typeof(param) != 'object' && param != undefined && param != null) {
                    console.log("getAPIUriObject - The second argument must be an object");
                } else {
                    this.apiUriObject = APIHelper.getAPIServiceURIObject(
                        API_PREFERRED_KEYS.main,
                        API_PREFERRED_KEYS.fallback,
                        requestedService,
                        param
                    );
                }
            }
        }

        var BaseModelService = function (requestedService, param) {

            this.responsePayload = null;
            this.responseError = null;
            /** This property is used to determine if to use the service switcher logic or not **/
            this.queryDirect = false;
            this.apiUriObject = null;

            getApiUriObject.call(this, requestedService, param);

        }

        BaseModelService.prototype.extractArguments = function(_arguments, _requestedService) {
            var args = [];
            var totalArguments = _arguments.length;

            if (totalArguments < 2) {
                args.push(_requestedService);

                for (var i = 0; i < totalArguments; i++) {
                    args.push(_arguments[i]);
                }

                if (args.length < 2) {
                    args.push({});
                }
            } else if (totalArguments > 2) {
                console.error("Maximum of 2 arguments expected, " + totalArguments + " given");
                return null;
            } else {
                for (var i = 0; i < totalArguments; i++) {
                    args.push(_arguments[i]);
                }
                // args = _arguments;
            }
            return args;
        }


        /**
         * This method is used as the base method to fetch JSON Object for the required service.
         * This method uses a fallback logic so that if the primary source of the call fails
         * it would make a secondary call to retrieve mock data of the exact same payload structure
         */
        BaseModelService.prototype.JSONRequest = function (sourceURI) {

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
                },
                updateForJSONObject: {
                    method: 'PUT',
                    transformRequest: addAuthorizationHeader
                },
                updateForJSONArray: {
                    method: 'PUT',
                    transformRequest: addAuthorizationHeader,
                    isArray: true
                }
            });

        }

        /**
         * This method id used to carry out an API update for the requestedService
         *
         * @param requestedService - The requested service to pull from the api helper class
         * @param param - The parameter for replacing placeholders in the url
         * @param requestPayload - The payload to send for the update
         * @returns {*}
         */
        BaseModelService.prototype.updateForJSONObject = function (requestedService, param, requestPayload) {
            var self = this;
            self.responsePayload = null;
            var mainUri = '';
            var fallbackUri = '';

            if (self.queryDirect) {
                mainUri = requestedService;
            } else {
                getApiUriObject.call(this, requestedService, param);
                mainUri = self.apiUriObject["main"];
                fallbackUri = self.apiUriObject["fallback"];
            }

            var options = {
                method: 'PUT',
                mainUri: mainUri,
                fallbackUri: fallbackUri,
                requestPayload: requestPayload
            }

            return makeRequest.call(self, options);
        }

        /**
         * This method is used post a request for the requestedService expecting a json object response
         *
         * @param requestedService - The requested service to pull from the api helper class
         * @param param - The parameter for replacing placeholders in the url
         * @param requestPayload
         * @returns {*}
         */
        BaseModelService.prototype.postJSONObject = function (requestedService, param, requestPayload) {
            var self = this;
            self.responsePayload = null;
            var mainUri = '';
            var fallbackUri = '';

            if (self.queryDirect) {
                mainUri = requestedService;
            } else {
                if (requestedService != undefined && requestedService != null) {
                    getApiUriObject.call(this, requestedService, param);
                }
                if (self.apiUriObject != null) {
                    mainUri = self.apiUriObject["main"];
                    fallbackUri = self.apiUriObject["fallback"];
                }
            }

            var options = {
                method: 'POST',
                mainUri: mainUri,
                fallbackUri: fallbackUri,
                requestPayload: requestPayload
            }

            return makeRequest.call(self, options);

        }

        /**
         * This method id used fetch a json object from the api for the requestedService
         *
         * @param requestedService - The requested service to pull from the api helper class
         * @param param - The parameter for replacing placeholders in the url
         * @returns {*}
         */
        BaseModelService.prototype.fetchJSONObject = function (requestedService, param) {
            var self = this;
            self.responsePayload = null;
            var mainUri = '';
            var fallbackUri = '';

            if (self.queryDirect) {
                mainUri = requestedService;
            } else {
                if (requestedService != undefined && requestedService != null) {
                    getApiUriObject.call(this, requestedService, param);
                }
                if (self.apiUriObject != null) {
                    mainUri = self.apiUriObject["main"];
                    fallbackUri = self.apiUriObject["fallback"];
                }
            }

            var options = {
                mainUri: mainUri,
                fallbackUri: fallbackUri
            }

            return makeRequest.call(self, options);


        }

        /**
         * This method id used fetch a json array from the api for the requestedService
         *
         * @param requestedService - The requested service to pull from the api helper class
         * @param param - The parameter for replacing placeholders in the url
         * @returns {*}
         */
        BaseModelService.prototype.fetchJSONArray = function (requestedService, param) {
            var self = this;
            self.responsePayload = null;
            var mainUri = '';
            var fallbackUri = '';

            if (self.queryDirect) {
                mainUri = requestedService;
            } else {
                if (requestedService != undefined && requestedService != null) {
                    getApiUriObject.call(this, requestedService, param);
                }
                if (self.apiUriObject != null) {
                    mainUri = self.apiUriObject["main"];
                    fallbackUri = self.apiUriObject["fallback"];
                }
            }

            var options = {
                mainUri: mainUri,
                fallbackUri: fallbackUri,
                isArrayResponse: true
            }

            return makeRequest.call(self, options);

        }

        /* Private Methods */
        /**
         * This method is used as a helper method to complete any json api request of GET, POST, or PUT
         *
         * @param options - The options for the request.
         * {{[method:<string>,] mainUrl:<string>,falbackUrl:<string> [,requestPayload:<json object>]}}
         * @returns {*}
         */
        function makeRequest(options) {

            var self = this;

            if (options == undefined || options == null || !angular.isObject(options)) {
                console.error("The options must be an object");
                return null;
            }

            // Get the URIs from the options else default to an empty string
            var requestMethod = options.hasOwnProperty('method') ? options.method : ''; // default is GET
            var mainUri = options.hasOwnProperty('mainUri') ? options.mainUri : '';
            var fallbackUri = options.hasOwnProperty('fallbackUri') ? options.fallbackUri : '';
            var requestPayload = options.hasOwnProperty('requestPayload') ? options.requestPayload : null;

            var isArrayResponse = options.hasOwnProperty('isArrayResponse') ? options.isArrayResponse : false;

            var mainResourceObject = self.JSONRequest(mainUri);

            switch (requestMethod.toLowerCase()) {
                case "post" :
                    if (!isArrayResponse) {
                        mainResourceObject = mainResourceObject.postJSONObject(requestPayload);
                    } else {
                        mainResourceObject = mainResourceObject.postJSONArray(requestPayload);
                    }
                    break;
                case "put"  :
                    if (!isArrayResponse) {
                        mainResourceObject = mainResourceObject.updateForJSONObject(requestPayload);
                    } else {
                        mainResourceObject = mainResourceObject.updateForJSONArray(requestPayload);
                    }
                    break;
                default     : // Default is GET
                    if (!isArrayResponse) {
                        mainResourceObject = mainResourceObject.fetchJSONObject();
                    } else {
                        mainResourceObject = mainResourceObject.fetchJSONArray();
                    }
                    break;
            }

            return mainResourceObject.$promise.then(function (data) {
                    self.responsePayload = data;
                }, function (response) {
                    var __response = getResponseError.call(self, response);

                    // Only run this on selected environments and if not a direct query (self.queryDirect == false)
                    if ((__response.responseData == null || __response.status == 404) && !self.queryDirect) {

                        var fallbackResourceObject = self.JSONRequest(fallbackUri);

                        switch (requestMethod.toLowerCase()) {
                            case "post" :
                                if (!isArrayResponse) {
                                    fallbackResourceObject = fallbackResourceObject.postJSONObject(requestPayload);
                                } else {
                                    fallbackResourceObject = fallbackResourceObject.postJSONArray(requestPayload);
                                }
                                break;
                            case "put"  :
                                if (!isArrayResponse) {
                                    fallbackResourceObject = fallbackResourceObject.updateForJSONObject(requestPayload);
                                } else {
                                    fallbackResourceObject = fallbackResourceObject.updateForJSONArray(requestPayload);
                                }
                                break;
                            default     :
                                if (!isArrayResponse) {
                                    fallbackResourceObject = fallbackResourceObject.fetchJSONObject();
                                } else {
                                    fallbackResourceObject = fallbackResourceObject.fetchJSONArray();
                                }
                                break;
                        }

                        return fallbackResourceObject.$promise.then(function (data) {
                                self.responsePayload = data;
                            }, function (response) {
                                console.log("Fallback failed");
                                self.responseError = getResponseError.call(self, response);
                            }).catch(function (response) {
                                console.log("Fallback exception");
                                self.responseError = getResponseError(response);
                            });
                    } else {
                        self.responseError = __response;
                    }

                    console.log("Main call failed");
                }).catch(function (response) {
                    console.log("Main call exception");

                    self.responseError = getResponseError(self, response);
                });
        }

        /**
         * This method is used for transforming the $resource request
         *
         * @param data
         * @param headersGetter
         * @returns {string|undefined|*}
         */
        function addAuthorizationHeader(data, headersGetter) {
            // as per HTTP accounts spec [1], credentials must be
            // encoded in base64.
            var headers = headersGetter();
            if (data) {
                headers['Authorization'] = ('Basic ' + Base64.encode(data.username + ':' + data.password))
            }

            return angular.toJson(data);
        }

        /**
         * This method is used for generating $resource server errors
         *
         * @param response
         * @returns {{responseData: *, status: *, statusText: *}}
         */
        function getResponseError(response) {
            var responseData = response.hasOwnProperty('data') ? response.data : null;
            var status = response.hasOwnProperty('status') ? response.status : 0;
            var statusText = response.hasOwnProperty('statusText') ? response.statusText : '';
            return {responseData: responseData, status: status, statusText: statusText};
        }

        return BaseModelService;

    }

})();