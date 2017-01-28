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
        this.locationList.splice(0);
        const map = this.core.map;

        map.ClearMarkers(map.AllMarkers);

        venues.forEach((item) => {
            const marker = map.MAPMarker.AddMarker(item.location.position, map.DrawnMap);

            map.AllMarkers = marker;
            this.locationList.push(Object.assign(item, {marker}));
        });
        const data = this.locationList.slice(0);

        this.SEARCHLIST.removeAll();
        this.SEARCHLIST(data);
    }

    
}

export default new AppServices();