//This lists all the geo location related
//operation on the map
class GeoLocationService {
    constructor(navigatorObj) {
        this.navigator = navigatorObj;
        this.geocoder = new google.maps.Geocoder();
    }

    /**
     * Take current location and return it
     * if not then the take the default location
     */
    GetCurrentLocation(callback) {
        if (this.navigator.geolocation) {
            return this.navigator
            .geolocation.getCurrentPosition(
                (position) => position,
                () => false);
        } 

        return false;
    }

    /**
     * Get the lat-lng for 
     * a place adress
     */
    GetLocationName(lat, lng) {
        return geocoder.geocode({
            location: {
                lat,
                lng
            }
        }, (results, status) => {
            if (status === 'OK') {
                return results[1].formatted_address;
            }
            return false;
        });
    }

    /**
     * Get the adress
     * for lat-lng
     */
    GetLocation(address) {
        return geocoder.geocode({
            address
        }, (results, status) => {
            if (status === 'OK') {
                return results[0].geometry.location.lat();
            }
            return false;
        });
    }
}
export default GeoLocationService;