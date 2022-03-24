import axios, { AxiosResponse } from "axios";

export interface Coord {
  lon: number;
  lat: number;
}

export interface Weather {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  minutely?: MinutelyEntity[] | null;
  hourly?: HourlyEntity[] | null;
  daily?: DailyEntity[] | null;
}
export interface Current {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather?: WeatherEntity[] | null;
}
export interface WeatherEntity {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface MinutelyEntity {
  dt: number;
  precipitation: number;
}
export interface HourlyEntity {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather?: WeatherEntity[] | null;
  pop: number;
}
export interface DailyEntity {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather?: WeatherEntity[] | null;
  clouds: number;
  pop: number;
  uvi: number;
  rain?: number | null;
}
export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}
export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

const api = axios.create({
  baseURL: `${process.env.REACT_APP_WEATHER_API_URL}`,
  params: {
    appid: `${process.env.REACT_APP_API_KEY}`,
    units: "imperial",
  },
});

const getAllWeather = (coords: Coord): Promise<AxiosResponse> => {
  return api.get("/onecall", {
    params: {
      lat: coords.lat,
      lon: coords.lon,
    },
  });
};

const weatherApi = { getAllWeather };

export default weatherApi;
