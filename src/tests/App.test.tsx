import { screen } from "@testing-library/react"
import { render } from "./test-utils"
import { App } from "../App"
import { COLOR_SWITCHER, HEADER, ZIP_INPUT } from "./testIdConsts"
import "@testing-library/jest-dom"

test("renders Header with input & color switcher", () => {
  render(<App />)
  const headerElement = screen.queryByTestId(HEADER)
  expect(headerElement).toBeInTheDocument()

  const zipInput = screen.queryByTestId(ZIP_INPUT)
  expect(zipInput).toBeInTheDocument()

  const colorSwitcher = screen.queryByTestId(COLOR_SWITCHER)
  expect(colorSwitcher).toBeInTheDocument()
})
