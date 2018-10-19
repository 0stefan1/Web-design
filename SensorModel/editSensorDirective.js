var app = angular.module("sensorApp");
app.directive('editSensor', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/editSensorDirectiveView.html',
        controller: function($scope, sensorModelService, $window, $localStorage, $sessionStorage){
            $scope.editButton = true;
            $scope.editDisplay = false;
            $sessionStorage.editDisplay = $scope.editDisplay;
            $scope.sensorEditError = false;
            $scope.sensorEditSuccess = false;
            $scope.startEdit = function(){
                $scope.editButton = false;
                $scope.detailsDisplay = false;
                $scope.deleteButton = false;
                $scope.editLocation = false;
                $scope.measurementsButton = false;
                $scope.chartButton = false;
                if($scope.editDisplay == false){
                    $scope.editDisplay = true;
                    $sessionStorage.editDisplay = $scope.editDisplay;
                    $scope.editButton = false;
                }
            };
            if ($localStorage.email && $localStorage.password){
              $scope.encodedData = btoa($localStorage.email +':'+ $localStorage.password)
            }else{
                $scope.encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
            }
            $scope.getSensor = function(gatewayAddress, clientAddress){
                sensorModelService.getSensorsByAddress(gatewayAddress, clientAddress, $scope.encodedData)
                        .then(function(sensor){
                                var name = sensor.name;
                                var uploadInterval = sensor.uploadInterval;
                                var batchsize = sensor.batchSize;
                                $scope.editSensor = {name, uploadInterval, batchsize};
                            $scope.sensorEdit = function(editName,  editDays, editHours, editMinutes, editBatchSize, gatewayAddress, clientAddress, sensorId){
                                if (editName){
                                    $scope.editSensor.name = editName
                                } 
                                if(editDays || editHours || editMinutes){
                                    if (editDays == null){
                                        editDays = 0;
                                    }
                                    if (editHours == null){
                                        editHours = 0;
                                    }
                                    if(editMinutes == null){
                                        editMinutes = 0;
                                    }
                                    $scope.editSensor.uploadInterval = (editDays* 1440) + (editHours* 60) + editMinutes;
                                } 
                                if(editBatchSize){
                                    $scope.editSensor.batchsize = editBatchSize;
                                } 
                                sensorModelService.updateSensors($scope.editSensor, gatewayAddress, clientAddress, $scope.encodedData)
                                    .then(function(){
                                        $scope.sensorEditError = false;
                                        $scope.sensorEditSuccess = true;
                                        $scope.sensor.uploadInterval=$scope.editSensor.uploadInterval;
                                        $scope.sensor.batchSize= $scope.editSensor.batchsize;
                                        $scope.sensor.name = $scope.editSensor.name;
                                    })
                                    .catch(function(response){
                                        $scope.message = response.data.message;
                                        $scope.sensorEditError = true;
                                        $scope.sensorEditSuccess = false;
                                    });
                            };
                        })
            }
            $scope.cancelEditSensor = function(){
                $scope.editButton = true;
                $scope.editDisplay = false;
                $scope.detailsDisplay = true;
                $scope.deleteButton = true;
                $scope.measurementsButton = true;
                $scope.editLocation = true;
                $scope.chartButton = true;
                $scope.sensorEditError = false;
                $scope.sensorEditSuccess = false;
            };
        }
    }
});
