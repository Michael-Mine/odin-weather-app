import json from "./responseFormat.json" with { type: "json" };
let fullWeatherData = json;
// const fullWeatherData = getWeatherFullData("london");

import {
  displayLocation,
  displayAlerts,
  displayForecast,
} from "./display-data";

export let locationData;
export let forecastData = [];

export async function getWeatherFullData(location) {
  const url =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
    location +
    "?key=KGNPQ92K2A2D2GK96CV98SB3F";
  // API key is free and publicly available, so exposed for this personal study project
  try {
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
    displayLocation(locationData.location);
    displayAlerts(locationData.alerts);
    forecastData.forEach(displayForecast);
  } catch (error) {
    console.error(error.message);
  }
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
      ? "All day"
      : periodData.datetime;

  return {
    period,
    time,
    fullDate: getFullDate(dayPeriod),
    conditions: periodData.conditions,
    icon: periodData.icon,
    temp: periodData.temp,
    feelsLike: periodData.feelslike,
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
