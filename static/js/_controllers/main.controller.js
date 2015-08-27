(function (currentScriptPath) {
    'use strict';

    angular.module('playgroundApp')
        .config(config)
        .controller('MainController', MainController);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        'use strict';

        $routeProvider
            .when('/', {
                controller: 'MainController',
                templateUrl: '/static/js/_partials/main.home.html'
            }) // Home route
            .when('/creche', {
                controller: 'MainController',
                templateUrl: '/static/js/_partials/main.creche.html'
            }) // Creche route
            .when('/swing', {
                controller: 'MainController',
                templateUrl: '/static/js/_partials/main.swing.html'
            }) // Swing route
            .when('/play-pen', {
                controller: 'MainController',
                templateUrl: '/static/js/_partials/main.play.pen.html'//currentScriptPath.replace('main.controller.js', 'main.publisher.html')
            }) // Play Pen route
            .otherwise({
                redirectTo: '/'
            })
    }

    MainController.$inject = [
        '$scope', '$rootScope', '$resource',
        'APIHelper', 'BaseModelService', 'FriendModelService'];

    function MainController($scope, $rootScope, $resource, APIHelper, BaseModelService, FriendModelService) {

        $scope.friendsList = $scope.hasOwnProperty('friendsList') ? $scope.friendsList : {};

        // Match the home route
        var matchPattern = /^http[s]*:\/\/[\w\d\.:]+[\/#]*$/i;

        var currentLocation = document.location.toLocaleString();
        var routeMatch = matchPattern.test(currentLocation);

        if (routeMatch) {
            /* var param = {"username": "pimisi"}

            var friendList = new FriendModelService();

            console.log(friendList);

            friendList.getFriendsList(param).then(function () {
                console.log(friendList.responsePayload);
                $scope.friendsList = friendList.responsePayload;
            });*/

            // Country list

        }

        // Form processing and POST requests

        $scope.country = 0;

        $scope.master = {}

        $scope.testForm = {
            "isProcessing": false,
            "completed": false
        };

        $scope.reset = function (form) {
            if (form) {
                form.$setPristine();
                form.$setUntouched();
                $scope.testForm = form;
                $scope.testForm.isProcessing = false;
                $scope.testForm.completed = false;
            }

            $scope.testModels = angular.copy($scope.master);
        }

        $scope.processForm = function (form) {
            if (form.$valid) {
                $scope.testForm = form;
                $scope.testForm.isProcessing = true;
                $scope.alert = {
                    type: 'info',
                    msg: "Hi " + $scope.testModels.firstname + ", your form is being processed. Please wait..."
                }

                var friendList = new FriendModelService();
                console.log(friendList);

                friendList.queryDirect = true;

                var options = {
                    requestedService: '/api/general/post-data',
                    payload: $scope.testModels
                }
                friendList.sendMessage(options).then(function () {

                    $scope.alert = {
                            type: 'success',
                            msg: "Your data has been processed " + $scope.testModels.firstname
                        }

                    console.log("Form has been processed. Response payload is:");
                    console.log(friendList.responsePayload);
                });

            }
        }

        $scope.reset();

    }

})(
    (function () {
        var scripts = document.getElementsByTagName("script");
        var currentScriptPath = scripts[scripts.length - 1].src;

        return currentScriptPath;
    })()
);