import {
    Text,
    Spinner,
    VStack,
} from "@chakra-ui/react"
import { useAppSelector } from "../redux/hooks"
import { selectAllWeather, selectAllWeatherStatus } from "../redux/weatherSlice"


export const Weather = () => {
    const allWeather = useAppSelector(selectAllWeather)
    const allWeatherStatus = useAppSelector(selectAllWeatherStatus)

    let main;
    if (allWeatherStatus === "loading") {
        main = <Spinner />
    } else if (allWeatherStatus === "idle") {
        main = <Text>{JSON.stringify(allWeather)}</Text>
    }

    return (
        <VStack>
            {main}
        </VStack>
    )
}