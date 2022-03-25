import { useState, useEffect, ChangeEvent } from "react";
import { useAppDispatch } from "./redux/hooks";
import { Box, Divider, VStack, Text, useToast } from "@chakra-ui/react";
import { Coord } from "./api/weather";
import {
  getAllWeatherAsync,
  getLocationNameByCoordsAsync,
} from "./redux/weatherSlice";
import { Header } from "./components/Header";
import geolocationApi from "./api/geolocation";
import { Weather } from "./views/Weather";

export const App = () => {
  const [coords, setCoords] = useState({
    lat: Number.NEGATIVE_INFINITY,
    lon: Number.NEGATIVE_INFINITY,
  } as Coord);
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();

  const toast = useToast();

  const areCoordsSet =
    coords.lat !== Number.NEGATIVE_INFINITY &&
    coords.lon !== Number.NEGATIVE_INFINITY;

  useEffect(() => {
    if (!areCoordsSet) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        });
      }
    } else if (areCoordsSet) {
      dispatch(getLocationNameByCoordsAsync(coords));
      dispatch(getAllWeatherAsync(coords));
    }
  }, [coords, areCoordsSet, dispatch]);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleGeolocationError = (error: any) => {
    toast({
      title: "Error",
      position: "top",
      description: "There was an error getting geolocation data.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleSearchClick = async () => {
    if (new RegExp(/^\d{5}$/).test(query)) {
      try {
        const response = await geolocationApi.getGeolocationDataByZip(query);
        setCoords({ lat: response.data.lat, lon: response.data.lon });
      } catch (error) {
        handleGeolocationError(error);
      }
    } else {
      try {
        const response = await geolocationApi.getGeolocationDataByName(query);
        setCoords({ lat: response.data[0].lat, lon: response.data[0].lon });
      } catch (error) {
        handleGeolocationError(error);
      }
    }
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Header
        query={query}
        handleQueryChange={handleQueryChange}
        handleSearchClick={handleSearchClick}
      ></Header>
      <Divider />
      <VStack p={3}>
        {areCoordsSet ? (
          <Weather />
        ) : (
          <Text>
            Location could not be determined automatically, please enter zip
            code or city name above.
          </Text>
        )}
      </VStack>
    </Box>
  );
};
