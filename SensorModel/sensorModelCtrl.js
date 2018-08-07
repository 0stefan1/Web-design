(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("sensorModelCtrl",["$scope", 'SENSOR_TYPE', "$localStorage", "$sessionStorage", "$timeout",  "sensorModelService","$http", function sensorModelCtrl($scope, SENSOR_TYPE, $localStorage, $sessionStorage, $timeout, sensorModelService, $http) {
        var vm = this;
        vm.titleGrid = SENSOR_TYPE.TITLE;
        console.log(SENSOR_TYPE);
        $scope.sensorData = true;
        vm.expandSelected = function(sensor){
            vm.sensors.forEach(function(val){
                val.expanded=false;
            })
            sensor.expanded=true;
        };
       //sensors
      $scope.searchSensor ='';
       if($localStorage.email && $localStorage.password){
          $scope.encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
       }else {
          $scope.encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
        }
       $scope.sensPerPage = 50;
       sensorModelService.getFinalPage($scope.sensPerPage, $scope.encodeduser)
        .then(finalPage);
        function finalPage(data){
           $scope.numPages = data;
           console.log('Last Page: ', $scope.numPages)
       }
       sensorModelService.getAllSensors($scope.sensPerPage, $scope.encodeduser)
            .then(allSensors);
        function allSensors(data){
          $scope.allSensors = data;
        }
        vm.setPage = function(){
          $scope.loading=true;
          sensorModelService.getSensors($scope.currentPage, $scope.sensPerPage, $scope.encodeduser)
             .then(function(response){
               vm.sensors = response.data;
               $scope.loading=false;
               console.log("Current Page: ", $scope.currentPage);
             })
        }
        $scope.$watch('currentPage', vm.setPage);
        $scope.loading = true;
        $scope.sensorData = false;
        $scope.noSensorData = false;
        $scope.setPageSize = function(pageSize){
            if(pageSize){
            $scope.sensPerPage = pageSize;
            if($localStorage.email && $localStorage.password){
                $scope.encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
            }else{
                $scope.encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
            }
            console.log($scope.encodeduser)
            console.log($scope.encodeduser)
            sensorModelService.getSensors($scope.currentPage, $scope.sensPerPage, $scope.encodeduser)
              .then(function(response){
                vm.sensors = response.data;
              })
            }
          }
        sensorModelService.getSensors($scope.currentPage, $scope.sensPerPage, $scope.encodeduser)
         .then(function(response) {
            vm.sensors = response.data;
            $scope.loading = false;
            $scope.noSensorsData = false;
            $scope.sensorData = true;
         })
         .catch(function(response){
            $scope.noSensorsData = true;
            $scope.loading = false;
            $scope.sensorData = false;
         });

         function update(){
         vm.getLastRead = function(GA, CA){
            $scope.noRead = false;
            $scope.detailsData = false;
            $scope.loadingDetails = true;
            sensorModelService.getMeasurements(GA, CA, '1', '1')
                .then(measureSuccess)
                .catch(measureError)
            function measureSuccess(measurements){
                        vm.lastRead = measurements;
                        $scope.noRead = false;
                        $scope.detailsData = true;
                        $scope.loadingDetails = false;
                    }
            function measureError(measurements){
                      $scope.noRead = true;
                      $scope.loadingDetails = false;
                      $scope.detailsData = true;
                  }
            vm.lastRead = null;
        }
      }
      update();
        sensorModelService.getAllSensors($scope.sensPerPage, $scope.encodeduser)
            .then(function(response){
                $scope.totalSensors = response;
            });



       //live view

    //    vm.reload = function(){
    //     $http.get("http://192.168.0.18:32333/api/sensors/46/readings")
    //     .then(function(response) {
    //         vm.sensor1 = response.data;
    //     });
    //     $timeout(function(){
    //         vm.reload();
    //     },1000)
    // };
    // vm.reload();

    }]);
}());



var app = angular.module('sensorApp');
app.directive('caGaValidation', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (value.indexOf("0x") != 0) {
                    mCtrl.$setValidity('charE', false);
                } else {
                    mCtrl.$setValidity('charE', true);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});

app.directive('nameValidation', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
            if ((value.indexOf("--") > -1) || (value.indexOf("__") > -1) || (value.indexOf("-_") > -1) || (value.indexOf("_-") > -1) || (value.indexOf("-") == 0) || (value.indexOf("_") == 0) || value.indexOf("-") == (value.length - 1) || value.indexOf("_") == (value.length - 1) || (value.match(/[a-z]/i) > -1)) {
                    mCtrl.$setValidity('charE', false);
                } else {
                    mCtrl.$setValidity('charE', true);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});
