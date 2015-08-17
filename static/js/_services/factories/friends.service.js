(function () {
    'use strict';

    angular
        .module('playgroundApp')
        .factory('FriendServiceModel', FriendServiceModel);

    FriendServiceModel.$inject = ['BaseServiceModel'];

    function FriendServiceModel(BaseServiceModel) {
        var requestedService = 'friends';

        // Create the new custom object that reuses the original
        // object constructor
        var FriendServiceModel = function() {
            BaseServiceModel.apply(this, arguments);
        }

        // use the original object prototype
        FriendServiceModel.prototype = new BaseServiceModel();

        // Define new private method
        function getFriendsList() {
            var self = this;


        }
    }
})();