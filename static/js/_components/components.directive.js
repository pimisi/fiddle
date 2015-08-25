/**
 components.directives.js

 @author Paul Imisi
 @data 24/08/2015
 */
(function () {
    'use strict';

    angular
        .module('playgroundApp')
        .directive("countrySelect", CountrySelect);

    CountrySelect.$inject = ['BaseModelService'];

    function CountrySelect(BaseModelService) {
        return {
            restrict: 'AE',
            require: "countrySelect",
            controller: function($scope) {
                $scope.countriesList = {}
                this.fetchCountries = function() {
                    var ServiceCall = new BaseModelService("countries.list");

                    ServiceCall.fetchJSONArray().then(function(){
                        $scope.countriesList = ServiceCall.responsePayload;
                        //console.log(ServiceCall.responsePayload);
                        $scope.$broadcast("countries-list-ready", $scope.countriesList)
                    });
                }
            },
            template: "<select><option value=0>{$ countriesList $}</option></select>",
            replace: true,
            link: function(scope, element, attributes, countrySelectController) {
                // Get the country service data
                countrySelectController.fetchCountries();

                scope.$on("countries-list-ready", function(event, countries) {

                    console.log("Countries list loaded");
                    console.log(countries);
                    console.log("countries from scope");
                    console.log(countrySelectController.countriesList);
                });
                console.log("Countries Select rendered");
            }
        }
    }

})();