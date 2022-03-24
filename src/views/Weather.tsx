import { Spinner, VStack, Heading } from "@chakra-ui/react";
import { CurrentWeatherCard } from "../components/CurrentWeatherCard";
import { SevenDayForecast } from "../components/SevenDayForecastDeck";
import { useAppSelector } from "../redux/hooks";
import { getLocationName, selectAllWeatherStatus } from "../redux/weatherSlice";

export const Weather = () => {
  const locationName = useAppSelector(getLocationName);
  const allWeatherStatus = useAppSelector(selectAllWeatherStatus);

  let main;
  if (allWeatherStatus === "loading") {
    main = <Spinner />;
  } else if (allWeatherStatus === "loaded") {
    main = (
      <VStack>
        <Heading>{locationName}</Heading>
        <CurrentWeatherCard />
        <SevenDayForecast />
      </VStack>
    );
  }

  return <VStack>{main}</VStack>;
};
