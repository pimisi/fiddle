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

    MainController.$inject = ['$scope', '$rootScope', '$resource', 'APIHelper', 'BaseServiceModel', 'SERVER_LINKS']

    function MainController($scope, $rootScope, $resource, APIHelper, BaseServiceModel, SERVER_LINKS) {

        // Links
        $scope.links = SERVER_LINKS;

        // get referrer
        var matchPattern = /^http[s]*:\/\/[\w\d\.:]+[\/#]*\/(test)[\/]*/i;

        var currentLocation = document.location.toLocaleString();
        var testMatch = matchPattern.test(currentLocation);

        //APIHelper.getServiceObject("development", "mock").query().$promise.then(function(data) {
        //        console.log(data);
        //    });

        //APIHelper.getServiceObject("development", "mock", function(data) {
        //    console.log(data);
        //
        //    var param = {"username": "pimisi"}
        //    // Get the service URI
        //    APIHelper.getServiceURI(data, "friends.list", "primary", param);
        //});

        var param = {"username": "pimisi"}

        APIHelper.getServiceURIObject(
            "development", "mock", "friends.list", param,
            function (serviceURIObject) {
                console.log(serviceURIObject);
            });

        /* if (testMatch) {
         handleContactUsRoute();
         } else {
         // Do these only for the contact us route
         $rootScope.$on('$locationChangeStart', function (event, next, current) {

         var contactUsMatch = matchPattern.test(next);

         if (contactUsMatch) {
         handleContactUsRoute();
         }
         });
         } */

        var friendList = new BaseServiceModel("friends.list", param);

        friendList.fetchJSONObject().then(function() {
            console.log = friendList.responsePayload;
        });


    }

})(
    (function () {
        var scripts = document.getElementsByTagName("script");
        var currentScriptPath = scripts[scripts.length - 1].src;

        return currentScriptPath;
    })()
);