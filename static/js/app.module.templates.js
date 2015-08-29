(function () {
    'use strict'

    angular.module("ui.yookore", ["ui.yookore.templates"]);
    angular.module("ui.yookore.templates", [
        "template/components/forms/country-select.html",
        "template/components/forms/date-select.html"
    ]);

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

    angular.module("template/components/forms/date-select.html", [])
        .run(["$templateCache", function($templateCache) {
            $templateCache.put(
                "template/components/forms/date-select.html",
                '<p class="input-group">\n' +
                '   <input type="text" class="form-control" datepicker-popup="" ' +
                'ng-model="dt" is-open="opened" min="minDate" max="\'2015-06-22\'" ' +
                'datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ' +
                'ng-required="true" close-text="Close" />\n' +
                '   <span class="input-group-btn">\n' +
                '       <button class="btn btn-default" ng-click="open($event)">' +
                '           <i class="glyphicon glyphicon-calendar"></i>' +
                '       </button></span>' +
                '</p>'
            )
        }]);
})();