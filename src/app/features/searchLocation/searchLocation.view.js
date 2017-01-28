import myApp from '../app.services';

class SearchLocationView {
    constructor(params) {
        this.searchNeighbors = params.search;
        this.searchLocList = params.locations;
    }
}

export default SearchLocationView;