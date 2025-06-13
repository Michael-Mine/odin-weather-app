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
  const alertsEvent = document.querySelector("#alerts-event");
  const alertsHeadline = document.querySelector("#alerts-headline");
  const alertsStart = document.querySelector("#alerts-start");
  const alertsEnd = document.querySelector("#alerts-end");
  const alertsLink = document.querySelector("#alerts-link");

  alertsEvent.textContent = alerts[0].event;
  alertsHeadline.textContent = alerts[0].headline;
  alertsStart.textContent = "Starting " + changeAlertsDateTime(alerts[0].onset);
  alertsEnd.textContent = "Ending " + changeAlertsDateTime(alerts[0].ends);
  alertsLink.textContent = alerts[0].link;
  alertsLink.href = alerts[0].link;
}

export function displayForecast(arrayItem) {
  const tableBody = document.querySelector("#tbody");
  const newRow = document.createElement("tr");
  tableBody.appendChild(newRow);

  const date = document.createElement("td");
  date.textContent = arrayItem.fullDate;
  newRow.appendChild(date);

  const time = document.createElement("td");
  time.textContent = arrayItem.time;
  newRow.appendChild(time);

  const icon = document.createElement("td");
  icon.textContent = arrayItem.icon;
  newRow.appendChild(icon);

  const conditions = document.createElement("td");
  conditions.textContent = arrayItem.conditions;
  newRow.appendChild(conditions);

  const temp = document.createElement("td");
  temp.textContent = arrayItem.temp;
  newRow.appendChild(temp);

  const feelsLike = document.createElement("td");
  feelsLike.textContent = arrayItem.feelsLike;
  newRow.appendChild(feelsLike);

  const uvIndex = document.createElement("td");
  uvIndex.textContent = arrayItem.uvIndex;
  newRow.appendChild(uvIndex);

  const humidity = document.createElement("td");
  humidity.textContent = arrayItem.humidity;
  newRow.appendChild(humidity);

  const precipProb = document.createElement("td");
  precipProb.textContent = arrayItem.precipProb;
  newRow.appendChild(precipProb);

  const sunrise = document.createElement("td");
  sunrise.textContent = arrayItem.sunrise;
  newRow.appendChild(sunrise);

  const sunset = document.createElement("td");
  sunset.textContent = arrayItem.sunset;
  newRow.appendChild(sunset);

  const moonPhase = document.createElement("td");
  moonPhase.textContent = arrayItem.moonPhase;
  newRow.appendChild(moonPhase);
}
