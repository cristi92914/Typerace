import {addTextToH1, startTimer} from "./request.js";
import {mapInputToText} from "./input.js";

const textElem = document.querySelector("#text");
const textElem1 = document.querySelector("#text");
const input = document.querySelector("input");
const contentAfter = document.querySelector("#content_after");
const contentBefore = document.querySelector("#content_before");
const button = document.querySelector("#start");

function hideAfter() {
    contentAfter.style.display = "none";
}

const clickButton = (e) => {
    contentAfter.style.display = "block";
    contentBefore.style.display = "none";
    addTextToH1(textElem);
}

function initApp() {

    button.addEventListener("click", clickButton);

    mapInputToText(input, textElem1);
}

const func = (e) => {
    if (e.target.readyState === "complete")
        initApp();
}


document.addEventListener("readystatechange", func, false);