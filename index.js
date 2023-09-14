import { randomArray, renderChart,convertNormalArray,generateArray } from "./chart.js";

let array = [];



async function swap(arr, i, j, left, right) {
  // if(i ===j ) return
  // console.log(i,j);
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

async function quicksort(arr, left, right) {
  if (left < right) {
    const pivotIndex = await animatePartition(arr, left, right);


    await quicksort(arr, left, pivotIndex - 1);

    await quicksort(arr, pivotIndex + 1, right);
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

async function animatePartition (arr, left, right) {
  const pivotValue = arr[right].value;
  let partitionIndex = left;


  // await renderChart(arr, left, right);

  //swap smaller than pivot to left, greater to right

  for (let i = left; i < right; i++) {
    if (arr[i].value < pivotValue) {
      swap(arr, i, partitionIndex, left, right);

      
      partitionIndex++;

      arr[partitionIndex].isPivot = true;
  
      arr[partitionIndex].isPivot = false;
    }
  }
  arr[right].isCompare = false;

  await swap(arr, partitionIndex, right);

  return partitionIndex;
}



const arraySize = document.querySelector('#arraySize')
const randomBtn = document.querySelector('#randomBtn')
const sortArr = document.querySelector('#sortArr')
const sortArrSync = document.querySelector('#sortArrSync')

const runTime = document.querySelector('#runTime')



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

sortArrSync.addEventListener("click", sortArray);

