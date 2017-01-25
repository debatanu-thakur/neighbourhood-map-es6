class AppServices {
    constructor() {
        this.locationList = [];
    }

    INIT(element) {
        this.core.map.initMap(element);
    }


}

export default new AppServices();