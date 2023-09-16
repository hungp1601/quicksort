import { randomArray, renderChart, convertNormalArray, generateArray } from "./chart.js";

import { Stack,renderStack } from "./stack.js";

let array = [];

const arraySize = document.querySelector('#arraySize')
const randomBtn = document.querySelector('#randomBtn')
const sortArr = document.querySelector('#sortArr')


randomBtn.addEventListener("click", randomize);
sortArr.addEventListener("click", sortArray);
document.addEventListener("DOMContentLoaded", () => {
  const exportButton = document.getElementById("exportButton");

  exportButton.addEventListener("click", () => {
    const inputString = convertNormalArray(array).join(' ');;
    if (inputString) {
      downloadStringAsFile(inputString, "output.txt");
    }
  });
});



async function swap (arr, i, j, left, right) {
  // if(i ===j ) return
  // console.log(i, j);
  arr[i].isSwap = true;
  arr[j].isSwap = true;
  await renderChart(arr, left, right);

  const temp = arr[i];

  arr[i] = arr[j];
  arr[j] = temp;

  arr[i].isSwap = false;
  arr[j].isSwap = false;
  await renderChart(arr, left, right);

}


async function animateQuicksort (arr) {
  let stack = new Stack()

  stack.push([ 0, arr.length-1])
  await renderStack(stack)

  while (stack.size() > 0) {
    const [start,end] = stack.pop()

    await renderStack(stack)


    const pivotIndex = await animatePartition(arr, start, end);

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

async function animatePartition (arr, left, right) {
  const pivotValue = arr[right].value;
  let partitionIndex = left;

  arr[right].isCompare = true;


  for (let i = left; i < right; i++) {
    if (arr[i].value < pivotValue) {
      await swap(arr, i, partitionIndex, left, right);
      partitionIndex++;

      arr[partitionIndex].isPivot = true;
      await renderChart(arr, left, right);

      arr[partitionIndex].isPivot = false;
      await renderChart(arr, left, right);
    }
  }
  arr[right].isCompare = false;

  await swap(arr, partitionIndex, right);

  return partitionIndex;
}


function randomize () {
  array = randomArray(arraySize.value)
  renderChart(array)
}

async function sortArray () {
  await animateQuicksort(array)
}





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


