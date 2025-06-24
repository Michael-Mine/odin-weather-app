import "./styles.css";
import "./toggle.css";
import { getWeatherFullData, changeDegrees } from "./get-data";
import { openEditLocationDialog, saveLocation } from "./saved-locations";

const location = document.querySelector("#location");
const searchButton = document.querySelector("#search");
const degrees = document.querySelector("#degrees");
const saveButton = document.querySelector("#save");
const editButton = document.querySelector("#edit");
const removeButton = document.querySelector("#remove");

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(location.value);
  getWeatherFullData(location.value);
});

degrees.addEventListener("change", () => {
  if (degrees.checked) {
    changeDegrees();
  } else {
    changeDegrees();
  }
});

saveButton.addEventListener("click", () => {
  saveLocation()
});

editButton.addEventListener("click", () => {
  openEditLocationDialog();
});

removeButton.addEventListener("click", () => {
  removeLocation()
});
