import * as myApp from './app.services';
console.log(myApp);
class AppView {
    constructor(params) {
        const self = this;
        const locationList = myApp.locationList || [];//contains all the places

        self.currentLocation = ko.observable('');
        self.searchNeighbors = ko.observable('');
        self.searchList = ko.observableArray(locationList.slice(0));
        self.search = function() {
            var value = self.searchNeighbors();
            self.searchList.removeAll();
            myApp.locationList.forEach(function(items) {
            if (items.location.toLowerCase().includes(value.toLowerCase())) {
                self.searchList.push(items);
            }
            });
        };

        //TODO: Use singleton object to communicate
        // myApp.area = {
        //     lat: 40.74,
        //     lng: -73.99
        // };

        self.searchNeighbors.subscribe(self.search);
        self.searchList.extend({ rateLimit: 50 });

    }
}

export default AppView;