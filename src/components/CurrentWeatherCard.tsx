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
import { Current } from "../api/weather";

dayjs.extend(utc);
dayjs.extend(tz);

type CurrentWeatherCardProps = {
  timezone: string;
  currentWeatherData: Current;
};

const timeFormat = "h:mm A";

export const CurrentWeatherCard = (props: CurrentWeatherCardProps) => (
  <>
    <Heading>Current Weather</Heading>
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="5" w="100%">
      <Center>
        <Text fontSize="sm">
          {dayjs
            .unix(props.currentWeatherData.dt)
            .tz(props.timezone)
            .format(timeFormat)}
        </Text>
      </Center>
      {props.currentWeatherData.weather ? (
        <VStack>
          <Image
            src={`https://openweathermap.org/img/wn/${props.currentWeatherData.weather[0].icon}@2x.png`}
          ></Image>
          <Text>
            {props.currentWeatherData.weather
              ? props.currentWeatherData.weather[0].main
              : "N/A"}
          </Text>
          <Stat>
            <StatNumber>
              {Math.ceil(props.currentWeatherData.temp)}&#176; F
            </StatNumber>
            <StatHelpText>
              Feels like {Math.ceil(props.currentWeatherData.feels_like)}&#176;
              F
            </StatHelpText>
          </Stat>
        </VStack>
      ) : (
        "N/A"
      )}
    </Box>
  </>
);
