 angular.module('sensorApp').controller('clickCtrl',[clickCtrl]);
    function clickCtrl(){
        var vm = this;
        vm.myStyle = function(value){
            if(value === 1){
                vm.Style1={"teamplateUrl":'/Icon/iconPng/homeClicked.png'};
                vm.Style2={};
                vm.Style3={};
                vm.Style4={};
            }else if(value === 2){
                vm.Style2={"color":'white'};
                vm.Style1={};
                vm.Style3={};
                vm.Style4={};
            }else if(value === 3){
                vm.Style3={"color":'white'};
                vm.Style2={};
                vm.Style1={};
                vm.Style4={};
            }else if(value === 4){
                vm.Style4={"color":'white'};
                vm.Style2={};
                vm.Style3={};
                vm.Style1={};
            }

        };
    }