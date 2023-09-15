import { addTextToH1, startTimer } from "./request.js";
import { setIntervalSpeed, mapInputToText } from "./input.js";

const textElem = document.querySelector("#text");
const textElem1 = document.querySelector("#text");
const input = document.querySelector("input");
const contentAfter = document.querySelector("#content_after");
const contentBefore = document.querySelector("#content_before");
const button = document.querySelector("#start");
const record = document.querySelector("#record");
const timer = document.querySelector("#timer");
const start = document.querySelector("#start");
const start1 = document.querySelector("#start1");
const start2 = document.querySelector("#start2");
const start3 = document.querySelector("#start3");

function hideAfter() {
  contentAfter.style.display = "none";
}

const clickButton = async (e) => {
  setTimeout(() => {
    contentAfter.style.display = "block";
    contentBefore.style.display = "none";
    startTimer(timer);
    setIntervalSpeed();
    input.focus();
  }, 3000);

  setTimeout(() => {
    start2.style.display = "block";
    start.style.display = "none";
    start1.style.display = "none";
    start3.style.display = "none";
  }, 1000);

  setTimeout(() => {
    start1.style.display = "block";
    start.style.display = "none";
    start3.style.display = "none";
    start2.style.display = "none";
  }, 2000);

  start3.style.display = "block";
  start.style.display = "none";
  start1.style.display = "none";
  start2.style.display = "none";
};

const getRecord = () => {
  const localStorageRecord = localStorage.getItem("record") || 0;
  return `Record: ${localStorageRecord} WPM`;
};

function initApp() {
  addTextToH1(textElem);
  button.addEventListener("click", clickButton);
  record.textContent = getRecord();

  mapInputToText(input, textElem1);
}

const func = (e) => {
  if (e.target.readyState === "complete") initApp();
};

document.addEventListener("readystatechange", func, false);
