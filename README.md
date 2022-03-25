This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

## Demo

Hosted demo site available [here](https://graceful-churros-fa9f87.netlify.app/), but **no guarentees** that it will work because I'm using free [Netlify](https://www.netlify.com) & [OpenWeatherMap](https://openweathermap.org/api) accounts

## Screenshots

### [Mobile](/screenshots/mobile.png)

### [Desktop - Full](/screenshots/desktop-full.png)

## Requirements

1. [NodeJS / NPM](https://nodejs.org/en/download/)
2. [OpenWeatherMap](https://openweathermap.org/api) API Key. Account will need to be created & API key can be found in account info.

## How to run project

1. Meet above requirements
2. Clone the repository
3. Navigate to root directory of the repository in a terminal
4. Run `npm install`
5. Open up the `.env` file in the root directory of the repository. In this file replace `[API_KEY]` with your API Key from OpenWeatherMap (replace brackets as well)
6. Run `npm start` from the root directory

This should open up a browser window with the application, but you can also navigate to [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Other Commands

### `npm test`

Launches the test runner in the interactive watch mode.<br /> See the section
about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
