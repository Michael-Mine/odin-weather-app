import { fullWeatherData, getWeatherFullData } from "./get-data";

const savedLocationsList = [];
const savedList = document.querySelector("#saved-list");

export function getLocalStorageLocations() {
  if (localStorage.getItem("savedLocations")) {
    let saved = JSON.parse(localStorage.getItem("savedLocations"));
    savedLocations.push(...saved);
    savedLocations.forEach(displaySavedLocations);
  }
}

export function saveLocation() {
  // add to saved array, update localstorage, display on aside
  let newSavedLocation = createSavedLocation(fullWeatherData.resolvedAddress);
  savedLocationsList.push(newSavedLocation);
  console.log(savedLocationsList);
  removeLocationsDisplay();
  savedLocationsList.forEach(displaySavedLocations);
}

function createSavedLocation(resolvedAddress) {
  let sliceEnd = resolvedAddress.indexOf(",");
  let name = resolvedAddress.slice(0, sliceEnd);
  return { name, resolvedAddress };
}

function removeLocationsDisplay() {
  savedList.replaceChildren();
}

function displaySavedLocations(location) {
  const listItem = document.createElement("li");
  savedList.appendChild(listItem);

  const listItemButton = document.createElement("button");
  listItemButton.textContent = location.name;
  listItem.appendChild(listItemButton);

  listItemButton.addEventListener("click", () => {
    getWeatherFullData(location.resolvedAddress);
  });
}

const editLocationNameDialog = document.querySelector(
  "#edit-location-name-dialog",
);
const editLocationNameDialogText = document.querySelector(
  "#edit-location-name-dialog-text",
);
const editLocationNameButtonConfirm = document.querySelector(
  "#edit-location-name-button-confirm",
);
const editLocationNameButtonCancel = document.querySelector(
  "#edit-location-name-button-cancel",
);
const newLocationName = editLocationNameDialog.querySelector("input");

export function openEditLocationDialog() {
  // find name in list from fullWeatherData.resolvedAddress
  let currentNameIndex = findLocationInList();
  editLocationNameDialogText.textContent =
    "Change " + savedLocationsList[currentNameIndex].name + " to";
  editLocationNameDialog.showModal();
}

function findLocationInList() {
  let index = savedLocationsList.findIndex(
    (obj) => obj.resolvedAddress === fullWeatherData.resolvedAddress,
  );
  return index;
}

editLocationNameButtonCancel.addEventListener("click", () => {
  editLocationNameDialog.close();
});

editLocationNameButtonConfirm.addEventListener("click", (event) => {
  event.preventDefault();

  let currentNameIndex = findLocationInList();
  savedLocationsList[currentNameIndex].name = newLocationName.value;
  //   localStorage.setItem("lists", JSON.stringify(lists));

  removeLocationsDisplay();
  savedLocationsList.forEach(displaySavedLocations);

  editLocationNameDialog.close();
});

