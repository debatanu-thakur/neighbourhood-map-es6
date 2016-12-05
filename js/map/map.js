function initMap() {
	'use strict';
	//TODO: Perform Map related operation
	// var map = new google.maps.Map(document.getElementById('map'), {
	//   center: {lat: 40.74, lng: -73.99 },
	//   zoom: 13
	// });
	var input = document.getElementById('searchPlace');
	// var autocomplete = new google.maps.places.Autocomplete(input);
	var displaySuggestions = function(predictions, status) {
		if (status != google.maps.places.PlacesServiceStatus.OK) {
			alert(status);
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

}
