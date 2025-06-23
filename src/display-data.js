import { degrees, forecastData } from "./get-data";
import { getForecastIcon } from "./forecast-icons";
import { getMoonIcon } from "./moon-icons";

export function displayLocation(location) {
  const locationHeader = document.querySelector("#location-header");
  locationHeader.textContent = location;
}

function changeAlertsDateTime(datetime) {
  const time = datetime.slice(11);
  const date = datetime.slice(0, 10);
  return "at " + time + " on " + date;
}

export function displayAlerts(alerts) {
  if (alerts.length > 0) {
    const alertsEvent = document.querySelector("#alerts-event");
    const alertsHeadline = document.querySelector("#alerts-headline");
    const alertsStart = document.querySelector("#alerts-start");
    const alertsEnd = document.querySelector("#alerts-end");
    const alertsLink = document.querySelector("#alerts-link");

    alertsEvent.textContent = alerts[0].event;
    alertsHeadline.textContent = alerts[0].headline;
    alertsStart.textContent =
      "Starting " + changeAlertsDateTime(alerts[0].onset);
    alertsEnd.textContent = "Ending " + changeAlertsDateTime(alerts[0].ends);
    alertsLink.textContent = alerts[0].link;
    alertsLink.href = alerts[0].link;
  }
}
const tableBody = document.querySelector("#tbody");

export function removeForecast() {
  tableBody.replaceChildren();
}

function displayDayHourly(day) {
  removeForecast();
  forecastData
    .filter((item) => {
      return item.fullDate === day;
    })
    .forEach(displayForecast);

  const backButton = document.createElement("button");
  backButton.textContent = "Back";
  tableBody.appendChild(backButton);

  backButton.addEventListener("click", () => {
    removeForecast();
    forecastData
      .filter((item) => {
        return item.period === "currentConditions" || item.time === "Full day";
      })
      .forEach(displayForecast);
  });
}

export function displayForecast(arrayItem) {
  const table = document.querySelector("table");
  table.style.visibility = "visible";

  const newRow = document.createElement("tr");
  tableBody.appendChild(newRow);

  const date = document.createElement("td");
  date.textContent = arrayItem.fullDate;
  newRow.appendChild(date);

  const time = document.createElement("td");
  time.textContent = arrayItem.time;
  newRow.appendChild(time);

  if (arrayItem.time === "Full day") {
    const hourButton = document.createElement("button");
    hourButton.textContent = "Hourly";
    time.appendChild(hourButton);

    hourButton.addEventListener("click", () => {
      displayDayHourly(arrayItem.fullDate);
    });
  }

  const icon = document.createElement("td");
  newRow.appendChild(icon);

  const forecastIcon = document.createElement("img");
  forecastIcon.src = getForecastIcon(arrayItem.icon);
  icon.appendChild(forecastIcon);

  const conditions = document.createElement("td");
  conditions.textContent = arrayItem.conditions;
  newRow.appendChild(conditions);

  const temp = document.createElement("td");
  temp.textContent = Math.round(arrayItem.temp) + "\u00B0" + degrees;
  newRow.appendChild(temp);

  const feelsLike = document.createElement("td");
  feelsLike.textContent = Math.round(arrayItem.feelsLike) + "\u00B0" + degrees;
  newRow.appendChild(feelsLike);

  const uvIndex = document.createElement("td");
  newRow.appendChild(uvIndex);

  if (arrayItem.uvIndex > 0) {
    const uvIcon = document.createElement("img");
    import("./images/UV Icons/uv-index-" + arrayItem.uvIndex + ".svg").then(
      (module) => {
        uvIcon.src = module.default;
      },
    );
    uvIndex.appendChild(uvIcon);
  }

  const humidity = document.createElement("td");
  humidity.textContent = Math.round(arrayItem.humidity) + "%";
  newRow.appendChild(humidity);

  const precipProb = document.createElement("td");
  precipProb.textContent = Math.round(arrayItem.precipProb) + "%";
  newRow.appendChild(precipProb);

  const sunrise = document.createElement("td");
  sunrise.textContent = arrayItem.sunrise;
  newRow.appendChild(sunrise);

  const sunset = document.createElement("td");
  sunset.textContent = arrayItem.sunset;
  newRow.appendChild(sunset);

  const moonPhase = document.createElement("td");
  newRow.appendChild(moonPhase);

  if (arrayItem.moonPhase) {
    const moonIcon = document.createElement("img");
    moonIcon.src = getMoonIcon(arrayItem.moonPhase);
    moonPhase.appendChild(moonIcon);
  }
}
