/**
 The apps.module.js file the base file for the angularjs part of the application

 @author Paul Imisi
 @data 29/07/2015
 */

(function () {
    'use strict';

    angular
        .module('playgroundApp', [
            'ngRoute',
            'ngSanitize',
            'ngResource',
            'ngCookies',
            'ngMessages',
            'ui.router',
            'ui.bootstrap',
            'angular-storage',
            'angular-jwt']
    )
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        })
        .constant('USER_ROLES', {
            all: '*',
            user: 'generalUser',
            administrator: 'administrativeUser',
            guest: 'guestUser'
        })
        .constant('SERVER_LINKS', {
            signUp: "/signup"
        })
        .constant('API_PREFERRED_KEYS', {
            main: 'development',
            fallback: 'mock'
        });
})();