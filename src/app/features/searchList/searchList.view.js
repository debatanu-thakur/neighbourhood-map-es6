import Places from './searchList.model';

class SearchListView {
    constructor(params) {
        this.searchList = ko.observableArray(params 
        && params.places.map((place) => new Places(place)) 
        || []);
    }
}

export default SearchListView;