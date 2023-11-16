import { randomArray, renderChart,convertNormalArray,generateArray } from "./chart.js";
import { quicksort, quicksortAsync } from "./sort.js";

let array = [];

// 
const arraySize = document.querySelector('#arraySize')
const randomBtn = document.querySelector('#randomBtn')
const sortArrASync = document.querySelector('#sortArr')
const sortArr = document.querySelector('#sortArrSync')
const runTime = document.querySelector('#runTime')

// file handler 
document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");

  fileInput.addEventListener("change", event => {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();

      reader.onload = event => {
        const content = event.target.result;
        array = generateArray(content.split(" "));
        
        // console.log(array)
        renderChart(array);
      };

      reader.readAsText(file);
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  // const inputStringElement = document.getElementById("inputString");
  const exportButton = document.getElementById("exportButton");

  exportButton.addEventListener("click", () => {
    const inputString = convertNormalArray(array).join(' ');;
    if (inputString) {
      downloadStringAsFile(inputString, "output.txt");
    }
  });
});

function downloadStringAsFile(text, filename) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

function randomize(){
  array = randomArray(arraySize.value)
  renderChart(array)
}


async function sortArrayAsync(){
  let start = Date.now();
  await quicksortAsync(array, 0, array.length - 1)
  // await quicksortAsync(array, 0, array.length - 1, (a,b) => b.value-a.value)

  let timeTaken = Date.now() - start;

  runTime.innerHTML = timeTaken+ ' milliseconds'
}


function sortArray(){
  let start = Date.now();
  quicksort(array, 0, array.length - 1)
  let timeTaken = Date.now() - start;

  runTime.innerHTML = timeTaken+ ' milliseconds'
  renderChart(array)


}


///https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions

///Arguments are always passed by value and never passed by reference. This means that if a function reassigns a parameter, the value won't change outside the function.

randomBtn.addEventListener("click", randomize);

sortArrASync.addEventListener("click", sortArrayAsync);

sortArr.addEventListener("click", sortArray);

