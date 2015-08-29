/**
 components.directives.js

 @author Paul Imisi
 @data 24/08/2015
 */
(function () {
    'use strict';

    angular
        .module('playgroundApp')
        .directive("dateSelect", DateSelect)
        .directive("countrySelect", CountrySelect);

    DateSelect.$inject = ['$compile'];

    function DateSelect($compile) {
        return {
            restrict: 'E',
            scope: {
                ngModel: "=",
                dateOptions: "=",
                opened: "="
            },
            require: 'dateSelect',
            controller: function ($scope) {
                $scope.formData      = {};
                $scope.formData.date = "";
                $scope.opened = false;

                // Date-picker
                $scope.dateOptions = {
                    'year-format': "'yy'",
                    'show-weeks' : false
                };


                /*$scope.formats = ['d-MM-yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                $scope.format = $scope.formats[0];
                $scope.maxDate = '2020-06-22';
                $scope.status = {opened: false};
                $scope.minDate = $scope.minDate ? null : new Date();
                $scope.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };
                $scope.open = function ($event) {
                    $scope.status.opened = true;
                };

                $scope.today = function () {
                    $scope.dt = new Date();
                };
                $scope.today(); */

            },
            templateUrl: 'template/components/forms/date-select.html',
            replace: true,
            link: function (scope, element, attributes) {
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
                    "ng-model": "country",
                    //"ng-init": "country='0'"
                }

                // Iterate the available attributes and look out for the missing default
                angular.forEach(attributes, function (value, key) {
                    if (!angular.isObject(value)) {
                        console.log(key + ":" + value);
                        // Remove any key-value pair from the default object if found to have been passed
                        // in to the element attributes during use
                        if (defaultAttributes[key] != undefined) {
                            delete defaultAttributes[key];
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
                $compile(element)(scope);

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

})();