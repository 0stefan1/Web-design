(function(){
    "use strict";
    var app = angular.module("sensorApp", ["ui.router", "ngStorage", "d3", "bw.paging"])
    .constant('SENSOR_TYPE', {
        'ID': '0',
        'OUT_OF_RANGE': '0',
        'TITLE': '0'
    });
    app.config(["$stateProvider", "$urlRouterProvider",
               function($stateProvider, $urlRouterProvider){
                   $urlRouterProvider.otherwise("/home");
                   $stateProvider
            .state("home",{
             url:"/home",
             views: {
                'home@':{
                    template: "<home></home>"
                }
            }
        })
            .state('logIn',{
             url: "/logIn",
             views: {
                'logIn@':{
                    template: "<log-in></log-in>"
                }
            }
        })
            .state('logIn.register',{
             url: "/register",
             views: {
                'register@':{
                    template: "<register></register>"
                }
            }
        })
            .state('sensorsHome',{
             url: "/sensorsHome",
             views: {
                'sensorsHome@':{
                    template: "<sensors-home></sensors-home>"
                }
            }
        })

            .state('sensorsHome.settings',{
             url: "/settings",
             views: {
                'settings@':{
                    template: "<settings></settings>"
                }
            }
        })

            .state('sensorsHome.distance',{
             url: "/distance",
             views: {
                'distance@':{
                    template: "<distance></distance>",
                    controller: function($scope, SENSOR_TYPE){
                        SENSOR_TYPE.ID = "33";
                        SENSOR_TYPE.OUT_OF_RANGE = "401";
                        SENSOR_TYPE.TITLE = "Distance";
                    }
                }
            }
            })

            .state('sensorsHome.temperature',{
             url: "/temperature",
             views: {
                'temperature@':{
                    template: "<temperature></temperature>",
                    controller: function($scope, SENSOR_TYPE){
                        SENSOR_TYPE.ID = "31";
                        SENSOR_TYPE.OUT_OF_RANGE = "101";
                        SENSOR_TYPE.TITLE = "Temperature";
                    }
                }
            }
            })

            .state('sensorsHome.electricalCurrent',{
             url: "/electricalCurrent",
             views: {
                'electricalCurrent@':{
                    template: "<electrical-current></electrical-current>",
                    controller: function($scope, SENSOR_TYPE){
                        SENSOR_TYPE.ID = "25";
                        SENSOR_TYPE.TITLE = "Electrical Current";
                    }
                }
            }
            })

            .state('sensorsHome.airQuality',{
             url: "/airQuality",
             views: {
                'airQuality@':{
                    template: "<air-quality></air-quality>",
                    controller: function($scope, SENSOR_TYPE){
                        SENSOR_TYPE.ID = "34";
                        SENSOR_TYPE.OUT_OF_RANGE = "101";
                        SENSOR_TYPE.TITLE = "Air Quality";
                    }
                }
            }
            })

            }
        ]);
}());

