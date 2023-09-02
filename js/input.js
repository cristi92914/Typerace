import {addTextToH1} from "./request.js";
let textGlobal = "";

export const mapInputToText = (input, text) => {
    textGlobal = text;
    input.addEventListener("input", updateValue);
}

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
        addTextToH1(textGlobal);
        e.target.value = "";
    }
};