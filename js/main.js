import {addTextToH1} from "./request.js";
import {mapInputToText} from "./input.js";

function initApp() {
    const textElem = document.querySelector("#text");
    addTextToH1(textElem);

    const textElem1 = document.querySelector("#text");
    const input = document.querySelector("input");
    mapInputToText(input, textElem1);
}

const func = (e) => {
    if (e.target.readyState === "complete")
        initApp();
}


document.addEventListener("readystatechange", func, false);