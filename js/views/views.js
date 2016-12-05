(function(myApp) {
 'use strict';
 //Global object to communicate between knock out
 //and google maps
 myApp = myApp || {};
 var ViewModel = function() {
   myApp.area = {
     lat: 40.74,
     lng: -73.99
   }
 };
 window.myApp = myApp;
 ko.applyBindings(new ViewModel());
}(window.myApp));
