import {
  Box,
  Text,
  Image,
  Stat,
  StatNumber,
  StatHelpText,
  VStack,
  Heading,
  Center,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentWeather, selectTimezone } from "../redux/weatherSlice";

dayjs.extend(utc);
dayjs.extend(tz);

const timeFormat = "h:mm A";

export const CurrentWeatherCard = () => {
  const currentWeatherData = useAppSelector(selectCurrentWeather);
  const timezone = useAppSelector(selectTimezone);

  return (
    <>
      <Heading size="md">Current Weather</Heading>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="5" w="100%">
        <Center>
          <Text fontSize="sm">
            {dayjs.unix(currentWeatherData.dt).tz(timezone).format(timeFormat)}
          </Text>
        </Center>
        {currentWeatherData.weather ? (
          <VStack>
            <Image
              src={`https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`}
            ></Image>
            <Text>
              {currentWeatherData.weather
                ? currentWeatherData.weather[0].main
                : "N/A"}
            </Text>
            <Stat>
              <StatNumber>
                {Math.ceil(currentWeatherData.temp)}&#176; F
              </StatNumber>
              <StatHelpText>
                Feels like {Math.ceil(currentWeatherData.feels_like)}
                &#176; F
              </StatHelpText>
            </Stat>
          </VStack>
        ) : (
          "N/A"
        )}
      </Box>
    </>
  );
};
