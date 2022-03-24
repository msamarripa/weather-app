import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "./test-utils";
import { App } from "../App";
import {
  COLOR_SWITCHER,
  HEADER,
  SEARCH_BUTTON,
  QUERY_INPUT,
} from "./testIdConsts";
import "@testing-library/jest-dom";
import { server } from "../api/mocks/server";
import { rest } from "msw";

test("renders Header with input & color switcher", () => {
  render(<App />);

  const headerElement = screen.queryByTestId(HEADER);
  expect(headerElement).toBeInTheDocument();

  const queryInput = screen.queryByTestId(QUERY_INPUT);
  expect(queryInput).toBeInTheDocument();

  const colorSwitcher = screen.queryByTestId(COLOR_SWITCHER);
  expect(colorSwitcher).toBeInTheDocument();
});

test("no coords or zip, displays message", () => {
  render(<App />);
  const helperText = screen.getByText(
    /Location could not be determined automatically/
  );
  expect(helperText).toBeInTheDocument();
});

test("zip entered, display name", async () => {
  render(<App />);

  const queryInput = screen.getByTestId(QUERY_INPUT);
  fireEvent.change(queryInput, { target: { value: "80302" } });

  const searchButton = screen.getByTestId(SEARCH_BUTTON);
  fireEvent.click(searchButton);

  await waitFor(() => screen.getByText(/Boulder/));
});

test("name entered, display name", async () => {
  render(<App />);

  const queryInput = screen.getByTestId(QUERY_INPUT);
  fireEvent.change(queryInput, { target: { value: "Boulder" } });

  const searchButton = screen.getByTestId(SEARCH_BUTTON);
  fireEvent.click(searchButton);

  await waitFor(() => screen.getByText(/Boulder/));
});

test("invalid query entered, display error message", async () => {
  server.use(
    rest.get(
      "https://api.openweathermap.org/geo/1.0/direct",
      (req, res, ctx) => {
        return res(ctx.json([]));
      }
    )
  );

  render(<App />);

  const queryInput = screen.getByTestId(QUERY_INPUT);
  fireEvent.change(queryInput, { target: { value: "gsdfs" } });

  const searchButton = screen.getByTestId(SEARCH_BUTTON);
  fireEvent.click(searchButton);

  await waitFor(() =>
    screen.getByText(/There was an error getting geolocation data./)
  );
});
