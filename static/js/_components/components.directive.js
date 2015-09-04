/**
 components.directives.js

 For best practices as stated in the AngulaJS Documentation for directives
 We would prefix our directives with py which stands for Project Yookore

 @author Paul Imisi
 @data 24/08/2015
 */
(function () {
    'use strict';

    angular
        .module('playgroundApp')
        .controller("InputComponentController", ['$scope', '$attrs', InputComponentController])
        .controller("CountriesListController", ['$scope', '$rootScope', 'BaseModelService', '$attrs', CountriesListController])
        .directive("pyPhoneInput", ['$rootScope', '$compile', PhoneInput])
        .directive("pyDateInput", ['$compile', DateInput])
        .directive("pyDaySelect", ['$compile', DaySelect])
        .directive("pyMonthSelect", ['$compile', MonthSelect])
        .directive("pyYearSelect", ['$compile', YearSelect])
        .directive("pyCountrySelect", ['$rootScope', '$compile', CountrySelect]);

    /**
     * Controllers
     */
    function InputComponentController($scope, $attrs) {
        var directiveScope = $scope; // $scope.$parent;
        this.options = directiveScope.$eval($attrs.field);
    }

    function CountriesListController($scope, $rootScope, BaseModelService, $attrs) {
        var directiveScope = $scope.$parent;
        this.options = directiveScope.$eval($attrs.field);
        this.fetchCountries = function () {
            var ServiceCall = new BaseModelService("countries.list");   // Create an instance of the Model

            ServiceCall.fetchJSONArray().then(function () {               // Get the countries from the service
                // Notify other listeners that the data is ready to be used
                $rootScope.$broadcast("countries-list-ready", ServiceCall.responsePayload);
            });
        }
    }

    function PhoneInput($rootScope, $compile) {
        return {
            replace: true,
            scope: {
                formName: "@?",
                model: "@?ngModel"
            },
            controller: 'CountriesListController',
            controllerAs: 'countriesController',
            templateUrl: "template/components/forms/phone-select-input.html",
            link: function(scope, element, attrs) {
                scope.countriesList = [];

                console.log("form name");
                console.log(scope.formName);

                // Listen for when the countries list data is ready
                $rootScope.$on("countries-list-ready", function (event, countries) {
                    console.log("Countries list loaded");
                    // Assign retrieved data to the scope's countriesList for update of the view
                    scope.countriesList = countries;
                    //console.log(scope.countriesList);
                    console.log(scope.$parent);
                });
            }
        }
    }

    function DaySelect($compile) {
        return {
            replace: true,
            scope: {
                modelObject: "@?",
                model: '=?'
            },
            controller: 'InputComponentController',
            controllerAs: 'componentController',
            templateUrl: "template/components/forms/day-select.html",
            link: function (scope, element, attrs) {

                // Det the default modelObject
                //scope.modelObject = scope.modelObject == undefined ? "formData" : scope.modelObject;
                //scope.model = scope.$eval(scope.modelObject + ".days");
                //$scope.$parent

                scope.selectClass = "field33-left";
            }
        }
    }

    function MonthSelect($compile) {
        return {}
    }

    function YearSelect($compile) {
        return {}
    }

    function DateInput($compile) {
        return {
            restrict: 'EA',                                  // Restrict to just an element
            /* scope: {                                        // Our isolated scope
             ngModel: '=',                               // Using the shorthand syntax. Same as ndModel:'=ngModel'
             dateOptions: '=?',                          // ? denotes this scope model is 'optional'
             minDate: '=?',
             maxDate: '=?'
             }, */
            scope: {
                modelObject: "@?",
                layoutFormat: "@?"
            },
            /*controller: function($scope) {                  // Use when there is a need to expose an API
             // To other directives
             //$scope.title = title;
             },*/
            transclude: true,
            replace: true,
            templateUrl: function (element, attributes) {
                // If type is not specified default to select
                var defaultType = "select";
                var type = (!attributes.hasOwnProperty('type')) ? defaultType : (attributes.type).toLowerCase();

                // Type must be either select or picker
                if (['select', 'picker'].indexOf(type) == -1) {
                    console.warn(type + ' is not a valid pyDateInput type');
                    type = defaultType;
                }

                return 'template/components/forms/date-' + type + '.html'
            },
            link: function (scope, element, attrs) {         // Because we need to modify the DOM
                console.log(scope.modelObject);
                console.log(scope.layoutFormat);
            }
        }
    }

    function CountrySelect($rootScope, $compile) {
        return {
            restrict: 'AE',
            require: "pyCountrySelect",
            controller: 'CountriesListController',
            controllerAs: 'countriesController',
            templateUrl: 'template/components/forms/country-select.html',
            replace: true,
            link: function (scope, element, attributes, countriesListController) {

                scope.countriesList = []; // Initialize the list as empty

                // Make the countries service data call from the controller
                countriesListController.fetchCountries();

                element.removeAttr("py-country-select"); // Remove this attribute in a case where it is used as an attribute

                // Create the default attributes for the element in a situation
                // where there are not added to the directive element during use
                var defaultAttributes = {
                    name: "selCountry",
                    id: "selCountry",
                    "ng-model": "formDate.country",
                    //"ng-init": "country='0'"
                }

                // Iterate the available attributes and look out for the missing default
                angular.forEach(attributes, function (value, key) {
                    if (!angular.isObject(value)) {
                        console.log(key + ":" + value);
                        // Remove any key-value pair from the default object if found to have been passed
                        // in to the element attributes during use

                        var currentAttribute = key == "ngModel" ? "ng-model" : key;

                        if (defaultAttributes[currentAttribute] != undefined) {
                            delete defaultAttributes[currentAttribute];
                        }

                    }
                });

                // Set the remaining default attributes to the element
                angular.forEach(defaultAttributes, function (value, key) {
                    if (value != null) {
                        element.attr(key, value);
                    }
                });

                // Compile the element
                //$compile(element)(scope);

                // Listen for when the countries list data is ready
                $rootScope.$on("countries-list-ready", function (event, countries) {
                    console.log("Countries list loaded");
                    // Assign retrieved data to the scope's countriesList for update of the view
                    scope.countriesList = countries;
                    //console.log(scope.countriesList);
                });
                console.log("Countries Select rendered");
            }
        }
    }

    /*DateSelect.$inject = ['$compile'];

     function DateSelect($compile) {
     return {
     restrict: 'E',
     scope: {
     ngModel: "=",
     dateOptions: "=",
     required: "="
     },
     require: 'dateSelect',
     controller: function ($scope) {
     $scope.formData      = {};
     $scope.formData.date = "";
     $scope.opened = false;

     // Date-picker
     $scope.dateOptions = {
     'year-format': "'yyyy'",
     'show-weeks' : false
     };

     var defaultAttributes = {
     name: "pickerDate",
     id: "pickerDate",
     "ng-model": "formData.date",
     //"ng-init": "country='0'"
     }

     },
     templateUrl: 'template/components/forms/date-select.html',
     replace: true,
     link: function (scope, element, attributes) {

     scope.minDate = scope.minDate ? null : new Date();
     scope.maxData = scope.maxDate ? null : '2015-06-22';
     scope.open = function(event) {
     console.log('open');
     event.preventDefault();
     event.stopPropagation();
     scope.opened = true;
     }

     scope.clear = function() {
     scope.ngModel = null
     }
     // Compile the element
     //$compile(element)(scope);
     }
     }
     }

     CountrySelect.$inject = ['BaseModelService', '$compile'];

     function CountrySelect(BaseModelService, $compile) {
     return {
     restrict: 'AE',
     require: "countrySelect",
     priority: 1001,     // We want this directive to compile first
     terminal: true,     // We don't want any other processing after it
     scope : {
     ngModel: "="
     },
     controller: function ($scope, $attrs) {
     this.fetchCountries = function () {
     var ServiceCall = new BaseModelService("countries.list");   // Create an instance of the Model

     ServiceCall.fetchJSONArray().then(function () {               // Get the countries from the service
     // Notify other listeners that the data is ready to be used
     $scope.$broadcast("countries-list-ready", ServiceCall.responsePayload);
     });
     }
     },
     templateUrl: 'template/components/forms/country-select.html',
     replace: true,
     link: function (scope, element, attributes, countrySelectController) {

     scope.countriesList = []; // Initialize the list as empty

     // Make the countries service data call from the controller
     countrySelectController.fetchCountries();

     element.removeAttr("country-select"); // Remove this attribute in a case where it is used as an attribute

     // Create the default attributes for the element in a situation
     // where there are not added to the directive element during use
     var defaultAttributes = {
     name: "selCountry",
     id: "selCountry",
     "ng-model": "formDate.country",
     //"ng-init": "country='0'"
     }

     // Iterate the available attributes and look out for the missing default
     angular.forEach(attributes, function (value, key) {
     if (!angular.isObject(value)) {
     console.log(key + ":" + value);
     // Remove any key-value pair from the default object if found to have been passed
     // in to the element attributes during use

     var currentAttribute = key == "ngModel" ? "ng-model" : key;

     if (defaultAttributes[currentAttribute] != undefined) {
     delete defaultAttributes[currentAttribute];
     }

     }
     });

     // Set the remaining default attributes to the element
     angular.forEach(defaultAttributes, function (value, key) {
     if (value != null) {
     element.attr(key, value);
     }
     });

     // Compile the element
     //$compile(element)(scope);

     // Listen for when the countries list data is ready
     scope.$on("countries-list-ready", function (event, countries) {
     console.log("Countries list loaded");
     // Assign retrieved data to the scope's countriesList for update of the view
     scope.countriesList = countries;
     });
     console.log("Countries Select rendered");
     }
     }
     }
     */

})();