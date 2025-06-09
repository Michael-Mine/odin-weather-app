import "./styles.css";
import json from "./responseFormat.json" with { type: "json" }

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

function processWeatherData() {
  let appWeatherData = {
    location: fullWeatherData.resolvedAddress,
    description: fullWeatherData.description,
  };
  console.log(appWeatherData);
}

// processWeatherData();

function processWeatherFactory(period) {
  return {
    day,
    time,
    conditions,
    icon,
    temp,
    feelslike,
    uvindex,
    humidity,
    precipprob,
    sunrise,
    sunset,
    moonphase,
  };
}

let weatherData = [];
