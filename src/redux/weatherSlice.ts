import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import weatherApi, { Coord, Weather } from "../api/weather";
import geolocationApi from "../api/geolocation";

export interface WeatherState {
  locationName: string;
  allWeather: Weather;
  status: "empty" | "loading" | "failed" | "loaded";
}

const initialState: WeatherState = {
  locationName: "N/A",
  allWeather: {} as Weather,
  status: "empty",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getAllWeatherAsync = createAsyncThunk(
  "weather/getAllWeather",
  async (coords: Coord) => {
    const response = await weatherApi.getAllWeather(coords);
    return response.data;
  }
);

export const getLocationNameByCoordsASync = createAsyncThunk(
  "weather/getLocationNameByCoords",
  async (coords: Coord) => {
    const response = await geolocationApi.getLocationNameByCoords(coords);
    return `${response.data[0].name}, ${response.data[0].country}`;
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // setCoords: (state, action: PayloadAction<Coord>) => {
    //   state.coords = action.payload;
    // },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getLocationNameByCoordsASync.fulfilled, (state, action) => {
        state.locationName = action.payload;
      })
      .addCase(getAllWeatherAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllWeatherAsync.fulfilled, (state, action) => {
        state.status = "loaded";
        state.allWeather = action.payload;
      })
      .addCase(getAllWeatherAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// export const { setCoords } = weatherSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getLocationName = (state: RootState) => state.weather.locationName;
export const selectAllWeather = (state: RootState) => state.weather.allWeather;
export const selectDailyForecast = (state: RootState) =>
  state.weather.allWeather.daily;
export const selectCurrentWeather = (state: RootState) =>
  state.weather.allWeather.current;
export const selectTimezone = (state: RootState) =>
  state.weather.allWeather.timezone;
export const selectAllWeatherStatus = (state: RootState) =>
  state.weather.status;

export default weatherSlice.reducer;
