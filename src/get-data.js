// import json from "./responseFormat.json" with { type: "json" };
import { checkSavedLocation } from "./index";
import {
  displayLocation,
  displayAlerts,
  displayForecast,
  removeForecast,
  removeAlerts,
} from "./display-data";

export let degrees = "F";
export let fullWeatherData;
export let locationData;
export let forecastData = [];

export function changeDegrees() {
  degrees === "F" ? (degrees = "C") : (degrees = "F");
  if (forecastData[0]) {
    forecastData = [];
    addDaysForecast();
    console.log(forecastData);
    removeForecast();
    forecastData
      .filter((item) => {
        return item.period === "currentConditions" || item.time === "Full day";
      })
      .forEach(displayForecast);
  }
}

export async function getWeatherFullData(location) {
  const loader = document.querySelector("#loader")
  const url =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
    location +
    "?key=KGNPQ92K2A2D2GK96CV98SB3F";
  // API key is free and publicly available, so exposed for this personal study project
  try {
    loader.style.visibility = "visible";
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();

    fullWeatherData = json;
    console.log(fullWeatherData);
    processLocationData();
    console.log(locationData);
    forecastData = [];
    addDaysForecast();
    console.log(forecastData);
    checkSavedLocation();
    displayLocation(locationData.location);
    removeAlerts();
    displayAlerts(locationData.alerts);
    removeForecast();
    forecastData
      .filter((item) => {
        return item.period === "currentConditions" || item.time === "Full day";
      })
      .forEach(displayForecast);
  } catch (error) {
    console.error(error.message);
    displayLocation("Error: Failed to get forecast, please try again or a different location")
  }
  loader.style.visibility = "hidden";
}

function processLocationData() {
  locationData = {
    location: fullWeatherData.resolvedAddress,
    alerts: fullWeatherData.alerts,
  };
}

function getFullDate(dayPeriod) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateFull = new Date();

  if (dayPeriod > 0) {
    dateFull.setDate(dateFull.getDate() + dayPeriod);
  }

  const dayOfWeek = days[dateFull.getDay()];
  const dateOfMonth = dateFull.getDate();
  const month = months[dateFull.getMonth()];
  const year = dateFull.getFullYear();

  return dayOfWeek + " " + dateOfMonth + " " + month + " " + year;
}

function getPeriodData(period, dayPeriod, hourPeriod) {
  if (hourPeriod)
    return fullWeatherData[period][dayPeriod]["hours"][hourPeriod];
  if (dayPeriod) return fullWeatherData[period][dayPeriod];
  return fullWeatherData[period];
}

function createWeatherPeriod(period, dayPeriod, hourPeriod) {
  const periodData = getPeriodData(period, dayPeriod, hourPeriod);
  const time =
    period !== "currentConditions" && !hourPeriod
      ? "Full day"
      : periodData.datetime;
  let temp = periodData.temp;
  let feelsLike = periodData.feelslike;
  if (degrees === "C") {
    // to convert data received in Fahrenheit to Celsius
    temp = (temp - 32) / (9 / 5);
    feelsLike = (feelsLike - 32) / (9 / 5);
  }

  return {
    period,
    time,
    fullDate: getFullDate(dayPeriod),
    conditions: periodData.conditions,
    icon: periodData.icon,
    temp,
    feelsLike,
    uvIndex: periodData.uvindex,
    humidity: periodData.humidity,
    precipProb: periodData.precipprob,
    sunrise: periodData.sunrise,
    sunset: periodData.sunset,
    moonPhase: periodData.moonphase,
  };
}

function addDaysForecast() {
  const currentWeather = createWeatherPeriod("currentConditions");
  const todayWeather = createWeatherPeriod("days", "0");
  forecastData.push(currentWeather);
  forecastData.push(todayWeather);

  for (let index = 0; index < 15; index++) {
    let dayForecast = createWeatherPeriod("days", index);
    forecastData.push(dayForecast);

    let midnightForecast = createWeatherPeriod("days", index, "0");
    forecastData.push(midnightForecast);
    for (let j = 1; j < 24; j++) {
      let hourForecast = createWeatherPeriod("days", index, j);
      forecastData.push(hourForecast);
    }
  }
  forecastData[0].fullDate = "Now";
  forecastData.splice(2, 1);
}
