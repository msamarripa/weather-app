import { Spinner, VStack, Heading, Text } from "@chakra-ui/react";
import { CurrentWeatherCard } from "../components/CurrentWeatherCard";
import { SevenDayForecast } from "../components/SevenDayForecastDeck";
import { useAppSelector } from "../redux/hooks";
import {
  getLocationName,
  selectAllWeatherStatus,
  StatusType,
} from "../redux/weatherSlice";

export const Weather = () => {
  const locationName = useAppSelector(getLocationName);
  const allWeatherStatus = useAppSelector(selectAllWeatherStatus);

  let main;
  if (allWeatherStatus === StatusType.LOADING) {
    main = <Spinner />;
  } else if (allWeatherStatus === StatusType.LOADED) {
    main = (
      <VStack>
        <Heading>{locationName}</Heading>
        <CurrentWeatherCard />
        <SevenDayForecast />
      </VStack>
    );
  } else if (allWeatherStatus === StatusType.FAILED) {
    main = <Text>There was an error getting weather data :-(</Text>;
  }

  return <VStack>{main}</VStack>;
};
