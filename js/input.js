import {
  startTimer,
  getTimerTime,
  start,
  addTextToH1,
  intervalIncrementTimer,
} from "./request.js";
let textGlobal = "";
const reload = document.querySelector("#reload");
const content_reload_after = document.querySelector("#content_reload_after");
const content_reload_before = document.querySelector("#content_reload_before");
const timer = document.querySelector("#timer");
const speed = document.querySelector("#speed");
const green = document.querySelector("#green");
const input = document.querySelector("input");

export const mapInputToText = (input, text) => {
  textGlobal = text;
  input.addEventListener("input", updateValue);
};

const reloadEventListener = () => {
  setTimeout(() => {
    content_reload_after.style.display = "block";
    content_reload_before.style.display = "none";
    reload1.style.display = "none";
    reload.style.display = "block";
    startTimer(timer);
    setIntervalSpeed();
    input.focus();
  }, 3000);

  setTimeout(() => {
    reload2.style.display = "block";
    reload.style.display = "none";
    reload1.style.display = "none";
    reload3.style.display = "none";
  }, 1000);

  setTimeout(() => {
    reload1.style.display = "block";
    reload.style.display = "none";
    reload3.style.display = "none";
    reload2.style.display = "none";
  }, 2000);

  reload3.style.display = "block";
  reload.style.display = "none";
  reload2.style.display = "none";
  reload1.style.display = "none";
};

const displayReloadButton = () => {
  textGlobal.textContent = "";
  content_reload_after.style.display = "none";
  content_reload_before.style.display = "flex";
  addTextToH1(textGlobal);
  reload.addEventListener("click", reloadEventListener);
};

let greenSpan;
const updateValue = (e) => {
  let il = 0;
  const left = e.target.value;
  const right = textGlobal.textContent;
  const min = Math.min(left.length, right.length);
  while (il < min) {
    if (left[il] != right[il]) break;
    il++;
  }

  greenSpan = document.createElement("span");
  //   greenSpan.classList.add("green");
  greenSpan.setAttribute("id", "green");
  const redSpan = document.createElement("span");
  redSpan.classList.add("red");
  const blackSpan = document.createElement("span");

  const before = right.slice(0, il);
  greenSpan.textContent = before;

  const between = right.slice(il, left.length);
  redSpan.textContent = between;

  il = left.length;
  const after = right.slice(il);
  blackSpan.textContent = after;

  textGlobal.textContent = "";
  textGlobal.appendChild(greenSpan);
  textGlobal.appendChild(redSpan);
  textGlobal.appendChild(blackSpan);

  const black = blackSpan.textContent == "";
  const red = redSpan.textContent == "";
  if (black && red) {
    clearInterval(intervalIncrementTimer);
    clearInterval(intervalSpeed);
    timer.textContent = 0;
    speed.textContent = "Speed: 0 WPM";

    displayReloadButton();
    displayRecord();
    e.target.value = "";
  }
};

export let intervalSpeed;
export const setIntervalSpeed = () => {
  intervalSpeed = setInterval(() => {
    speed.textContent = "Speed: ";
    speed.textContent += getSpeed();
    speed.textContent += " WPM";
  }, 1000);
};

const getSpeed = () => {
  const end = new Date();
  const timeDiff = (end - start) / 1000000; // convert ms to minutes
  //   green span
  const noWords = greenSpan?.textContent.split(" ").length || 0;
  const noWordsPerMin = Math.round(noWords / timeDiff);
  return noWordsPerMin;
};

const getRecord = () => {
  const end = new Date();
  const timeDiff = (end - start) / 1000000; // convert ms to minutes
  const record = document.querySelector("#record");
  //   const noWords = textGlobal.textContent.split(" ").length;
  const noWords = greenSpan?.textContent.split(" ").length || 0;
  const decimals = 1;
  let noWordsPerMin = noWords / timeDiff;
  noWordsPerMin = Math.round(noWordsPerMin * decimals) / decimals;
  return noWordsPerMin;
};

function justNumbers(string) {
  var numsStr = string.replace(/[^0-9]/g, "");
  return parseInt(numsStr);
}

const displayRecord = () => {
  const noWordsPerMinBefore = justNumbers(record.textContent);

  const noWordsPerMinAfter = getRecord();
  const noWordsPerMin =
    noWordsPerMinAfter > noWordsPerMinBefore
      ? noWordsPerMinAfter
      : noWordsPerMinBefore;
  record.textContent = "Record: ";
  record.textContent += noWordsPerMin;
  localStorage.setItem("record", noWordsPerMin);
  record.textContent += " WPM";
};
