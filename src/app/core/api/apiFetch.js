import $ from 'jquery';
import Venue from './venue';

class APIFetch {
    constructor() {
        this.endpoint = `//api.foursquare.com/v2/venues/search`;
        this.client_id = `TG5QHMCNUODCOUEHWRW033BO4X2MQM2ZUGF1OHA2YCHIS1XF`;
        this.client_secret= `E1Q4ATW0B23NZ3BGUMH5VECGWFPB3I1GWOFD3HXTMAI1PHZ1`;
        this.v = ``;
        this.ll=``;
    }

    getFormattedDate(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear().toString();

        month = month < 10 ? `0${month.toString()}` : month.toString();
        day = day < 10 ? `0${day.toString()}` : day.toString();
        return `${year}${month}${day}`;
    }

    getLatLng(location) {
        return `${location.lat.toString()},${location.lng.toString()}`;
    }

    GetAPIInfo(location) {
        const defered = $.Deferred();
        const date = this.getFormattedDate(new Date());
        this.setAPIParams(date, this.getLatLng(location));
        
        $.ajax({
            url: this.endpoint,
            dataType: 'jsonp',
            data: $.param({
                client_id: this.client_id,
                client_secret: this.client_secret,
                v: this.v,
                ll: this.ll
            }),
            success(resp) {
                defered.resolve(resp.response.venues.map(v => new Venue(v)));
            },
            error(err) {
                //TODO: Proper error message
                defered.reject({
                    error: 'Some error'
                })
            }
        });
        
        return defered.promise();
    }
    
    setAPIParams(formatedDate, latlng) {
        this.v = formatedDate;
        this.ll = latlng;
    }
}

export default APIFetch;