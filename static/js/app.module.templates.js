(function () {
    'use strict'

    angular.module("ui.yookore.templates", ["template/components/forms/country-select.html"]);
    angular.module("template/components/forms/country-select.html", [])
        .run(["$templateCache", function ($templateCache) {
            $templateCache.put(
                "template/components/forms/country-select.html",
                "<h2>Select Module Template\n" +
                "<select><option value=0>{$ countriesList $}</option></select>"
            );
        }]);
})();