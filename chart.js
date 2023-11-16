
const array = document.querySelector('#main');


export function randomArray (arraySize, maxValue = 1000) {
  let tmp = [];
  for (let i = 0; i < arraySize; i++) {
    const index = i + 1;
    const value = Math.floor(Math.random() * maxValue) + 1  // random function in js


    tmp.push({ index, value, isPivot: false, isSwap: false, isCompare:false  });
  }
  console.log(tmp)

  return tmp;
}

//map normal array to array can render chart
export function generateArray (arr) {
  let tmp = [];
  for (let i = 0; i < arr.length; i++) {
    const index = i + 1;
    const value = arr[i]

    tmp.push({ index, value, isPivot: false, isSwap: false, isCompare:false });
  }
  return tmp;
}

export function convertNormalArray (arr) {
  // console.log( arr )
  return arr.map(item => item.value);
}


export async function renderChart (arr, left, right) {

  if (arr.length <= 20) {
    let str = ''

  for(let i = 0; i < arr.length; i++) {
    if(left===i){
      str += `
      <div class='partition'>
      </div>
      `
    }

    if(arr[i].isPivot){
      str += `
      <div class='ele pivot'>
      ${arr[i].value}
      </div>
      `
    }
    else if(arr[i].isCompare){
      str += `
      <div class='ele compare'>
      ${arr[i].value}
      </div>
      `
    }
    else if(arr[i].isSwap){
      str += `
      <div class='ele swap'>
      ${arr[i].value}
      </div>
      `
    }
    else {
      str += `
      <div class='ele'>
      ${arr[i].value}
      </div>
      `
    }
    

      if(right===i){
        str += `
        <div class='partition'>
        </div>
        `

      }
  }
  
  array.innerHTML = str
  }
  else {
    array.innerHTML ='array is too long'
  }

  await sleep();



}



function sleep () {
  return new Promise(resolve => setTimeout(resolve, 2000));
}