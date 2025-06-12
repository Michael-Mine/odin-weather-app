import "./styles.css";
import { getNewLocation } from "./get-data";

const location = document.querySelector("#location");
const button = document.querySelector("button");

button.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(location.value);
  getNewLocation(location.value);
});
