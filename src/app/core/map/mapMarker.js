class MapMarker {
    constructor() {
        this.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.labelIndex = 0;
    }

    /**
     * Gets the new label name
     */
    getLabel() {
        return this.labels[this.labelIndex++ % this.labels.length];
    }

    /**
     * Add marker with default label
     */
    AddMarker(position, map) {
        return new google.maps.Marker({
            position,
            map,
            label: this.getLabel()
        });
    }

    /**
     * Make visible the map marker
     */
    SetMapMarker(marker, map) {
        marker.setMap(map);
    }

    /**
     * Remove the marker from map
     */
    RemoveMarker(marker) {
        console.log(marker, 'Iam ere');
        marker.setMap(null);
    }

}

export default MapMarker;