import { randomArray, renderChart,convertNormalArray,generateArray } from "./chart.js";

let array = [];

const arraySize = document.querySelector('#arraySize')
const randomBtn = document.querySelector('#randomBtn')
const sortArr = document.querySelector('#sortArr')
const sortArrSync = document.querySelector('#sortArrSync')
const runTime = document.querySelector('#runTime')


async function swap (arr, i, j, left, right) {
  arr[i].isSwap = true;
  arr[j].isSwap = true;
  await renderChart(arr,left, right);

  const temp = arr[i];

  arr[i] = arr[j];
  arr[j] = temp;

  arr[i].isSwap = false;
  arr[j].isSwap = false;
  await renderChart(arr,left,right);

}

function swapSync (arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}


async function animateQuicksort(arr, left, right) {
  if (left < right) {
    const pivotIndex = await animatePartition(arr, left, right);
    arr[pivotIndex].isPivot = true;
    await renderChart(arr,left,right);


    await animateQuicksort(arr, left, pivotIndex - 1);

    await animateQuicksort(arr, pivotIndex + 1, right);
    

    arr[pivotIndex].isPivot = false;


    await renderChart(arr,left,right);
  }
}

function quicksort (arr, left, right) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);


    quicksort(arr, left, pivotIndex - 1);

    quicksort(arr, pivotIndex + 1, right);
  }
}

async function animatePartition (arr, left, right) {
  const pivotValue = arr[right].value;
  let partitionIndex = left;

  arr[right].isCompare = true;

  // await renderChart(arr, left, right);

  //swap smaller than pivot to left, greater to right

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

function partition (arr, left, right) {
  const pivotValue = arr[right].value;
  let partitionIndex = left;

  for (let i = left; i < right; i++) {
    if (arr[i].value < pivotValue) {
      swapSync(arr, i, partitionIndex);
      partitionIndex++;
    }
  }

   swapSync(arr, partitionIndex, right);

  return partitionIndex;
}


function randomize(){
  array = randomArray(arraySize.value)
  // console.log(arraySize.value)
  renderChart(array)
}



async function sortArray(){
  let start = Date.now();
  await animateQuicksort(array, 0, array.length - 1)
  let timeTaken = Date.now() - start;

  runTime.innerHTML = timeTaken+ ' milliseconds'
}


function sortArraySync(){
  let start = Date.now();
  quicksort(array, 0, array.length - 1)
  let timeTaken = Date.now() - start;

  runTime.innerHTML = timeTaken+ ' milliseconds'
  renderChart(array)


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


document.addEventListener("DOMContentLoaded", () => {
  // const inputStringElement = document.getElementById("inputString");
  const exportButton = document.getElementById("exportButton");

  exportButton.addEventListener("click", () => {
    const inputString = convertNormalArray(array).join(' ');;
    // console.log()
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



randomBtn.addEventListener("click", randomize);

sortArr.addEventListener("click", sortArray);

sortArrSync.addEventListener("click", sortArraySync);

