class SearchLocationView {
    constructor(params) {
        this.searchNeighbors = ko.observable(params && params.searchNeighbors || '');
        this.search = params && params.search || function() {};
    }
}

export default SearchLocationView;