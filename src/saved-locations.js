import { fullWeatherData, getWeatherFullData } from "./get-data";

const savedLocationsList = [];
const savedList = document.querySelector("#saved-list");

export function getLocalStorageLocations() {
  if (localStorage.getItem("locationsList")) {
    let saved = JSON.parse(localStorage.getItem("locationsList"));
    savedLocationsList.push(...saved);
    savedLocationsList.forEach(displaySavedLocations);
  }
}

export function saveLocation() {
  let newSavedLocation = createSavedLocation(fullWeatherData.resolvedAddress);
  savedLocationsList.push(newSavedLocation);
  console.log(savedLocationsList);
  localStorage.setItem("locationsList", JSON.stringify(savedLocationsList));
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
  localStorage.setItem("locationsList", JSON.stringify(savedLocationsList));

  removeLocationsDisplay();
  savedLocationsList.forEach(displaySavedLocations);

  editLocationNameDialog.close();
});

const removeLocationNameDialog = document.querySelector(
    "#remove-location-dialog",
  );
  const removeLocationNameDialogText = document.querySelector(
    "#remove-location-dialog-text",
  );
  const removeLocationNameButtonConfirm = document.querySelector(
    "#remove-location-dialog-button-confirm",
  );
  const removeLocationNameButtonCancel = document.querySelector(
    "#remove-location-dialog-button-cancel",
  );

  export function openRemoveLocationDialog() {
    let currentNameIndex = findLocationInList();
    removeLocationNameDialogText.textContent =
      "Remove " + savedLocationsList[currentNameIndex].name + "?";
    removeLocationNameDialog.showModal();
  };

  removeLocationNameButtonCancel.addEventListener("click", () => {
    removeLocationNameDialog.close();
  });
  
  removeLocationNameButtonConfirm.addEventListener("click", (event) => {
    event.preventDefault();
  
    let currentNameIndex = findLocationInList();
    savedLocationsList.splice(currentNameIndex, 1)
    localStorage.setItem("locationsList", JSON.stringify(savedLocationsList));
  
    removeLocationsDisplay();
    savedLocationsList.forEach(displaySavedLocations);
  
    removeLocationNameDialog.close();
  });

