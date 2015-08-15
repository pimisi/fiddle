(function () {
    'use strict';

    angular
        .module('playgroundApp')
        .filter('encodeURI', encodeURI)
        .filter('nl2br', nl2br);

    function encodeURI() {
        return window.encodeURI;
    }

    nl2br.$inject = ['$sanitize'];
    function nl2br($sanitize) {
        return function nl2br(str, is_xhtml) {
            var breakTag = (/xhtml/i).test(document.doctype) ? '<br />' : '<br>';
            str = (str + '').replace(/(\r\n|\n\r|\r|\n|&#10;&#13;|&#13;&#10;|&#10;|&#13;)/g, breakTag + '$1');
            return $sanitize(str);

        };
    }
})();