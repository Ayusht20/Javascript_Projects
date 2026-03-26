class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addNode(value) {
    const newNode = new Node(value);
    if (!this.head) this.head = newNode;
    else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    }
    this.tail = newNode;
    this.render();
    this.animateNode(newNode);
  }

  removeNode() {
    if (!this.tail) return;
    if (this.tail === this.head) this.head = null;
    else this.tail.prev.next = null;
    this.tail = this.tail.prev;
    this.render();
  }

  insertNode(value, position) {
    const newNode = new Node(value);
    let current = this.head;
    for (let i = 0; i < position && current; i++) current = current.next;
    if (position <= 0 || !current) {
      newNode.next = this.head;
      if (this.head) this.head.prev = newNode;
      this.head = newNode;
    } else {
      newNode.next = current.next;
      newNode.prev = current;
      if (current.next) current.next.prev = newNode;
      current.next = newNode;
    }
    this.render();
    this.animateNode(newNode);
  }

  updateNode(position, newValue) {
    let current = this.head;
    for (let i = 0; i < position && current; i++) current = current.next;
    if (!current) return;
    current.value = newValue;
    this.render();
  }

  animateNode(node) {
    setTimeout(() => node.element.classList.add('node-animation'), 100);
  }

  render() {
    const listContainer = document.getElementById('list');
    listContainer.innerHTML = '';
    let current = this.head;
    while (current) {
      const nodeElement = document.createElement('div');
      nodeElement.className = 'node';
      nodeElement.textContent = current.value;
      listContainer.appendChild(nodeElement);
      current.element = nodeElement;
      current = current.next;
    }
  }
}

const list = new DoublyLinkedList();

function addNode() {
  const value = document.getElementById('input-value').value.trim();
  if (!value) return;
  list.addNode(value);
  document.getElementById('input-value').value = '';
}

function removeNode() {
  list.removeNode();
}

function insertNode() {
  const value = document.getElementById('insert-value').value.trim();
  const position = parseInt(document.getElementById('insert-position').value);
  if (isNaN(position) || position < 0) return;
  list.insertNode(value, position);
  document.getElementById('insert-value').value = '';
  document.getElementById('insert-position').value = '';
}

function updateNode() {
  const position = parseInt(document.getElementById('update-position').value);
  const newValue = document.getElementById('update-value').value.trim();
  if (isNaN(position) || position < 0 || !newValue) return;
  list.updateNode(position, newValue);
  document.getElementById('update-value').value = '';
}
