import { start, addTextToH1 } from "./request.js";
let textGlobal = "";
const reload = document.querySelector("#reload");
const content_reload_after = document.querySelector("#content_reload_after");
const content_reload_before = document.querySelector("#content_reload_before");

export const mapInputToText = (input, text) => {
  textGlobal = text;
  input.addEventListener("input", updateValue);
};

const reloadEventListener = () => {
  content_reload_after.style.display = "block";

  content_reload_before.style.display = "none";
};

const displayReloadButton = () => {
  textGlobal.textContent = "";
  content_reload_after.style.display = "none";
  content_reload_before.style.display = "flex";
  addTextToH1(textGlobal);
  reload.addEventListener("click", reloadEventListener);
};

const updateValue = (e) => {
  let il = 0;
  const left = e.target.value;
  const right = textGlobal.textContent;
  const min = Math.min(left.length, right.length);
  while (il < min) {
    if (left[il] != right[il]) break;
    il++;
  }

  if (il <= 0) {
    textGlobal.textContent = textGlobal.textContent;
    return;
  }

  const greenSpan = document.createElement("span");
  greenSpan.classList.add("green");
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
    displayReloadButton();
    displaySpeed();
    e.target.value = "";
  }
};

const displaySpeed = () => {
  const end = new Date();
  const timeDiff = (end - start) / 1000;
  const speed = document.querySelector("#speed");
  const noWords = textGlobal.textContent.split(" ").length;
  const decimals = 100;
  speed.textContent = Math.round((noWords / timeDiff) * decimals) / decimals;
  speed.textContent += " words/minute";
};
