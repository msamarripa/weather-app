import {
  Alert,
  AlertIcon,
  AlertDescription,
  Spinner,
  VStack,
  Heading,
} from "@chakra-ui/react";
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
    main = <Spinner size="lg" />;
  } else if (allWeatherStatus === StatusType.LOADED) {
    main = (
      <>
        <Heading>{locationName}</Heading>
        <CurrentWeatherCard />
        <SevenDayForecast />
      </>
    );
  } else if (allWeatherStatus === StatusType.FAILED) {
    main = (
      <Alert status="error">
        <AlertIcon />
        <AlertDescription>
          There was an error getting weather data :-(
        </AlertDescription>
      </Alert>
    );
  }

  return <VStack>{main}</VStack>;
};
