class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Adding a new node to the end of the linked list
  append (data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  // Printing the linked list
  display () {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }

  getLast () {
    let current = this.head;
    while (current && current.next) {
      current = current.next;
    }
    return current ? current.data : null;
  }

  // Removing the last node from the linked list
  removeLast () {
    if (!this.head) {
      return; // Empty list
    }

    if (!this.head.next) {
      this.head = null; // Only one node in the list
      return;
    }

    let prev = null;
    let current = this.head;
    while (current.next) {
      prev = current;
      current = current.next;
    }
    prev.next = null; // Remove the reference to the last node
  }
}

// Example usage
const myList = new LinkedList();
// myList.append(10);
// myList.append(20);
// myList.append(30);

// myList.display();

export class LinkedList;
export class Node;