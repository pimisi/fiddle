(function () {
    'use strict'

    angular.module("ui.yookore", ["ui.yookore.templates"]);
    angular.module("ui.yookore.templates", ["template/components/forms/country-select.html"]);

    angular.module("template/components/forms/country-select.html", [])
        .run(["$templateCache", function ($templateCache) {
            $templateCache.put(
                "template/components/forms/country-select.html",
                "<select " +
                "class=\"form-control\" " +
                "ng-options=\"country.iso as country.name for country in countriesList track by country.id\">\n" +
                "    <option value=\"\" class=\"select-placeholder\">Country</option>\n" +
                "</select>"
            );
        }]);
})();