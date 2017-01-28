class AppServices {
    constructor() {
        this.locationList = [{name: 'london'}, {name: 'america'}, {name: 'new york'}, {name: 'delhi'}];
    }

    INIT(element) {
        this.core.map.initMap(element, (location) => {
                this.core.api.GetAPIInfo(location).then((resp) => {
                    this.GenerateMarkers(resp);
                });
            });
    }

    GenerateMarkers(venues) {
        this.locationList.length = 0;
        venues.forEach((item) => {
            this.core.map.MAPMarker.AddMarker(item.location.position, this.core.map.DrawnMap);
            this.locationList.push(item);
        });
        const data = locationList.slice(0);

        this.SEARCHLIST.removeAll();
        this.SEARCHLIST(data);
    }


}

export default new AppServices();