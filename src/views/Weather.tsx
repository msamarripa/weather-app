import { Spinner, VStack } from "@chakra-ui/react";
import { CurrentWeatherCard } from "../components/CurrentWeatherCard";
import { SevenDayForecast } from "../components/SevenDayForecastDeck";
import { useAppSelector } from "../redux/hooks";
import { selectAllWeatherStatus } from "../redux/weatherSlice";

export const Weather = () => {
  const allWeatherStatus = useAppSelector(selectAllWeatherStatus);

  let main;
  if (allWeatherStatus === "loading") {
    main = <Spinner />;
  } else if (allWeatherStatus === "loaded") {
    main = (
      <VStack>
        <CurrentWeatherCard />
        <SevenDayForecast />
      </VStack>
    );
  }

  return <VStack>{main}</VStack>;
};
