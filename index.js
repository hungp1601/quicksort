import { randomArray, renderChart,convertNormalArray,generateArray } from "./chart.js";

let array =randomArray(5);

console.log(array);

// renderChart(array);




async function swap(arr, i, j) {

  arr[i].isSwap = true;
  arr[j].isSwap = true;
  await renderChart(arr);

  const temp = arr[i];

  arr[i] = arr[j];
  arr[j] = temp;

  arr[i].isSwap = false;
  arr[j].isSwap = false;
  await renderChart(arr);

}


async function animateQuicksort(arr, left, right) {
  if (left < right) {
    const pivotIndex = await animatePartition(arr, left, right);
    await animateQuicksort(arr, left, pivotIndex - 1);



    await animateQuicksort(arr, pivotIndex + 1, right);
  }
}

async function animatePartition(arr, left, right) {

  arr[right].isPivot = true;
  await renderChart(arr);

  const pivotValue = arr[right].value;
  let partitionIndex = left;

  //swap smaller than pivot to left, greater to right

  for (let i = left; i < right; i++) {
    if (arr[i].value < pivotValue) {
      await swap(arr, i, partitionIndex);
      partitionIndex++;
    }
  }

  

  await swap(arr, partitionIndex, right);
  arr[right].isPivot = false;
  arr[partitionIndex].isPivot = false;

  await renderChart(arr);


  return partitionIndex;
}


animateQuicksort(array, 0, array.length - 1);