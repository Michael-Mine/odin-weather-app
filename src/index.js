import "./styles.css";
import json from "./responseFormat.json" with { type: "json" };

async function getWeatherFullData(location) {
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
    console.log(weatherData);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

// let fullWeatherData = getWeatherFullData("london");

let fullWeatherData = json;

console.log(fullWeatherData);

function processLocationData() {
  let appWeatherData = {
    location: fullWeatherData.resolvedAddress,
    alerts: fullWeatherData.alerts,
  };
  console.log(appWeatherData);
}

processLocationData();

function createWeatherPeriod(period) {
  const periodData = fullWeatherData[period];
  const dateToday = new Date();
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
  let day;
  let date;
  let month;
  let year;

  if (period === "currentConditions") {
    day = days[dateToday.getDay()];
    date = dateToday.getDate();
    month = months[dateToday.getMonth()];
    year = dateToday.getFullYear();
  }
  // const day = fullWeatherData.days;

  let fullDate = day + " " + date + " " + month + " " + year;

  return {
    period,
    time: periodData.datetime,
    fullDate,
    conditions: periodData.conditions,
    icon: periodData.icon,
    temp: periodData.temp,
    feelslike: periodData.feelslike,
    uvindex: periodData.uvindex,
    humidity: periodData.humidity,
    precipprob: periodData.precipprob,
    sunrise: periodData.sunrise,
    sunset: periodData.sunset,
    moonphase: periodData.moonphase,
  };
}

let forecastData = [];

const currentWeather = createWeatherPeriod("currentConditions");

forecastData.push(currentWeather);

console.log(forecastData);
