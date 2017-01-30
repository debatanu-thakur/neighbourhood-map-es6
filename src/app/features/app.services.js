import contentData from './content.template.html';

class AppServices {
    constructor() {
        this.locationList = [];
        this.allVenues = [];
    }

    INIT(element) {
        this.core.map.initMap(element, (location) => {
                this.core.api.GetAPIInfo(location).then((resp) => {
                    this.core.map.GEOServices.GetLocationName(location,
                    (results, status) => 
                    {
                        if (status === 'OK') {
                            const address = results[6] || results[0];

                            this.currentLocation(address.formatted_address);
                        } else {
                            window.NOTIFY
                            .error_message('There was some error loading the location name. Please try loading again', 2000);
                        }
                        this.allVenues = resp;
                        this.GenerateMarkers(resp);
                        //Add info window support
                        this.GenerateInfoWindows();
                        this.UpdateSearchData();
                    });
                }, (err) => window.NOTIFY.error_message('Failed to load location venue data. Please try again.', 2000));
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
        const self = this;

        this.locationList.forEach((item) => {
            //ADD event listeners to markers
            item.src = map.FetchStreetView(item.location.position);
            item.content = self.PrepareContent(item);
            item.marker.addListener('click', () => {
                map.OpenInfo(item);
            });
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

    PrepareContent(venue) {
        let domValue = contentData.replace(/name/ig, venue.name).replace(/url/ig, venue.url || '#').replace(/src="*"/, `src="${venue.src}"`);
        return domValue;
    }

}

export default new AppServices();