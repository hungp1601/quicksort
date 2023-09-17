class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  push(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  pop() {
    if (!this.tail) {
      return null;
    }

    const poppedData = this.tail.data;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    return poppedData;
  }

  isEmpty() {
    return !this.head;
  }

}


const stack = document.querySelector('#stack');


export async function renderStack (st) {
  // console.log(st.items[0])
  let str = ''

    let current = st.head;
    while (current) {
      str += `
      <div class='stack-item'>
        ${current.data[0]+1} ->  ${current.data[1]+1}
      </div>
      `

      current = current.next;
  }

  stack.innerHTML = str


  await sleep();
}



function sleep () {
  return new Promise(resolve => setTimeout(resolve, 2000));
}



