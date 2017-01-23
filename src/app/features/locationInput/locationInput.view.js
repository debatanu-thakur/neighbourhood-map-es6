class LocationInputView {
    constructor(params) {
        this.currentLocation = ko.observable(params && params.currentLocation || '');
    }
}

export default LocationInputView;