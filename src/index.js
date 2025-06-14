import "./styles.css";
import "./toggle.css";
import { getWeatherFullData, changeDegrees } from "./get-data";

const location = document.querySelector("#location");
const button = document.querySelector("button");
const degrees = document.querySelector("#degrees");

button.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(location.value);
  getWeatherFullData(location.value);
});

degrees.addEventListener("change", () => {
  if (degrees.checked) {
    changeDegrees()
  } else {
    changeDegrees()
  }
});
