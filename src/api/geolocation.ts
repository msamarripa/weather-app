import axios, { AxiosResponse } from "axios";
import { Coord } from "./weather";

export interface Geolocation {
  zip?: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
}

const api = axios.create({
  baseURL: `${process.env.REACT_APP_GEOLOCATION_API_URL}`,
  params: {
    appid: `${process.env.REACT_APP_API_KEY}`,
  },
});

const getGeolocationDataByZip = (
  zip: string
): Promise<AxiosResponse<Geolocation>> => {
  return api.get(`/zip?zip=${zip}`);
};

const getGeolocationDataByName = (q: string): Promise<AxiosResponse> => {
  return api.get(`/direct?q=${q}&limit=1`);
};

const getLocationNameByCoords = (coords: Coord): Promise<AxiosResponse> => {
  return api.get(`/reverse?lat=${coords.lat}&lon=${coords.lon}&limit=1`);
};

const geolocationApi = {
  getGeolocationDataByZip,
  getGeolocationDataByName,
  getLocationNameByCoords,
};

export default geolocationApi;
