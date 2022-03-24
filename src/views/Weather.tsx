import { Spinner, VStack } from "@chakra-ui/react";
import { CurrentWeatherCard } from "../components/CurrentWeatherCard";
import { SevenDayForecast } from "../components/SevenDayForecastDeck";
import { useAppSelector } from "../redux/hooks";
import {
  selectAllWeather,
  selectAllWeatherStatus,
} from "../redux/weatherSlice";

export const Weather = () => {
  const allWeather = useAppSelector(selectAllWeather);
  const allWeatherStatus = useAppSelector(selectAllWeatherStatus);

  let main;
  if (allWeatherStatus === "loading") {
    main = <Spinner />;
  } else if (allWeatherStatus === "idle" && allWeather.current) {
    main = (
      <>
        <CurrentWeatherCard
          timezone={allWeather.timezone}
          currentWeatherData={allWeather.current}
        ></CurrentWeatherCard>
        <SevenDayForecast
          timezone={allWeather.timezone}
          forecastData={allWeather.daily}
        ></SevenDayForecast>
      </>
    );
  }

  return <VStack>{main}</VStack>;
};
