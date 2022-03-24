import { Input, Flex, Button, Grid } from "@chakra-ui/react";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { FaSearch } from "react-icons/fa";
import { SEARCH_BUTTON, QUERY_INPUT } from "../tests/testIdConsts";

type SearchFormProps = {
  query: string;
  handleQueryChange: ChangeEventHandler;
  handleSearchClick: MouseEventHandler;
};

export const SearchForm = (props: SearchFormProps) => (
  <Flex>
    <Grid>
      <Input
        data-testid={QUERY_INPUT}
        value={props.query}
        placeholder="Zip or City Name"
        onChange={props.handleQueryChange}
      ></Input>
    </Grid>
    <Button
      data-testid={SEARCH_BUTTON}
      leftIcon={<FaSearch />}
      onClick={props.handleSearchClick}
    >
      Search
    </Button>
  </Flex>
);
