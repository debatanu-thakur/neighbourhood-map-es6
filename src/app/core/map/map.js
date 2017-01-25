// function initMap() {
// 	'use strict';
// 	//TODO: Perform Map related operation
// 	var map = new google.maps.Map(document.getElementById('map'), {
// 	  center: myApp.area || {lat: 40.74, lng: -73.99 },
// 	  zoom: 13
// 	});

// 	var input = document.getElementById('icon_prefix');
// 	// var autocomplete = new google.maps.places.Autocomplete(input);
// 	var displaySuggestions = function(predictions, status) {
// 		if (status !== google.maps.places.PlacesServiceStatus.OK) {
// 			// alert(status);
// 			window.NOTIFY.error_message(status, 4000);
// 			return;
// 		}

// 		predictions.forEach(function(prediction) {
// 			var anchor = document.createElement('li');
// 			anchor.appendChild(document.createTextNode(prediction.description));
// 			document.getElementsByClassName('pac-container')[0].appendChild(anchor);
// 		});
// 	};
// 	var clearResults = function() {
// 		var results = document.getElementsByClassName('pac-container')[0];
// 		while (results.firstChild) {
// 			results.removeChild(results.firstChild);
// 		}
// 	};
// 	var service = new google.maps.places.AutocompleteService();
// 	var clearTime;
// 	input.addEventListener('keyup', function() {
// 		if (clearTime) {
// 			clearTimeout(clearTime);
// 			clearResults();
// 		}
// 		clearTime = setTimeout(function() {
// 			service.getQueryPredictions({
// 				input: this.value
// 			}, displaySuggestions);
// 		}.bind(this), 100);
// 	});

// }
import GeoServices from './geoServices';
import MapMarker from './mapMarker';
import MapInfoWindow from './mapInfoWindow';

class MapOperations {
	constructor() {
		//Assigning default location
		//to map
		this.area = {
			lat: 40.74,
			lng: -73.99
		};
		this.zoom = 13;
	}

	/**
	 * Returns the map object
	 * Keeps the map object 
	 */
	get Map() {
		return this.map;
	}

	/**
	 * Initializes the map functions
	 */
	initMap(element) {
		this.setupMap(element, this.area, this.zoom);
	}

	/**
	 * Initialize new google Map
	 */
	setupMap(ele, center, zoom) {
		if (this.map) {
			//TODO: change the center and zoom if any
			console.log('i am ahere');
		} else {
			console.log('i am somewhere', ele, center, zoom);			
			this.map = new google.maps.Map(ele, {center, zoom});
		};

	}
};
export default MapOperations;
