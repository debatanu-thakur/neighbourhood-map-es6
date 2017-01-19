(function(myApp, $) {
 'use strict';
 //Global object to communicate between knockout
 //and google maps
 myApp = myApp || {};

 var ViewModel = function() {
   
 };

 //List of neighbor model
 var ModelList = function(location, lat, lng, show) {
   this.location = location;
   this.lat = lat || '';
   this.lng = lng || '';
   this.show = true;
 };
 var locationList = [
   new ModelList('London'),
   new ModelList('New Delhi'),
   new ModelList('New York'),
   new ModelList('Sydney'),
 ];
 //Get the info about the neighbouring
 //places and highlight them in map
 var API = {
   endpoint: '//api.foursquare.com/v2/venues/search',
   params: {
     client_id: 'TG5QHMCNUODCOUEHWRW033BO4X2MQM2ZUGF1OHA2YCHIS1XF',
     client_secret: 'E1Q4ATW0B23NZ3BGUMH5VECGWFPB3I1GWOFD3HXTMAI1PHZ1',
     v: '',
     ll: ''
   },
   getFormatedDate: function(date) {
     var day = date.getDate(),
      month = date.getMonth() + 1,
      year = date.getFullYear().toString();

      month = month < 10 ? '0' + month.toString() : month.toString();
      day = day < 10 ? '0' + day.toString() : day.toString();

      return (year + month + day);
   },
   getLatLng: function() {
     return (myApp.area.lat.toString() + ',' + myApp.area.lng.toString());
   },
   getInfo: function() {
     var defered = $.Deferred();
     var date = this.getFormatedDate(new Date());
     this.params.v = date;
     this.params.ll = this.getLatLng();
     var model = this;
     $.ajax({
       url: this.endpoint,
       data: $.param(this.params),
       success: function(resp) {
         console.log('foursquare data', resp);
         defered.resolve(resp);
       },
       error: function(err) {
         defered.reject({error: model.messages.apiError});
       }
     });
     return defered.promise();
   },
   messages: {
     error: 'Sorry there was a problem while connecting to the network',
     apiError: 'Could not fetch data for info, please try again.'
   }

 };
 myApp.locationList = locationList;
 window.myApp = myApp;
 myApp.templates.forEach(function(item, index) {
   ko.components.register(item.name, item.prop);
 });
 ko.applyBindings();
}(window.myApp, jQuery));
