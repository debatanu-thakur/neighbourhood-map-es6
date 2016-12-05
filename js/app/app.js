(function(myApp) {
 'use strict';
 //Global object to communicate between knock out
 //and google maps
 myApp = myApp || {};
 var ViewModel = function() {

 };

 ko.applyBindings(new ViewModel());
}(window.myApp));
