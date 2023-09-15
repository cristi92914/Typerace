import { addTextToH1, startTimer } from "./request.js";
import { setIntervalSpeed, mapInputToText } from "./input.js";

const textElem = document.querySelector("#text");
const textElem1 = document.querySelector("#text");
const input = document.querySelector("input");
const contentAfter = document.querySelector("#content_after");
const contentBefore = document.querySelector("#content_before");
const button = document.querySelector("#start");
const timer = document.querySelector("#timer");

function hideAfter() {
  contentAfter.style.display = "none";
}

const clickButton = (e) => {
  contentAfter.style.display = "block";
  contentBefore.style.display = "none";
  startTimer(timer);
  setIntervalSpeed();
};

function initApp() {
  addTextToH1(textElem);
  button.addEventListener("click", clickButton);

  mapInputToText(input, textElem1);
}

const func = (e) => {
  if (e.target.readyState === "complete") initApp();
};

document.addEventListener("readystatechange", func, false);
