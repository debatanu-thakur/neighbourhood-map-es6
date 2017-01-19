function initMap() {
	'use strict';
	//TODO: Perform Map related operation
	var map = new google.maps.Map(document.getElementById('map'), {
	  center: myApp.area || {lat: 40.74, lng: -73.99 },
	  zoom: 13
	});

	var input = document.getElementById('icon_prefix');
	// var autocomplete = new google.maps.places.Autocomplete(input);
	var displaySuggestions = function(predictions, status) {
		if (status !== google.maps.places.PlacesServiceStatus.OK) {
			// alert(status);
			window.NOTIFY.error_message(status, 4000);
			return;
		}

		predictions.forEach(function(prediction) {
			var anchor = document.createElement('li');
			anchor.appendChild(document.createTextNode(prediction.description));
			document.getElementsByClassName('pac-container')[0].appendChild(anchor);
		});
	};
	var clearResults = function() {
		var results = document.getElementsByClassName('pac-container')[0];
		while (results.firstChild) {
			results.removeChild(results.firstChild);
		}
	};
	var service = new google.maps.places.AutocompleteService();
	var clearTime;
	input.addEventListener('keyup', function() {
		if (clearTime) {
			clearTimeout(clearTime);
			clearResults();
		}
		clearTime = setTimeout(function() {
			service.getQueryPredictions({
				input: this.value
			}, displaySuggestions);
		}.bind(this), 100);
	});

	//GEO-Location
	var geocoder = new google.maps.Geocoder();
	/**
	 * Get the current location
	 */
	var getCurrentLoc = function() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				//TODO: Set the info window on the Location
				//and fetch the neighbours
				console.log('position', position);
			}, function() {
				console.log('error');
				//TODO: take default location and load neighbors
				//Show message that failed to locate				
			});
		} else {
			//same as failed locate
		};
	};
	
	/**
	 * Get the place name by passing the latitude
	 */
	var getLocName = function(lat, lng) {

		geocoder.geocode({
			location: {
				lat: lat,
				lng: lng
			}
		}, GeocoderResult);
	}
	/**
	 * Get the lat-lng for a place adress
	 */
	var getLocation = function(adress) {

		geocoder.geocode({
			address: adress
		}, GeocoderResult);
	}

	/**
	 * Get the geo coder result
	 */
	var GeocoderResult = function (results, status) {
		if (status === 'OK') {
			//TODO: Populate the text in the search box
			//For loc = results[0].geometry.location.lat()
			//for add = results[1].formatted_address
			console.log('details ', results[0].geometry.location.lat(), results[0].formatted_address);
		} else {
			//TODO: Alert that it failed to load the data
		};
	}
	// getLocation('New York');
	// getLocName(myApp.area.lat, myApp.area.lng);
	

}

/**
 * Restrict display of context menu based on report status
 */
