type DNode<T> = { value: T; prev: DNode<T> | null; next: DNode<T> | null };

export class DoublyLinkedList<T> {
  private head: DNode<T> | null = null;
  private tail: DNode<T> | null = null;
  private _size = 0;

  size() { return this._size; }

  pushFront(value: T): DNode<T> {
    const n: DNode<T> = { value, prev: null, next: this.head };
    if (this.head) this.head.prev = n; else this.tail = n;
    this.head = n; this._size++; return n;
  }

  pushBack(value: T): DNode<T> {
    const n: DNode<T> = { value, prev: this.tail, next: null };
    if (this.tail) this.tail.next = n; else this.head = n;
    this.tail = n; this._size++; return n;
  }

  remove(node: DNode<T>): void {
    if (!node) return;
    if (node.prev) node.prev.next = node.next; else this.head = node.next;
    if (node.next) node.next.prev = node.prev; else this.tail = node.prev;
    node.prev = node.next = null;
    this._size--;
  }

  moveToFront(node: DNode<T>): void {
    this.remove(node); this.pushFront(node.value);
  }

  *valuesForward(): Iterable<T> { let c = this.head; while (c){ yield c.value; c = c.next; } }
  *valuesBackward(): Iterable<T> { let c = this.tail; while (c){ yield c.value; c = c.prev; } }
}
