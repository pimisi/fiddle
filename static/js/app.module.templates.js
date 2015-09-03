(function () {
    'use strict'

    angular.module("ui.yookore", ["ui.yookore.templates"]);
    angular.module("ui.yookore.templates", [
        "template/components/forms/country-select.html",
        "template/components/forms/date-select.html",
        "template/components/forms/day-select.html"
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


    angular.module("template/components/forms/day-select.html", [])
        .run(["$templateCache", function($templateCache) {
            $templateCache.put(
                "template/components/forms/day-select.html",
                '   <div class="{$ selectClass $}">{$ componentController.model $}' +
                '       <select name="selDay" class="form-control" ' +
                '           ng-model="componentController.model">' +
                '           <option value="" disabled>Day</option>' +
                '           <option value="1">1</option>' +
                '       </select>' +
                '   </div>'
            );
        }]);


    angular.module("template/components/forms/date-select.html", [])
        .run(["$templateCache", function($templateCache) {
            $templateCache.put(
                "template/components/forms/date-select.html",
                '<div class="field-row">{$ modelObject $}' +
                '<div ng-if="ngTransclude" ng-transclude></div>' +
                '   <div class="field33-left">' +
                '       <select name="selMonth" class="form-control" ng-model="formData.month">' +
                '           <option value="" disabled>Month</option>' +
                '           <option value="1">January</option>' +
                '       </select>' +
                '   </div>' +
                '   <div class="field33-mid">' +
                '       <select name="selDay" class="form-control" ng-model="formData.day">' +
                '           <option value="" disabled>Day</option>' +
                '       </select>' +
                '   </div>' +
                '   <div class="field33-right">' +
                '       <select name="selYear" class="form-control" ng-model="formData.year">' +
                '           <option value="" disabled>Year</option>' +
                '       </select>' +
                '   </div>' +
                '</div>'
            )
        }]);

    angular.module("template/components/forms/date-picker.html", [])
        .run(["$templateCache", function($templateCache) {
            $templateCache.put(
                "template/components/forms/date-select.html",
                '<input type="date" placeholder="yyyy-MM-dd" min="minDate" max="maxDate" class="input" />'
            )
        }]);
})();