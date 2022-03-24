import { useState, ChangeEvent } from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Divider,
  Code,
  Grid,
} from "@chakra-ui/react"
import { Header } from "./components/Header"

import theme from "./theme";

export const App = () => {
  const [zip, setZip] = useState("");

  const handleZipChange = (event: ChangeEvent<HTMLInputElement>) => {
    setZip(event.target.value)
  }

  const handleSearchClick = () => {
    if (new RegExp(/^\d{5}$/).test(zip)) {
      alert("not implemented!")
    } else {
      alert("This is an invalid zip")
    }
  }

  return (<ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Header zip={zip} handleZipChange={handleZipChange} handleSearchClick={handleSearchClick}></Header>
      <Divider />
    </Box>
  </ChakraProvider>)
}
