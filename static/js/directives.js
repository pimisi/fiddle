/**
 directives.js

 @author Paul Imisi
 @data 29/07/2015
 */
(function () {
    'use strict';

    angular
        .module('playgroundApp')
        .directive('formAutofillFix', formAutofillFix)
        .directive('compareTo', compareTo)
        .directive('numbersOnly', numbersOnly)
        .directive('alerts', alerts)
        .directive('validSubject', subjectValidation);

    function formAutofillFix() {
        return function (scope, elem, attrs) {
            // Fixes Chrome bug when using ng-submit
            elem.prop('method', 'POST');

            // Fix autofill issues when using ng-submit
            // and when angular doesn't know about autofilled inputs
            if (attrs.ngSubmit) {
                setTimeout(function () {
                    elem.unbind('submit').submit(function (e) {
                        e.preventDefault();
                        elem.find('input, textarea, select')
                            .trigger('input')
                            .trigger('change')
                            .trigger('keydown');
                        scope.$apply(attrs.ngSubmit);
                    });
                }, 0);
            }
        };
    }

    function compareTo () {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareValues"
            },
            link: function (scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function (modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function () {
                    ngModel.$validate();
                });
            }
        };
    };

    function numbersOnly() {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }

                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    }

    function alerts() {
        return {
            restrict: "AE",
            templateUrl:"js/_templates/alerts.html",
            scope:true,
            link: function (scope) {
                scope.currentAlerts = alerting.currentAlerts;
            }

        }
    }

    function subjectValidation() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, controller) {
                controller.$validators.subject = function(modelValue, viewValue) {

                    if (viewValue.toLowerCase() != "subject") {
                        // Valid selection
                        return true;
                    }
                    // Invalid selection
                    return false;
                }
            }
        }
    }

})();