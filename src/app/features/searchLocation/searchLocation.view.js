import myApp from '../app.services';

class SearchLocationView {
    constructor(params) {
        this.searchNeighbors = ko.observable('');
        this.searchLocList = params.locations;
        // myApp.locationList = searchLocList;
        this.search = params && params.search || function() {};
    }
}

export default SearchLocationView;