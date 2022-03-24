import { Flex, Spacer } from "@chakra-ui/react";
import { MouseEventHandler, ChangeEventHandler } from "react";
import { HEADER } from "../tests/testIdConsts";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { SearchForm } from "./SearchForm";

type HeaderProps = {
  query: string;
  handleQueryChange: ChangeEventHandler;
  handleSearchClick: MouseEventHandler;
};

export const Header = (props: HeaderProps) => (
  <Flex p={3} data-testid={HEADER}>
    <SearchForm
      query={props.query}
      handleQueryChange={props.handleQueryChange}
      handleSearchClick={props.handleSearchClick}
    />
    <Spacer />
    <ColorModeSwitcher />
  </Flex>
);
