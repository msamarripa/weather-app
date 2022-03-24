import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "./test-utils";
import { App } from "../App";
import {
  COLOR_SWITCHER,
  HEADER,
  SEARCH_BUTTON,
  QUERY_INPUT,
} from "./testIdConsts";
import "@testing-library/jest-dom";
import mockGeolocationApi from "../api/geolocation";
import mockWeatherApi from "../api/weather";
import { AxiosResponse } from "axios";

test("renders Header with input & color switcher", () => {
  render(<App />);

  const headerElement = screen.queryByTestId(HEADER);
  expect(headerElement).toBeInTheDocument();

  const queryInput = screen.queryByTestId(QUERY_INPUT);
  expect(queryInput).toBeInTheDocument();

  const colorSwitcher = screen.queryByTestId(COLOR_SWITCHER);
  expect(colorSwitcher).toBeInTheDocument();
});

// test("zip entered, display data", async () => {
//   jest.spyOn(mockGeolocationApi, "getGeolocationDataByZip").mockResolvedValue({
//     "data": { "zip": "80302", "name": "Boulder", "lat": 40.0172, "lon": -105.2851, "country": "US" }
//   } as AxiosResponse)

//   jest.spyOn(mockWeatherApi, "getCurrentWeather").mockResolvedValue({
//     data: {
//       coord: { lon: -105.2646, lat: 40.0131 },
//       weather: [
//         {
//           id: 802,
//           main: "Clouds",
//           description: "scattered clouds",
//           icon: "03n",
//         },
//       ],
//       base: "stations",
//       main: {
//         temp: 53.49,
//         feels_like: 50.32,
//         temp_min: 47.37,
//         temp_max: 58.05,
//         pressure: 1005,
//         humidity: 38,
//       },
//       visibility: 10000,
//       wind: { speed: 11.5, deg: 300 },
//       clouds: { all: 40 },
//       dt: 1647828139,
//       sys: {
//         type: 2,
//         id: 2041009,
//         country: "US",
//         sunrise: 1647781461,
//         sunset: 1647825156,
//       },
//       timezone: -21600,
//       id: 5574991,
//       name: "Boulder",
//       cod: 200,
//     },
//   } as AxiosResponse)

//   render(<App />)

//   act(() => {
//     const zipInput = screen.getByTestId(ZIP_INPUT)
//     fireEvent.change(zipInput, { target: { value: '80302' } })

//     const searchButton = screen.getByTestId(SEARCH_BUTTON)
//     fireEvent.click(searchButton)
//   })

//   expect(mockGeolocationApi.getGeolocationDataByZip).toBeCalled()
//   expect(mockWeatherApi.getCurrentWeather).toBeCalled()

//   const dataText = screen.findByText(/Boulder/)

//   expect(dataText).toBeInTheDocument()
// })
