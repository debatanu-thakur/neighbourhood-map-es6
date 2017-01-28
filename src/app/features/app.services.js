class AppServices {
    constructor() {
        this.locationList = [];
        this.allVenues = [];
    }

    INIT(element) {
        this.core.map.initMap(element, (location) => {
                this.core.api.GetAPIInfo(location).then((resp) => {
                    this.allVenues = resp;
                    this.GenerateMarkers(resp);
                    //Add info window support
                    this.GenerateInfoWindows();
                    this.UpdateSearchData();
                });
            });
    }

    /**
     * Generate markers and populate the venue details
     */
    GenerateMarkers(venues) {
        const map = this.core.map;
        
        //Clear locations and markers
        this.RemoveLocations();
        map.ClearMarkers(map.AllMarkers);
        
        //Add markers and update location
        venues.forEach((item) => {
            const marker = map.MAPMarker.AddMarker(item.location.position, map.DrawnMap);

            map.AllMarkers = marker;
            this.locationList.push(Object.assign(item, {marker}));
        });
        

    }

    /**
     * Generate info window and content
     */
    GenerateInfoWindows() {
        const map = this.core.map;

        this.locationList.forEach((item) => {
            //ADD event listeners to markers
            item.marker.addListener('click', () => map.OpenInfo(item));
        });
    }

    /**
     * Removes and clears the location list
     */
    RemoveLocations() {
        this.locationList.splice(0);
    }

    //Hack to update the observable mutated array on initialisation
    UpdateSearchData() {
        const data = this.locationList.slice(0);

        this.SEARCHLIST.removeAll();
        this.SEARCHLIST(data);
    }
    
}

export default new AppServices();