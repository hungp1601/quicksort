export class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.pop();
  }

  top() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
}

const stack = document.querySelector('#stack');


export async function renderStack (st) {
  // console.log(st.items[0])
  let str = ''

  for(let i = 0; i < st.items.length; i++) {
    
      str += `
      <div class='stack-item'>
        ${st.items[i][0]+1} ->  ${st.items[i][1]+1}
      </div>
      `

  }

  stack.innerHTML = str


  await sleep();
}



function sleep () {
  return new Promise(resolve => setTimeout(resolve, 2000));
}



