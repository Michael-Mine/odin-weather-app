import { locationData, forecastData } from "./get-data";

export function displayLocation(location) {
  const locationHeader = document.querySelector("#location-header");
  locationHeader.textContent = location;
}

function changeAlertsDateTime (datetime) {
    const time = datetime.slice(11)
    const date = datetime.slice(0, 10)
    return "at " + time + " on " + date
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
