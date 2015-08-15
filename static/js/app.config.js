(function () {
    'use strict';

    angular
        .module('playgroundApp')
        .config(config);

    config.$inject = [
        '$httpProvider',
        '$interpolateProvider',
        '$stateProvider',
        '$urlRouterProvider',
        '$routeProvider',
        '$resourceProvider',
        '$sceDelegateProvider',
        'jwtInterceptorProvider'
    ];

    function config($httpProvider, $interpolateProvider,
                    $stateProvider, $urlRouterProvider,
                    $routeProvider,
                    $resourceProvider, $sceDelegateProvider, jwtInterceptorProvider) {
        // django and angular both support csrf tokens. This tells
        // angular which cookie to add to what header.
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        // Since ajax requests sends the HTTP-Header in order for the request
        // not to return false
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        $httpProvider.defaults.headers.common = {"Content-Type": "application/json"};

        // Routing requests
        // $urlRouterProvider.otherwise('/');

        jwtInterceptorProvider.tokenGetter = function (store) {
            return store.get('jsid');
        }

        $httpProvider.interceptors.push('jwtInterceptor');

        // Since we are using angular with django and they both use the
        // same interpolation markup {{ }} we would change the angular interpolation markup
        // to prevent a conflict
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');

        // Don't strip trailing slashes from calculated URLs
        //$resourceProvider.defaults.stripTrailingSlashes = false;

        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://yadexdigital.com/**'
        ]);
    }
})();