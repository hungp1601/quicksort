import { renderChart } from "./chart.js";



export function swap (arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

export function quicksort (arr, left, right, comparator = (a, b) => a.value - b.value) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right, comparator);

    quicksort(arr, left, pivotIndex - 1, comparator);
    quicksort(arr, pivotIndex + 1, right, comparator);
  }
}

export function partition (arr, left, right, comparator = (a, b) => a.value - b.value) {
  let partitionIndex = left;

  for (let i = left; i < right; i++) {
    if (comparator(arr[i], arr[right]) < 0) {
      swap(arr, i, partitionIndex);
      partitionIndex++;
    }
  }

  swap(arr, partitionIndex, right);

  return partitionIndex;
}


export async function swapAsync (arr, i, j, left, right) {
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

export async function partitionAsync (arr, left, right, comparator = (a, b) => a.value - b.value) {
  let partitionIndex = left;

  arr[right].isCompare = true;

  //swap smaller than pivot to left, greater to right

  for (let i = left; i < right; i++) {
    if (comparator(arr[i], arr[right]) < 0) {
      //a.value -b.value <0 == a.value < b.value
      await swapAsync(arr, i, partitionIndex, left, right);
      partitionIndex++;

      arr[partitionIndex].isPivot = true;
      await renderChart(arr, left, right);

      arr[partitionIndex].isPivot = false;
      await renderChart(arr, left, right);
    }
  }
  arr[right].isCompare = false;

  await swapAsync(arr, partitionIndex, right);

  return partitionIndex;
}

export async function quicksortAsync (arr, left, right, comparator = (a, b) => a.value - b.value) {
  if (left < right) {
    const pivotIndex = await partitionAsync(arr, left, right, comparator);
    arr[pivotIndex].isPivot = true;
    await renderChart(arr, left, right);


    await quicksortAsync(arr, left, pivotIndex - 1, comparator);
    await quicksortAsync(arr, pivotIndex + 1, right, comparator);

    arr[pivotIndex].isPivot = false;

    await renderChart(arr, left, right);
  }
}

