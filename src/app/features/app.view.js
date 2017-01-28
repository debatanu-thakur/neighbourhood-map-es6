import myApp from './app.services';
class AppView {
    constructor(params) {
        const self = this;
        const locationList = myApp.locationList || [];//contains all the places

        self.currentLocation = ko.observable('');
        self.searchNeighbors = ko.observable('');
        self.searchList = ko.observableArray(locationList.slice(0) || []);
        myApp.SEARCHLIST = self.searchList;
        self.search = function() {
            var value = self.searchNeighbors();
            self.searchList.removeAll();
            console.log(myApp.locationList, value);
            myApp.locationList.forEach(function(items) {
            if (items.name.toLowerCase().includes(value.toLowerCase())) {
                console.log('items. ', items);
                self.searchList.push(items);
            }
            });
        };

        self.searchNeighbors.subscribe(self.search);
        self.searchList.extend({ rateLimit: 50 });

    }
}

export default AppView;