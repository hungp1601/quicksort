let operation = 0;

export function randomArray(arraySize, maxValue=20) {
  let tmp = [];
  for (let i = 0; i < arraySize; i++) {
    const index = i + 1;
    const value = Math.floor(Math.random() * maxValue) + 1
    const red = Math.floor(Math.random() * 256)
    const green = Math.floor(Math.random() * 256)
    const blue = Math.floor(Math.random() * 256)


    tmp.push({ index,value, color: {red, green,blue}, isPivot: false, isSwap: false});
  }
  return tmp;
}

export function generateArray(arr) {
  let tmp = [];
  for (let i = 0; i < arr.length; i++) {
    const index = i + 1;
    const value =arr[i]
    const red = Math.floor(Math.random() * 256)
    const green = Math.floor(Math.random() * 256)
    const blue = Math.floor(Math.random() * 256)


    tmp.push({ index,value, color: {red, green,blue}, isPivot: false, isSwap: false});
  }
  return tmp;
}

export function convertNormalArray(arr) {
  return arr.map(item=> {item.value});
}

const chart = new Chart("myChart", {
    type: "bar",
    data: {
      
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "array"
      }
    }
  });


export async function renderChart(arr){
  const indexs =  arr.map((ele) => ele.index);
  const values =  arr.map((ele) => ele.value);
  const barColors = arr.map((num) => `rgb(${num.color.red},${num.color.green},${num.color.blue})`);

  const borderColors = arr.map((num) =>{
    if(num.isPivot) return 'red';
    else if(num.isSwap) return 'green';
    else return 'white';
  });


  chart.data.labels = indexs
  chart.data.datasets = [{
    backgroundColor: barColors,
    data: values,
    borderColor:borderColors,
    borderWidth:5,
  }]

  chart.update()

  await sleep(1000); 


  operation++;
  console.log(operation)

}



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, 2000));
}