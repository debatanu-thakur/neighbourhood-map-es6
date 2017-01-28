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
		this.address = 'New York City';
		this.zoom = 17;

		//Assigning the services
	}

	/**
	 * Returns the map object
	 * Keeps the map object 
	 */
	get DrawnMap() {
		return this.map;
	}

	/**
	 * Assigning the services
	 */
	//Geo Service
	get GEOServices() {
		this.geoServices = this.geoServices || new GeoServices(window.navigator);
		return this.geoServices;
	}
	//Map Marker
	get MAPMarker() {
		this.mapMarker = this.mapMarker || new MapMarker();
		return this.mapMarker;
	}
	//Map Info Window
	get MAPINFOWindow() {
		this.mapInfoWindow = this.mapInfoWindow || new MapInfoWindow();
		return this.mapInfoWindow;
	}

	/**
	 * Initializes the map functions
	 */
	initMap(element, apiFetch) {
		// this.setupMap(element, this.area, this.zoom);
		this.GEOServices.GetCurrentLocation((position) => {
			if (position) {
				const coords = position.coords;
				this.area = {
					lat: coords.latitude,
					lng: coords.longitude
				};
			}
			this.setupMap(element, this.area, this.zoom);
			if (apiFetch) {
				apiFetch(this.area);
			}
		});
	}

	/**
	 * AllMarkers
	 */
	get AllMarkers() {
		this.allMarkers = this.allMarkers || [];
		return this.allMarkers;
	}

	set AllMarkers(marker) {
		this.allMarkers.push(marker);
	}

	/**
	 * ClearMarkers
	 */
	ClearMarkers(markers) {
		this.RemoveAllMarkers(markers);
		markers.splice(0);
	}

	/**
	 * Remove All Markers
	 */
	RemoveAllMarkers(markers) {
		markers.forEach((marker) => this.MAPMarker.RemoveMarker(marker));
	}

	/**
     * Set markers up for visible data
     */
    SetMarkers(allData) {
        allData.forEach((item) => {
            this.MAPMarker.SetMapMarker(item.marker, this.DrawnMap);
        })
    }
	/**
	 * Initialize new google Map
	 */
	setupMap(ele, center, zoom) {
		if (this.DrawnMap) {
			//TODO: change the center and zoom if any
		} else {
			this.map = new google.maps.Map(ele, {center, zoom});
		};

	}
};
export default MapOperations;
