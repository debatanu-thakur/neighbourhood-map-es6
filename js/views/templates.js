(function(myApp){
    'use strict';
    var templates = myApp.templates || [];
    //newTabs
    templates.push( {
        name: 'nav-tabs',
        prop: {
            viewModel: function(params) {
            },        
            template: `<div class="row">
        <div class="col s12">
        <ul class="tabs tabs-fixed-width">
            <li class="tab col s6"><a href="#locationTab">Location</a></li>
            <li class="tab col s6"><a class="active" href="#searchTab">Search</a></li>
        </ul>
        </div>
        <ul id="locationTab" class="col s12">
        <li>  <location-input></location-input></li>
        </ul>
        <ul id="searchTab" class="col s12">
        <li class="search"><search-location></search-location></li></ul>
    </div>`
        }
    });
    /* Location */
    var location = {
        name: 'location-input',
        prop: {
            viewModel: function(params){
                this.currentLocation = ko.observable(params && params.currentLocation || '');
            },
            template: `<div class="container">
					<div class="divider"></div>
					<div class="section">
						<div class="container">
							<div class="nav-wrapper">
								<div class="row search">

								<div class="input-field col s12 search-wrapper card">
								<i class="material-icons prefix">location_on</i>
								<!--currentLocation: The current location -->
          			            <input id="icon_prefix" type="text" data-bind ="value: currentLocation" />
								<label for="icon_prefix" class="places">Location</label>
								<div class="pac-container search-results">
								</div>
							</div>
								</div>
							</div>
						</div>
					</div>
					<div class="divider"></div>
				</div>`

        }
    };
    templates.push(location);

    /* Search */
    var search = {
        name: 'search-location',
        prop: {
            viewModel: function(params) {
                this.searchNeighbors = ko.observable(params && params.searchNeighbors || '');
                this.search = params && params.search || function() {};
            },
            template: `
            <div class="search-wrapper card">
					<!--searchNeighbors: Search the list of neighbors -->
					<input id="search" data-bind="value: searchNeighbors, valueUpdate: 'keyup'"><i class="material-icons" data-bind="click: search">search</i>
					<div class="search-results"></div>
				</div>
                </div>`
        }
    };
    templates.push(search);

    /* Search List for locations */
    var searchList = {
        name: 'search-list',
        prop: {
            viewModel: function(params) {
                this.searchList = ko.observableArray(params && params.searchList || []);
            },
            template: `<ul data-bind="foreach: searchList" style="margin-top:25px">
					<li>
						<a  href="#" class="wave-effect waves-teal" data-bind="text: location"></a>
					</li>
				</ul>`
        }
    }
    templates.push(searchList);

    var mainApp = {
        name: 'main-app',
        prop: {
            viewModel: function(params) {
                var self = this;
                self.currentLocation = ko.observable('');
                self.searchNeighbors = ko.observable('');
                self.searchList = ko.observableArray(locationList.slice(0));
                self.search = function() {
                    var value = self.searchNeighbors();
                    self.searchList.removeAll();
                    locationList.forEach(function(items) {
                    if (items.location.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                        self.searchList.push(items);
                    }
                    });
                };
                myApp.area = {
                    lat: 40.74,
                    lng: -73.99
                };
                self.searchNeighbors.subscribe(self.search);
                self.searchList.extend({ rateLimit: 50 });
            },
            template: `
            <header>
                <nav class="lime">
                    <div class="container">
                        <a href="#" data-activates="nav-mobile" class="collapse">
                            <i class="material-icons">menu</i></a>
                    </div>
                </nav>

                <ul id="nav-mobile" class="side-nav" style="transform: translateX(-100%);">

                    <li class="bold">
                        
                    </li>
                    <li>
                        <nav-tabs></nav-tabs>
                    </li>
                </ul>
            </header>
            <main>
                <div id="map"></div>
            </main>
            <footer></footer>`
        }
    };
    templates.push(mainApp);
    myApp.templates = templates;
})(window.myApp);
