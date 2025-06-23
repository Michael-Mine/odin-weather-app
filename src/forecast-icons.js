// All icons were hand-crafted by Bas Milius https://bas.dev/work/meteocons

import clearDay from "./images/forecast-icons/clear-day.svg";
import clearNight from "./images/forecast-icons/clear-night.svg";
import cloudy from "./images/forecast-icons/cloudy.svg";
import fog from "./images/forecast-icons/fog.svg";
import partyCloudyDayRain from "./images/forecast-icons/partly-cloudy-day-rain.svg";
import partyCloudyDaySnow from "./images/forecast-icons/partly-cloudy-day-snow.svg";
import partyCloudyDay from "./images/forecast-icons/partly-cloudy-day.svg";
import partyCloudyNightRain from "./images/forecast-icons/partly-cloudy-night-rain.svg";
import partyCloudyNightSnow from "./images/forecast-icons/partly-cloudy-night-snow.svg";
import partyCloudyNight from "./images/forecast-icons/partly-cloudy-night.svg";
import rain from "./images/forecast-icons/rain.svg";
import snow from "./images/forecast-icons/snow.svg";
import thunderstormsDayRain from "./images/forecast-icons/thunderstorms-day-rain.svg";
import thunderstormsNightRain from "./images/forecast-icons/thunderstorms-night-rain.svg";
import thunderstormsRain from "./images/forecast-icons/thunderstorms-rain.svg";
import wind from "./images/forecast-icons/wind.svg";

export function getForecastIcon(forecast) {
  let icon;
  if (forecast === "clear-day") icon = clearDay;
  else if (forecast === "clear-night") icon = clearNight;
  else if (forecast === "cloudy") icon = cloudy;
  else if (forecast === "fog") icon = fog;
  else if (forecast === "showers-day") icon = partyCloudyDayRain;
  else if (forecast === "snow-showers-day") icon = partyCloudyDaySnow;
  else if (forecast === "partly-cloudy-day") icon = partyCloudyDay;
  else if (forecast === "showers-night") icon = partyCloudyNightRain;
  else if (forecast === "snow-showers-night") icon = partyCloudyNightSnow;
  else if (forecast === "partly-cloudy-night") icon = partyCloudyNight;
  else if (forecast === "rain") icon = rain;
  else if (forecast === "snow") icon = snow;
  else if (forecast === "thunder-showers-day") icon = thunderstormsDayRain;
  else if (forecast === "thunder-showers-night") icon = thunderstormsNightRain;
  else if (forecast === "thunder-rain") icon = thunderstormsRain;
  else if (forecast === "wind") icon = wind;
  return icon;
}
