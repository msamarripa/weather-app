import {
  Box,
  Text,
  Image,
  Stat,
  StatNumber,
  StatHelpText,
  HStack,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import { DailyEntity } from "../api/weather";

dayjs.extend(utc);
dayjs.extend(tz);

type SevenDayForeCastDeckProps = {
  timezone: string;
  forecastData: Array<DailyEntity>;
};

export const SevenDayForecast = (props: SevenDayForeCastDeckProps) => {
  return (
    <>
      <Heading>7 Day Forecast</Heading>
      {props.forecastData.map((dailyData: DailyEntity, i) => (
        <Box
          key={i}
          w="100%"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="5"
        >
          <HStack>
            <Stat>
              <StatNumber>
                {dayjs.unix(dailyData.dt).tz(props.timezone).format("ddd")}
              </StatNumber>
              <StatHelpText>
                {dayjs.unix(dailyData.dt).tz(props.timezone).format("M/D")}
              </StatHelpText>
            </Stat>
            <Image
              src={`https://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png`}
            ></Image>
            <Stat>
              <StatNumber>{Math.ceil(dailyData.temp.max)}&#176;</StatNumber>
              <StatHelpText>
                / {Math.ceil(dailyData.temp.min)}
                &#176;
              </StatHelpText>
            </Stat>
            <Spacer />
            <Text>{dailyData.weather[0].main}</Text>
          </HStack>
        </Box>
      ))}
    </>
  );
};
