import "./styles.css";
import "./toggle.css";
import { getWeatherFullData, changeDegrees } from "./get-data";
import { findLocationInList, getLocalStorageLocations, openEditLocationDialog, openRemoveLocationDialog, saveLocation } from "./saved-locations";

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
  openRemoveLocationDialog();
});

export function checkSavedLocation() {
    let index = findLocationInList()
    console.log(index)
    if (index === -1) {
        saveButton.style.display = "inline";
        editButton.style.display = "none";
        removeButton.style.display = "none";
    } else {
        saveButton.style.display = "none";
        editButton.style.display = "inline";
        removeButton.style.display = "inline";
    }
}

getLocalStorageLocations();
