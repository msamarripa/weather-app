import { useState, useEffect, ChangeEvent } from "react"
import { useAppSelector, useAppDispatch } from './redux/hooks';
import {
  Box,
  Divider,
  Spinner,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react"
import { Coord } from "./api/weather";
import {
  getCurrentWeatherAsync,
  selectCurrentWeather,
  selectCurrentWeatherStatus
} from './redux/weatherSlice';

import { Header } from "./components/Header"


import geolocationApi from "./api/geolocation";
import { CurrentWeatherCard } from "./components/CurrentWeatherCard";

export const App = () => {
  const [coords, setCoords] = useState({ lat: Number.NEGATIVE_INFINITY, lon: Number.NEGATIVE_INFINITY } as Coord)
  const [zip, setZip] = useState("");
  const currentWeather = useAppSelector(selectCurrentWeather);
  const currentWeatherStatus = useAppSelector(selectCurrentWeatherStatus)
  const dispatch = useAppDispatch();

  const toast = useToast()

  useEffect(() => {
    if (coords.lat === Number.NEGATIVE_INFINITY && coords.lon === Number.NEGATIVE_INFINITY) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setCoords({ lat: position.coords.latitude, lon: position.coords.longitude })
        });
      }
    } else if (coords.lat !== Number.NEGATIVE_INFINITY && coords.lon !== Number.NEGATIVE_INFINITY) {
      dispatch(getCurrentWeatherAsync(coords))
    }
  }, [coords, dispatch])

  const handleZipChange = (event: ChangeEvent<HTMLInputElement>) => {
    setZip(event.target.value)
  }

  const handleSearchClick = () => {
    if (new RegExp(/^\d{5}$/).test(zip)) {
      geolocationApi.getGeolocationDataByZip(zip).then((response: any) => {
        setCoords({ lat: response.data.lat, lon: response.data.lon })
      }).catch((error) => {
        console.log(error)
      })
    } else {
      toast({
        title: "Error",
        position: "top",
        description: "Zip code is not valid",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  let main;


  if (coords.lat === Number.NEGATIVE_INFINITY && coords.lon === Number.NEGATIVE_INFINITY && currentWeather) {
    main = <Text>Location could not be determined automatically, please enter Zip Code above.</Text>
  } else {
    if (currentWeatherStatus === "loading") {
      main = <Spinner />
    } else if (currentWeatherStatus === "idle") {
      main = <CurrentWeatherCard currentWeatherData={currentWeather} />
    }
  }

  return (
    <Box textAlign="center" fontSize="xl">
      <Header zip={zip} handleZipChange={handleZipChange} handleSearchClick={handleSearchClick}></Header>
      <Divider />
      <VStack p={3}>
        {main}
      </VStack>
    </Box>)
}
