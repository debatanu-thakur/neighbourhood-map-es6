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
            const value = self.searchNeighbors();

            self.searchList.removeAll();
            myApp.locationList.forEach(function(items) {
            if (items.name.toLowerCase().includes(value.toLowerCase())) {
                self.searchList.push(items);
            }
            });
        };

        self.searchNeighbors.subscribe(() => {
            myApp.core.map.RemoveAllMarkers(myApp.core.map.AllMarkers);
            self.search();
            myApp.core.map.SetMarkers(self.searchList());
        });
        self.searchList.extend({ rateLimit: 50 });

    }
}

export default AppView;