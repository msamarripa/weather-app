import { Input, Flex, Button, Grid } from "@chakra-ui/react"
import { ChangeEventHandler, MouseEventHandler } from "react"
import { FaSearch } from "react-icons/fa"
import { SEARCH_BUTTON, ZIP_INPUT } from "../tests/testIdConsts"

type SearchFormProps = {
    zip: string,
    handleZipChange: ChangeEventHandler,
    handleSearchClick: MouseEventHandler,
}

export const SearchForm = (props: SearchFormProps) => (
    <Flex>
        <Grid>
            <Input
                data-testid={ZIP_INPUT}
                value={props.zip}
                placeholder="Zip Code"
                onChange={props.handleZipChange}>
            </Input>
        </Grid>
        <Button data-testid={SEARCH_BUTTON} leftIcon={<FaSearch />} onClick={props.handleSearchClick}>Search</Button>
    </Flex>
)
