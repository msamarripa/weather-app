import axios from 'axios';

export interface Geolocation {
    zip: string;
    name: string;
    lat: number;
    lon: number;
    country: string;
}


const api = axios.create({
    baseURL: `${process.env.REACT_APP_GEOLOCATION_API_URL}`,
    params: {
        appid: `${process.env.REACT_APP_API_KEY}`,
    }
});


function getGeolocationDataByZip(zip: string) {

    return api.get(`/zip?zip=${zip}`)
}

export default {
    getGeolocationDataByZip
}