class AppView {
    constructor(params) {
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