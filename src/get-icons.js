import moonNew from "./images/moon-icons/moon-new.svg";
import moonWaxingCrescent from "./images/moon-icons/moon-waxing-crescent.svg";
import moonFirstQuarter from "./images/moon-icons/moon-first-quarter.svg";
import moonWaxingGibbous from "./images/moon-icons/moon-waxing-gibbous.svg";
import moonFull from "./images/moon-icons/moon-full.svg";
import moonWaningGibbous from "./images/moon-icons/moon-waning-gibbous.svg";
import moonLastQuarter from "./images/moon-icons/moon-last-quarter.svg";
import moonWaningCrescent from "./images/moon-icons/moon-waning-crescent.svg";

export function getMoonIcon(moonPhase) {
  let icon;
  if (moonPhase === 0) icon = moonNew;
  if (moonPhase > 0 && moonPhase < 0.25) icon = moonWaxingCrescent;
  if (moonPhase === 0.25) icon = moonFirstQuarter;
  if (moonPhase > 0.25 && moonPhase < 0.5) icon = moonWaxingGibbous;
  if (moonPhase === 0.5) icon = moonFull;
  if (moonPhase > 0.5 && moonPhase < 0.75) icon = moonWaningGibbous;
  if (moonPhase === 0.75) icon = moonLastQuarter;
  if (moonPhase > 0.75 && moonPhase < 1) icon = moonWaningCrescent;
  return icon;
}
