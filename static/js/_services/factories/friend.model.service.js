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

        /**
         * Get a list of friends for the user supplied in the argument param object
         * The function takes a maximum of 2 arguments.
         * @returns {*}
         */
        FriendModelService.prototype.getFriendsList = function(options) {

            /*
            var args = BaseModelService.prototype.extractArguments.apply(
                this,
                arguments,
                requestedService + ".list"
            ); */

            var args = BaseModelService.prototype.generateArguments.apply(this, options, requestedService + ".list");

            return BaseModelService.prototype.fetchJSONObject.apply(this, args);
        }



        FriendModelService.prototype.sendFriendRequest = function(options) {

            var args = BaseModelService.prototype.generateArguments.apply(this, options, requestedService + ".requests.send");

            return BaseModelService.prototype.postJSONObject.apply(this, args);
        }

        return FriendModelService;
    }
})();