import {
    Box,
    Table,
    Tbody,
    Tr,
    Td,
    Text,
    Flex,
    Spacer,
    Image,
    Stat,
    StatNumber,
    StatHelpText,
    VStack,
} from "@chakra-ui/react"
import { CurrentWeather } from "../api/weather"
import dayjs from "dayjs"

type CurrentWeatherCardProps = {
    currentWeatherData: CurrentWeather
}

const timeFormat = "h:mm A"

export const CurrentWeatherCard = (props: CurrentWeatherCardProps) => (
    <Box maxW="lg" minW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5">
        <Flex>
            <Text fontSize="sm">Current Weather ({props.currentWeatherData.name})</Text>
            <Spacer></Spacer>
            <Text fontSize="sm">{dayjs.unix(props.currentWeatherData.dt).format(timeFormat)}</Text>
        </Flex>
        {
            props.currentWeatherData.weather ?
                <VStack>
                    <Image src={`http://openweathermap.org/img/wn/${props.currentWeatherData.weather[0].icon}@2x.png`}></Image>
                    <Text>{(props.currentWeatherData.weather ? props.currentWeatherData.weather[0].main : "N/A")}</Text>
                    <Stat>
                        <StatNumber>{Math.ceil(props.currentWeatherData.main.temp)}&#176; F</StatNumber>
                        <StatHelpText>Feels like {Math.ceil(props.currentWeatherData.main.feels_like)}&#176; F</StatHelpText>
                    </Stat>
                </VStack>
                :
                "N/A"
        }
        <Flex>
            <Table size="sm">
                <Tbody>
                    <Tr>
                        <Td>Wind</Td>
                        <Td>{props.currentWeatherData.wind?.deg}&#176; {props.currentWeatherData.wind?.speed}mph</Td>
                    </Tr>
                    <Tr>
                        <Td>Humidity</Td>
                        <Td>{props.currentWeatherData.main?.humidity}%</Td>
                    </Tr>
                    <Tr>
                        <Td>Pressure</Td>
                        <Td>{props.currentWeatherData.main?.pressure} hPa</Td>
                    </Tr>
                </Tbody>
            </Table>
            <Table size="sm">
                <Tbody>
                    <Tr>
                        <Td>Sunrise</Td>
                        <Td>{dayjs.unix(props.currentWeatherData.sys?.sunrise).format(timeFormat)}</Td>
                    </Tr>
                    <Tr>
                        <Td>Sunset</Td>
                        <Td>{dayjs.unix(props.currentWeatherData.sys?.sunset).format(timeFormat)}</Td>
                    </Tr>
                    <Tr>
                        <Td>Visibility</Td>
                        <Td>{props.currentWeatherData.visibility / 1000} km</Td>
                    </Tr>
                </Tbody>
            </Table>
        </Flex>
    </Box >
)