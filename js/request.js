const API_KEY = "Co2ZQFyrvNVzpHVH3ioeVw==H5JhY43QFy1tVqCP";

const CATEGORIES = [
  "age",
  "alone",
  "amazing",
  "anger",
  "architecture",
  "art",
  "attitude",
  "beauty",
  "best",
  "birthday",
  "business",
  "car",
  "change",
  "communications",
  "computers",
  "cool",
  "courage",
  "dad",
  "dating",
  "death",
  "design",
  "dreams",
  "education",
  "environmental",
  "equality",
  "experience",
  "failure",
  "faith",
  "family",
  "famous",
  "fear",
  "fitness",
  "food",
  "forgiveness",
  "freedom",
  "friendship",
  "funny",
  "future",
  "god",
  "good",
  "government",
  "graduation",
  "great",
  "happiness",
  "health",
  "history",
  "home",
  "hope",
  "humor",
  "imagination",
  "inspirational",
  "intelligence",
  "jealousy",
  "knowledge",
  "leadership",
  "learning",
  "legal",
  "life",
  "love",
  "marriage",
  "medical",
  "men",
  "mom",
  "money",
  "morning",
  "movies",
  "success",
];

export let start = 0;
const timer = document.querySelector("#timer");
const input = document.querySelector("input");

export let intervalIncrementTimer;
let startTime;
export function startTimer(timerElem) {
  timerElem.textContent = 0;
  startTime = new Date();
  intervalIncrementTimer = setInterval(() => {
    timerElem.textContent = getTimerTime();
  }, 1000);
}

export function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

const randomArrEl = (array) => {
  const l = array.length;
  const r = Math.random(0, 1);
  const floor = Math.floor(r * l);
  return array[floor];
};

const getResponse = async () => {
  const CATEGORY = randomArrEl(CATEGORIES);
  const URL = "https://api.api-ninjas.com/v1/quotes?category=" + CATEGORY;
  const METHOD = "GET";
  const HEADERS = {
    "X-Api-Key": API_KEY,
  };
  const CONTENT_TYPE = "application/json";

  const response = await fetch(URL, {
    method: METHOD,
    headers: HEADERS,
    contentType: CONTENT_TYPE,
  });

  return response;
};

const sendRequest = async (el) => {
  // const q = "Lorem ipsum";
  // setText(el, q);
  // return;

  const response = await getResponse();
  const responseJson = await response.json();
  const quote = responseJson[0]["quote"];
  setText(el, quote);
};

const setText = (el, text) => {
  start = new Date();
  //   startTimer(timer);
  el.innerText = text;
  input.focus();
};

export const addTextToH1 = (el) => {
  sendRequest(el);
};
