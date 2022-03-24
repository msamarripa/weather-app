import { screen } from "@testing-library/react"
import { render } from "./test-utils"
import { App } from "../App"
import { COLOR_SWITCHER, HEADER, ZIP_INPUT } from "./testIdConsts"
import "@testing-library/jest-dom"


const getCurrentWeather = jest.fn()
getCurrentWeather.mockReturnValue({
  data: {
    coord: { lon: -105.2646, lat: 40.0131 },
    weather: [
      {
        id: 802,
        main: "Clouds",
        description: "scattered clouds",
        icon: "03n",
      },
    ],
    base: "stations",
    main: {
      temp: 53.49,
      feels_like: 50.32,
      temp_min: 47.37,
      temp_max: 58.05,
      pressure: 1005,
      humidity: 38,
    },
    visibility: 10000,
    wind: { speed: 11.5, deg: 300 },
    clouds: { all: 40 },
    dt: 1647828139,
    sys: {
      type: 2,
      id: 2041009,
      country: "US",
      sunrise: 1647781461,
      sunset: 1647825156,
    },
    timezone: -21600,
    id: 5574991,
    name: "Boulder",
    cod: 200,
  },
})

test("renders Header with input & color switcher", () => {
  render(<App />)

  console.log(getCurrentWeather)

  const headerElement = screen.queryByTestId(HEADER)
  expect(headerElement).toBeInTheDocument()

  const zipInput = screen.queryByTestId(ZIP_INPUT)
  expect(zipInput).toBeInTheDocument()

  const colorSwitcher = screen.queryByTestId(COLOR_SWITCHER)
  expect(colorSwitcher).toBeInTheDocument()
})
