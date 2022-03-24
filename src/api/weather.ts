import axios, { AxiosResponse } from "axios";

export interface CurrentWeather {
  coord: Coord;
  weather: Array<WeatherEntity>;
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
export interface Coord {
  lon: number;
  lat: number;
}
export interface WeatherEntity {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}
export interface Wind {
  speed: number;
  deg: number;
}
export interface Clouds {
  all: number;
}
export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

const api = axios.create({
  baseURL: `${process.env.REACT_APP_WEATHER_API_URL}`,
  params: {
    appid: `${process.env.REACT_APP_API_KEY}`,
    units: "imperial",
  },
});

function getCurrentWeather(coords: Coord): Promise<AxiosResponse> {
  // return new Promise((resolve) => {
  //   setTimeout(
  //     () =>
  //       resolve({
  //         data: {
  //           coord: { lon: -105.2646, lat: 40.0131 },
  //           weather: [
  //             {
  //               id: 802,
  //               main: "Clouds",
  //               description: "scattered clouds",
  //               icon: "03n",
  //             },
  //           ],
  //           base: "stations",
  //           main: {
  //             temp: 53.49,
  //             feels_like: 50.32,
  //             temp_min: 47.37,
  //             temp_max: 58.05,
  //             pressure: 1005,
  //             humidity: 38,
  //           },
  //           visibility: 10000,
  //           wind: { speed: 11.5, deg: 300 },
  //           clouds: { all: 40 },
  //           dt: 1647828139,
  //           sys: {
  //             type: 2,
  //             id: 2041009,
  //             country: "US",
  //             sunrise: 1647781461,
  //             sunset: 1647825156,
  //           },
  //           timezone: -21600,
  //           id: 5574991,
  //           name: "Boulder",
  //           cod: 200,
  //         } as CurrentWeather,
  //       } as AxiosResponse),
  //     2000
  //   );
  // });
  return api.get("/weather", {
    params: {
      lat: coords.lat,
      lon: coords.lon,
    },
  });
}

export default {
  getCurrentWeather
}
