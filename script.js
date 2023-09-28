setInterval(setClock, 1000);

const hourHand = document.querySelector("[data-hour-hand]");
const minuteHand = document.querySelector("[data-minute-hand]");
const secondHand = document.querySelector("[data-second-hand]");
const gmtHand = document.querySelector("[data-gmt-hand]");

function setClock() {
  const currentDate = new Date();
  const secondsRatio = currentDate.getSeconds() / 60;
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
  const gmtOffset = getGMTOffset();
  const gmtHoursRatio = (gmtOffset + currentDate.getUTCHours()) / 12;

  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);
  setRotation(gmtHand, gmtHoursRatio);
}

function setRotation(element, rotationRatio) {
  element.style.setProperty("--rotation", rotationRatio * 360);
}

function getGMTOffset() {
  const currentDate = new Date();
  const januaryOffset = new Date(currentDate.getFullYear(), 0, 1).getTimezoneOffset();
  const julyOffset = new Date(currentDate.getFullYear(), 6, 1).getTimezoneOffset();
  return Math.max(januaryOffset, julyOffset) / 12;
}

setClock();
