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
        var FriendServiceModel = function() {
            BaseModelService.apply(this, arguments);
        }

        // use the original object prototype
        FriendServiceModel.prototype = new BaseModelService();

        // Define new private method
        //function getFriendsList() {
        //    var self = this;
        //    return this.fetchJSONObject();
        //
        //}

        /**
         * Get a list of friends for the user supplied in the argument param object
         * The function takes a maximum of 2 arguments.
         * @returns {*}
         */
        FriendServiceModel.prototype.getFriendsList = function() {

            var args = [];
            var totalArguments = arguments.length;

            if (totalArguments < 2) {
                args.push(requestedService + ".list");

                for (var i = 0; i < totalArguments; i++) {
                    args.push(arguments[i]);
                }
            } else if (totalArguments > 2) {
                console.log("Maximum of 2 arguments expected, " + totalArguments + " given");
                return null;
            } else {
                args = arguments;
            }

            //var fetchJSONData = BaseModelService.prototype.fetchJSONObject.apply(this, args);

            return BaseModelService.prototype.fetchJSONObject.apply(this, args);;
        }

        return FriendServiceModel;
    }
})();