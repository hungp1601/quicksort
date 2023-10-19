import { randomArray, renderChart, convertNormalArray, generateArray } from "./chart.js";

import { LinkedList,renderStack } from "./linked-list.js";
import { partition, partitionAsync } from "./sort.js";



let array = [];

const arraySize = document.querySelector('#arraySize')
const randomBtn = document.querySelector('#randomBtn')
const sortArr = document.querySelector('#sortArr')
const sortArrSync = document.querySelector('#sortArrSync')
const runTime = document.querySelector('#runTime')

//file handler 

document.addEventListener("DOMContentLoaded", () => {
  const exportButton = document.getElementById("exportButton");

  exportButton.addEventListener("click", () => {
    const inputString = convertNormalArray(array).join(' ');;
    if (inputString) {
      downloadStringAsFile(inputString, "output.txt");
    }
  });
});

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

function downloadStringAsFile (text, filename) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}


async function animateQuicksort (arr, comparator = (a, b) => a.value - b.value) {
  let stack = new LinkedList()

  stack.push([ 0, arr.length-1])
  await renderStack(stack)

  while (!stack.isEmpty()) {
    const [start,end] = stack.pop()

    await renderStack(stack)
    const pivotIndex = await partitionAsync(arr, start, end, comparator);

    if (pivotIndex - 1 > start) {
      stack.push([start, pivotIndex - 1]);
      await renderStack(stack)
    }
    if (pivotIndex + 1 < end) {
      stack.push([pivotIndex + 1, end]);
      await renderStack(stack)
    }
  }
}


function quicksort (arr, comparator = (a, b) => a.value - b.value) {
  let stack = new LinkedList()

  stack.push([0, arr.length - 1])

  while (!stack.isEmpty()) {
    const [start, end] = stack.pop()

    const pivotIndex = partition(arr, start, end, comparator);

    if (pivotIndex - 1 > start) {
      stack.push([start, pivotIndex - 1]);
    }

    if (pivotIndex + 1 < end) {
      stack.push([pivotIndex + 1, end]);
    }
  }
}

function randomize () {
  array = randomArray(arraySize.value)
  renderChart(array)
}

async function sortArray () {
  let start = Date.now();
  animateQuicksort(array)
  let timeTaken = Date.now() - start;

  runTime.innerHTML = timeTaken + ' milliseconds'
}

function sortArraySync () {
  let start = Date.now();
  quicksort(array)
  let timeTaken = Date.now() - start;

  runTime.innerHTML = timeTaken + ' milliseconds'
}


randomBtn.addEventListener("click", randomize);
sortArr.addEventListener("click", sortArray);
sortArrSync.addEventListener("click", sortArraySync);
