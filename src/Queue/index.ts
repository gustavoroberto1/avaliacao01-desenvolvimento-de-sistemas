export class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

visualize(): void {
    console.log("FILA");
    console.log("------");
    if (this.items.length === 0) {
      console.log("[ ] (fila vazia)");
    } else {
      const itemsString = this.items.map(item => `${item}`).join(" | ");
      console.log(`[ ${itemsString} ]`);
    }
  }
}