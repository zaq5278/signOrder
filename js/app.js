
angular.module('myApp', ['ionic','myApp.signOrderController'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
// var myUrl = 'http://192.168.16.225:9999/';
// var myUrl = 'http://100.100.1.46:9999/';

var myUrl = 'http://222.88.22.72:100/';
// var myUrl = 'http://100.100.1.47:9999/';
