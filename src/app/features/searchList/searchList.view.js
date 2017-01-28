
class SearchListView {
    constructor(params) {
        const self = this;

        self.searchListData = params.places || [];
        self.attrs = params.attrs || {};
        self.currentActive = ko.observable({name: ''});
        self.activate = function(data) {
            console.log(data);
            self.currentActive(this);
            self.attrs.callback(data);
        };
    }
}

export default SearchListView;