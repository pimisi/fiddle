(function () {
    'use strict';

    angular
        .module('playgroundApp')
        .factory('FriendModelService', FriendModelService);

    FriendModelService.$inject = ['BaseModelService'];

    function FriendModelService(BaseModelService) {

        var requestedService = 'friends';

        // Create the new custom object that reuses the original
        // object constructor
        var FriendModelService = function() {
            BaseModelService.apply(this, arguments);
        }

        // use the original object prototype
        FriendModelService.prototype = new BaseModelService();

        // Define new private method
        //function getFriendsList() {
        //    var self = this;
        //    return this.fetchJSONObject();
        //
        //}

        function extractArguments(_arguments, _requestedService) {
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
         * Get a list of friends for the user supplied in the argument param object
         * The function takes a maximum of 2 arguments.
         * @returns {*}
         */
        FriendModelService.prototype.getFriendsList = function() {

            var args = extractArguments(arguments, requestedService + ".list");

            return BaseModelService.prototype.fetchJSONObject.apply(this, args);;
        }

        FriendModelService.prototype.sendMessage = function(options) {
            var args = [];

            if (typeof(options) != 'object') {
                console.error("FriendModelService.sendMessage: " +
                    "This method accepts only one argument and it must be an object");
                options = {};
            } else {
                // Get arguments from options
                if (options.hasOwnProperty('requestedService')) {
                    args.push(options['requestedService']);
                } else {
                    args.push(requestedService + ".list");
                }
                if (options.hasOwnProperty('params')) {
                    args.push(options['params']);
                } else {
                    args.push({});
                }
            }

            if (options.hasOwnProperty('payload')) {
                args.push(options['payload']);
            }

            return BaseModelService.prototype.postJSONObject.apply(this, args);
        }

        return FriendModelService;
    }
})();