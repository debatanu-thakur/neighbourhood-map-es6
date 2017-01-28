
class SearchListView {
    constructor(params) {
        const self = this;

        self.searchListData = params.places;
        self.currentActive = ko.observable({name: ''});
        self.activate = function() {
            self.currentActive(this);
        };
        // self.isActive = ko.pureComputed(function() {
        //     console.log(self.currentActive(), this);
        //     return false;
        // });
    }
}

export default SearchListView;